import { useMemo, useState } from 'react';
import { useApp } from './ctx';
import { DECKS, deckStats } from '../quiz/decks';
import { allCards, resetAll } from '../quiz/srs';
import { inRegion } from './regions';
import { IconGithub } from './icons';
import { fmt } from '../i18n';

export function ProgressPage() {
  const { db, engine, t, settings } = useApp();
  const [v, setV] = useState(0);
  const rows = useMemo(() => {
    return DECKS.map((d) => {
      const ready = d.packs.every((pk) => engine.isLoaded(pk));
      const s = ready ? deckStats(d.build(db, { inRegion: (id, r) => inRegion(engine, id, r), english: false })) : null;
      return { d, s };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, engine, v]);
  const cards = allCards();
  const ids = Object.keys(cards);
  const seen = ids.reduce((a, k) => a + cards[k].seen, 0);
  const right = ids.reduce((a, k) => a + cards[k].right, 0);
  const hardest = ids
    .filter((k) => cards[k].lapses > 0)
    .sort((a, b) => cards[b].lapses - cards[a].lapses || cards[a].right / cards[a].seen - cards[b].right / cards[b].seen)
    .slice(0, 15);
  const label = (cardId: string) => {
    const type = cardId.slice(0, cardId.indexOf(':'));
    const key = cardId.slice(cardId.indexOf(':') + 1);
    return { type, name: db.latin(key) };
  };
  return (
    <main className="page">
      <article className="doc glass settle">
        <h1>{t.progressTitle}</h1>
        {!ids.length ? (
          <p className="lede">{t.progressEmpty}</p>
        ) : (
          <p className="stat-line">
            <span className="num big">{seen ? Math.round((right / seen) * 100) : 0}%</span>
            <span>
              {t.accuracy}
              <small className="num">
                {right}/{seen}
              </small>
            </span>
          </p>
        )}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">{t.practical}</th>
                <th scope="col">{t.colQuestions}</th>
                <th scope="col">{t.colDue}</th>
                <th scope="col">{t.colNew}</th>
                <th scope="col">{t.colMastered}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ d, s }) => (
                <tr key={d.id}>
                  <th scope="row">
                    <span className="code">{d.code}</span>
                    {settings.lang === 'id' ? d.idn : d.en}
                  </th>
                  <td className="num">{s?.total ?? ''}</td>
                  <td className="num">{s?.due ?? ''}</td>
                  <td className="num">{s?.fresh ?? ''}</td>
                  <td className="num">{s?.mastered ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {hardest.length > 0 && (
          <>
            <h2>{t.weakest}</h2>
            <div className="table-wrap">
              <table>
                <tbody>
                  {hardest.map((k) => {
                    const l = label(k);
                    return (
                      <tr key={k}>
                        <th scope="row" className="latin">
                          {l.name}
                        </th>
                        <td className="muted">{l.type}</td>
                        <td className="num">
                          {cards[k].right}/{cards[k].seen}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        {ids.length > 0 && (
          <p className="doc-foot">
            <button
              className="btn ghost"
              onClick={() => {
                if (window.confirm(t.resetConfirm)) {
                  resetAll();
                  setV(v + 1);
                }
              }}
            >
              {t.resetProgress}
            </button>
          </p>
        )}
      </article>
    </main>
  );
}

export function AboutPage() {
  const { settings, t } = useApp();
  const id = settings.lang === 'id';
  return (
    <main className="page">
      <article className="doc glass settle">
        <h1>{t.aboutTitle}</h1>
        {id ? (
          <>
            <p className="lede">
              Raga adalah atlas anatomi 3D dan kuis isian singkat yang gratis dan terbuka. Raga dibuat oleh Resvet
              untuk belajar Blok 4 (tulang, sendi, otot, pembuluh darah, saraf, jantung, dan paru) dan untuk siapa
              saja yang sedang mempelajari anatomi. Pendidikan semestinya dapat diakses semua orang.
            </p>
            <h2>Cara memakai</h2>
            <p>
              Di Atlas, klik sebuah struktur untuk membaca nama Latin, origo, insersio, aksi, persarafan, dan penanda tulangnya. Geser
              pengukur kedalaman di kiri untuk mengupas lapisan dari kulit sampai tulang, dan pilih regio pada peta tubuh. Di Gerak, pilih
              gerakan sendi untuk melihat otot yang berkontraksi. Di Kuis, pilih materi praktikum lalu jawab dengan nama Latin. Soal yang
              salah akan muncul lagi lebih cepat, dan simulasi OSPE memberi waktu per stase seperti ujian sebenarnya.
            </p>
            <h2>Penting</h2>
            <p>
              Isi Raga disusun dari buku ajar standar (Moore, Gray, Netter, Sobotta) dan modul praktikum, lalu diperiksa ulang. Kesalahan
              tetap mungkin ada. Bila menemukan yang keliru atau berbeda dengan materi dosen, ikuti dosen Anda dan laporkan melalui GitHub
              agar dapat diperbaiki. Kemajuan kuis hanya tersimpan di perangkat Anda. Raga tidak mengirim data apa pun.
            </p>
          </>
        ) : (
          <>
            <p className="lede">
              Raga is a free, open-source 3D anatomy atlas with Latin short-answer quizzes. It was made by Resvet
              for Blok 4 (bones, joints, muscles, vessels, nerves, heart and lungs) and for anyone else learning
              anatomy. Education should be free.
            </p>
            <h2>How to use it</h2>
            <p>
              In the Atlas, click a structure to read its Latin name, origin, insertion, action, innervation and landmarks. Drag the depth
              gauge on the left to peel the layers from skin to bone, and pick a region on the body map. In Motion, choose a joint movement
              to see which muscles contract. In the Quiz, pick a practical and answer with the Latin name. Cards you miss come back sooner,
              and the OSPE simulation times each station like the real exam.
            </p>
            <h2>Please note</h2>
            <p>
              The content was written from standard textbooks (Moore, Gray, Netter, Sobotta) and the course module, then checked again.
              Mistakes can still slip through. If something is wrong or differs from what your lecturer teaches, follow your lecturer and
              report it on GitHub so it can be fixed. Quiz progress stays on your device. Raga sends no data anywhere.
            </p>
          </>
        )}
        <h2>{t.credits}</h2>
        <ul className="credits">
          <li>
            {id ? 'Model 3D' : '3D models'}: <a href="https://github.com/Z-Anatomy/The-blend">Z-Anatomy</a> {id ? 'oleh' : 'by'} Gauthier Kervyn,
            Marcin Zielinski {id ? 'dan' : 'and'} Lluís Vinent (CC BY-SA 4.0), {id ? 'berdasarkan' : 'based on'}{' '}
            <a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html">BodyParts3D</a>, The Database Center for Life Science (CC BY-SA
            2.1 JP).{' '}
            {id
              ? 'Dikonversi, disederhanakan, dan dikompresi untuk web oleh Raga. Struktur yang diambil Z-Anatomy dari sumber nonkomersial (telinga dalam, ginjal) tidak disertakan.'
              : 'Converted, simplified and compressed for the web by Raga. Structures that Z-Anatomy took from non-commercial sources (inner ear, kidney) are left out.'}
          </li>
          <li>{id ? 'Nama Latin dan nama dalam berbagai bahasa: tabel Terminologia Anatomica 2 yang disertakan Z-Anatomy.' : 'Latin and multilingual names: the Terminologia Anatomica 2 table shipped with Z-Anatomy.'}</li>
          <li>{id ? 'Teks ensiklopedia: Wikipedia (CC BY-SA), sebagaimana dikemas Z-Anatomy.' : 'Encyclopedia texts: Wikipedia (CC BY-SA), as packaged by Z-Anatomy.'}</li>
          <li>
            {id ? 'Huruf' : 'Fonts'}: Schibsted Grotesk (The Schibsted Grotesk Project Authors, OFL) {id ? 'dan' : 'and'} Brygada 1918 (The Brygada 1918
            Project Authors, OFL).
          </li>
          <li>{id ? 'Perender' : 'Rendering'}: three.js (MIT), three-mesh-bvh (MIT). {id ? 'Kompresi mesh' : 'Mesh compression'}: meshoptimizer (MIT).</li>
          <li>{id ? 'Kode Raga: lisensi MIT. Model dan data Raga: CC BY-SA 4.0.' : 'Raga code: MIT licence. Raga models and data: CC BY-SA 4.0.'}</li>
        </ul>
        <p className="doc-foot">
          <a className="btn" href="https://github.com/ResVet/Raga" target="_blank" rel="noreferrer">
            <IconGithub /> {t.sourceCode}
          </a>
        </p>
        <p className="sr-only">{fmt(t.graphicsNow, { x: settings.quality })}</p>
      </article>
    </main>
  );
}
