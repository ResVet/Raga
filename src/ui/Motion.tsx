import { useEffect, useRef, useState } from 'react';
import { fmt } from '../i18n';
import { useApp } from './ctx';
import type { JointId, MotionClip, MotionPlayer, MovementId } from './engineExtras';
import { IconLoop, IconPause, IconPlay, IconStop } from './icons';

type Names = { la: string; en: string; id: string };

export const JOINTS: Record<JointId, Names> = {
  shoulder: { la: 'Articulatio humeri', en: 'Shoulder joint', id: 'Sendi bahu' },
  elbow: { la: 'Articulatio cubiti', en: 'Elbow joint', id: 'Sendi siku' },
  radioulnar: { la: 'Articulationes radioulnares', en: 'Radioulnar joints', id: 'Sendi radioulnar' },
  wrist: { la: 'Articulatio radiocarpalis', en: 'Wrist joint', id: 'Sendi pergelangan tangan' },
  hip: { la: 'Articulatio coxae', en: 'Hip joint', id: 'Sendi panggul' },
  knee: { la: 'Articulatio genus', en: 'Knee joint', id: 'Sendi lutut' },
  ankle: { la: 'Articulatio talocruralis', en: 'Ankle joint', id: 'Sendi pergelangan kaki' },
  subtalar: { la: 'Articulatio subtalaris', en: 'Subtalar joint', id: 'Sendi subtalar' },
};

export const MOVES: Record<MovementId, Names> = {
  flexion: { la: 'Flexio', en: 'Flexion', id: 'Fleksi' },
  extension: { la: 'Extensio', en: 'Extension', id: 'Ekstensi' },
  abduction: { la: 'Abductio', en: 'Abduction', id: 'Abduksi' },
  adduction: { la: 'Adductio', en: 'Adduction', id: 'Adduksi' },
  'medial-rotation': { la: 'Rotatio medialis', en: 'Medial rotation', id: 'Rotasi medial' },
  'lateral-rotation': { la: 'Rotatio lateralis', en: 'Lateral rotation', id: 'Rotasi lateral' },
  pronation: { la: 'Pronatio', en: 'Pronation', id: 'Pronasi' },
  supination: { la: 'Supinatio', en: 'Supination', id: 'Supinasi' },
  'radial-deviation': { la: 'Abductio radialis', en: 'Radial deviation', id: 'Deviasi radial' },
  'ulnar-deviation': { la: 'Abductio ulnaris', en: 'Ulnar deviation', id: 'Deviasi ulnar' },
  dorsiflexion: { la: 'Dorsiflexio', en: 'Dorsiflexion', id: 'Dorsofleksi' },
  plantarflexion: { la: 'Flexio plantaris', en: 'Plantarflexion', id: 'Plantarfleksi' },
  inversion: { la: 'Inversio', en: 'Inversion', id: 'Inversi' },
  eversion: { la: 'Eversio', en: 'Eversion', id: 'Eversi' },
};

const JOINT_ORDER: JointId[] = ['shoulder', 'elbow', 'radioulnar', 'wrist', 'hip', 'knee', 'ankle', 'subtalar'];

