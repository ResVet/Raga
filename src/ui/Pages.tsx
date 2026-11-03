import { useMemo, useState } from 'react';
import { useApp } from './ctx';
import { DECKS, deckStats } from '../quiz/decks';
import { allCards, resetAll } from '../quiz/srs';
import { inRegion } from './regions';
import { IconGithub } from './icons';

export function ProgressPage() {
  const { db, engine, t, settings } = useApp();
  const [v, setV] = useState(0);
  const rows = useMemo(() => {
    return DECKS.map((d) => {
      const ready = d.packs.every((p) => engine.isLoaded(p));
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
    const [type, key] = [cardId.slice(0, cardId.indexOf(':')), cardId.slice(cardId.indexOf(':') + 1)];
    return { type, name: db.latin(key) };
  };
  return (
    <main className="page">
      <h1>{t.progressTitle}</h1>
      {!ids.length && <p>{t.progressEmpty}</p>}
      {ids.length > 0 && (
        <p>
          {t.accuracy}: <b style={{ color: 'var(--gauze)' }}>{seen ? Math.round((right / seen) * 100) : 0}%</b> ({right}/{seen})
        </p>
      )}
      <table>
        <thead>
          <tr>
            <th>{settings.lang === 'id' ? 'Materi' : 'Deck'}</th>
            <th>{t.questions}</th>
            <th>{t.due}</th>
            <th>{t.new}</th>
            <th>{t.mastered}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ d, s }) => (
            <tr key={d.id}>
              <td>
                <span style={{ color: 'var(--pin)', fontWeight: 700, marginRight: 8 }}>{d.code}</span>
                {settings.lang === 'id' ? d.idn : d.en}
              </td>
              <td>{s?.total ?? ''}</td>
              <td>{s?.due ?? ''}</td>
              <td>{s?.fresh ?? ''}</td>
              <td>{s?.mastered ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {hardest.length > 0 && (
        <>
          <h2>{t.weakest}</h2>
          <table>
            <tbody>
              {hardest.map((k) => {
                const l = label(k);
                return (
                  <tr key={k}>
                    <td className="latin" style={{ fontSize: 16 }}>{l.name}</td>
                    <td style={{ color: 'var(--gauze-3)' }}>{l.type}</td>
                    <td>
                      {cards[k].right}/{cards[k].seen}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {ids.length > 0 && (
        <p style={{ marginTop: 28 }}>
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
    </main>
  );
}

export function AboutPage() {
  const { settings } = useApp();
  const id = settings.lang === 'id';
  return (
    <main className="page">
      <h1>{id ? 'Tentang Raga' : 'About Raga'}</h1>
      {id ? (
        <>
          <p>
            Raga adalah atlas anatomi 3D dan kuis isian singkat yang gratis dan terbuka. Dibuat oleh Khalid, mahasiswa FK Universitas
            Sriwijaya angkatan 2026, untuk belajar Blok 4 (tulang, sendi, otot, pembuluh darah, saraf, jantung, dan paru) dan untuk siapa
            saja yang sedang belajar anatomi. Pendidikan harus bisa diakses semua orang.
          </p>
          <h2>Cara memakai</h2>
          <p>
            Di Atlas, klik struktur untuk membaca nama Latin, origo, insersio, aksi, persarafan, dan penanda tulangnya. Gunakan lapisan,
            regio, urai, dan bidang potong untuk melihat bagian dalam. Di Kuis, pilih materi praktikum lalu jawab dengan nama Latin. Kartu
            yang salah akan muncul lagi lebih cepat. Simulasi OSPE memberi waktu per stase seperti ujian sungguhan.
          </p>
          <h2>Penting</h2>
          <p>
            Isi Raga disusun dari buku ajar standar (Moore, Gray, Netter, Sobotta) dan modul praktikum, lalu dicek ulang. Kesalahan tetap
            mungkin ada. Kalau menemukan yang keliru atau berbeda dengan materi dosen, ikuti dosenmu dan laporkan lewat GitHub agar bisa
            diperbaiki. Kemajuan kuis hanya tersimpan di perangkatmu; Raga tidak mengirim data apa pun.
          </p>
        </>
      ) : (
        <>
          <p>
            Raga is a free, open-source 3D anatomy atlas with Latin short-answer quizzes. It was made by Khalid, a 2026 medical student at
            Universitas Sriwijaya, for Blok 4 (bones, joints, muscles, vessels, nerves, heart and lungs) and for anyone else learning
            anatomy. Education should be free.
          </p>
          <h2>How to use it</h2>
          <p>
            In the Atlas, click any structure to read its Latin name, origin, insertion, action, innervation and landmarks. Layers,
            regions, explode and the cut plane let you look inside. In the Quiz, pick a practical and answer with the Latin name. Cards you
            miss come back sooner. The OSPE simulation times each station like the real exam.
          </p>
          <h2>Please note</h2>
          <p>
            The content was written from standard textbooks (Moore, Gray, Netter, Sobotta) and the course module, then checked again.
            Mistakes can still slip through. If something is wrong or differs from what your lecturer teaches, follow your lecturer and
            report it on GitHub so it can be fixed. Quiz progress stays on your device; Raga sends no data anywhere.
          </p>
        </>
      )}
      <h2>{id ? 'Sumber dan lisensi' : 'Sources and licences'}</h2>
      <ul>
        <li>
          3D models: <a href="https://github.com/Z-Anatomy/The-blend">Z-Anatomy</a> by Gauthier Kervyn, Marcin Zielinski and Lluís Vinent
          (CC BY-SA 4.0), based on <a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html">BodyParts3D</a>, The Database
          Center for Life Science (CC BY-SA 2.1 JP). Converted, simplified and compressed for the web by Raga. Structures that Z-Anatomy
          took from non-commercial sources (inner ear, kidney) are left out.
        </li>
        <li>Latin and multilingual names: Terminologia Anatomica 2 table shipped with Z-Anatomy.</li>
        <li>Encyclopedia texts: Wikipedia (CC BY-SA), as packaged by Z-Anatomy.</li>
        <li>Fonts: Atkinson Hyperlegible Next (Braille Institute, OFL) and Source Serif 4 (Adobe, OFL).</li>
        <li>Rendering: three.js (MIT), three-mesh-bvh (MIT). Mesh compression: meshoptimizer (MIT).</li>
        <li>Raga code: MIT licence. Raga models and data: CC BY-SA 4.0.</li>
      </ul>
      <p>
        <a className="btn" href="https://github.com/ResVet/Raga" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          <IconGithub /> GitHub
        </a>
      </p>
    </main>
  );
}