/** Motion mode: every joint with the movements the engine can play. */
export function MotionPanel(p: { clips: MotionClip[]; side: 'l' | 'r'; onSide: (s: 'l' | 'r') => void; onPlay: (c: MotionClip) => void; currentId: string | null; loadingId: string | null }) {
  const { t, settings } = useApp();
  const lang = settings.lang;
  const groups = JOINT_ORDER.map((j) => ({ j, clips: p.clips.filter((c) => c.moves[0]?.joint === j) })).filter((g) => g.clips.length);
  return (
    <div className="motion-panel">
      <header className="panel-head">
        <h2>{t.motionTitle}</h2>
        <p>{t.motionIntro}</p>
        <div className="seg" role="radiogroup" aria-label={t.motionSide}>
          {(['r', 'l'] as const).map((s) => (
            <button key={s} role="radio" aria-checked={p.side === s} onClick={() => p.onSide(s)}>
              {s === 'r' ? t.sideRight : t.sideLeft}
            </button>
          ))}
        </div>
      </header>
      <div className="motion-list">
        {groups.map((g) => (
          <section className="joint" key={g.j}>
            <h3>
              <span className="latin">{JOINTS[g.j].la}</span>
              <small>{JOINTS[g.j][lang]}</small>
            </h3>
            <ul>
              {g.clips.map((c) => {
                const mv = c.moves[0];
                const nm = MOVES[mv.movement] ?? { la: c.label.la, en: c.label.en, id: c.label.id };
                return (
                  <li key={c.id}>
                    <button className="move" aria-pressed={p.currentId === c.id} aria-busy={p.loadingId === c.id} onClick={() => p.onPlay(c)}>
                      <span className="latin">{nm.la}</span>
                      <small>{nm[lang]}</small>
                      <span className="move-deg num">{fmt(t.upTo, { n: Math.round(Math.abs(mv.deg)) })}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

/** The motion bar: play and pause, the movement name, a scrubber over one cycle, the live joint angle,
 *  speed, loop and stop. Updates come from the engine's tick so React does not re-render every frame. */
export function MotionBar({ player, clip, onStop }: { player: MotionPlayer; clip: MotionClip; onStop: () => void }) {
  const { t, settings } = useApp();
  const lang = settings.lang;
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(true);
  const rangeRef = useRef<HTMLInputElement>(null);
  const angleRef = useRef<HTMLOutputElement>(null);
  const scrubbing = useRef(false);
  const max = Math.round(Math.abs(clip.moves[0]?.deg ?? 0));

  useEffect(() => {
    const read = () => {
      let s;
      try {
        s = player.state();
      } catch {
        return;
      }
      if (!scrubbing.current && rangeRef.current) rangeRef.current.value = String(s.t);
      if (angleRef.current) angleRef.current.textContent = `${Math.round(Math.abs(s.angles[0] ?? 0))}°`;
      setPlaying(s.playing);
    };
    read();
    const off = player.onTick(read);
    return () => {
      if (typeof off === 'function') off();
    };
  }, [player, clip]);

  const toggle = () => {
    if (playing) player.pause();
    else player.resume();
    setPlaying(!playing);
  };

  return (
    <div className="motion-bar glass" role="group" aria-label={t.motionBar}>
      <button className="mb-play" onClick={toggle} aria-label={playing ? t.pause : t.play}>
        {playing ? <IconPause /> : <IconPlay />}
      </button>
      <div className="mb-title">
        <span className="latin">{clip.label.la}</span>
        <span className="mb-legend">
          <i className="c" aria-hidden="true" />
          {t.contracts}
          <i className="s" aria-hidden="true" />
          {t.lengthens}
        </span>
      </div>
      <div className="mb-scrub">
        <svg viewBox="0 0 100 16" preserveAspectRatio="none" className="mb-profile" aria-hidden="true">
          <path d="M0 15C22 15 26 1 50 1S78 15 100 15" />
        </svg>
        <span className="mb-peak num" aria-hidden="true">{max}°</span>
        <input
          ref={rangeRef}
          type="range"
          className="range"
          min={0}
          max={1}
          step={0.001}
          defaultValue={0}
          aria-label={t.scrub}
          onPointerDown={() => (scrubbing.current = true)}
          onPointerUp={() => (scrubbing.current = false)}
          onChange={(e) => {
            player.scrub(parseFloat(e.target.value));
            setPlaying(false);
          }}
        />
        <span className="mb-ends num" aria-hidden="true">
          <span>0°</span>
          <span>0°</span>
        </span>
      </div>
      <output ref={angleRef} className="mb-angle num" aria-label={t.angle} aria-live="off">
        0°
      </output>
      <div className="seg mb-speed" role="radiogroup" aria-label={t.speed}>
        {[0.5, 1, 2].map((x) => (
          <button
            key={x}
            role="radio"
            aria-checked={speed === x}
            onClick={() => {
              setSpeed(x);
              player.setSpeed(x);
            }}
          >
            {x}×
          </button>
        ))}
      </div>
      <button
        className="icon-btn"
        aria-pressed={loop}
        aria-label={t.loop}
        title={t.loop}
        onClick={() => {
          setLoop(!loop);
          player.setLoop(!loop);
        }}
      >
        <IconLoop />
      </button>
      <button className="icon-btn" aria-label={t.stop} title={t.stop} onClick={onStop}>
        <IconStop />
      </button>
      <span className="sr-only">{lang === 'id' ? clip.label.id : clip.label.en}</span>
    </div>
  );
}
