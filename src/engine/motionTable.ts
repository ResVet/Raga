// Muscle actions for the motion rig. Joint and movement names follow ENGINE_API.md.
// Ranges follow clinical goniometry with the scapula and pelvis held still (glenohumeral motion only).
// Movements whose anatomical range starts away from the anatomical position use a start pose
// (START below): elbow and knee extension start flexed, shoulder and hip adduction start abducted,
// pronation and supination start from the mid-prone position, as they are measured clinically.
// Finger-only and thumb-only muscles and the scapular muscles have no clip (the hand and scapula do
// not articulate in this rig).
import type { JointId, MovementId } from './motion';

export type Move = { joint: JointId; movement: MovementId; deg?: number };

/** Default range per joint movement (degrees). */
export const RANGE: Record<JointId, Partial<Record<MovementId, number>>> = {
  shoulder: { flexion: 90, extension: 50, abduction: 90, adduction: 90, 'medial-rotation': 70, 'lateral-rotation': 60 },
  elbow: { flexion: 145, extension: 140 },
  radioulnar: { pronation: 80, supination: 80 },
  wrist: { flexion: 75, extension: 65, 'radial-deviation': 20, 'ulnar-deviation': 30 },
  hip: { flexion: 90, extension: 20, abduction: 40, adduction: 35, 'medial-rotation': 35, 'lateral-rotation': 45 },
  knee: { flexion: 130, extension: 90 },
  ankle: { dorsiflexion: 20, plantarflexion: 45 },
  subtalar: { inversion: 30, eversion: 15 },
};

/** Start pose (degrees of the named movement from the anatomical position) for a movement. */
export const START: Partial<Record<string, { movement: MovementId; deg: number }>> = {
  'shoulder:adduction': { movement: 'abduction', deg: 90 },
  'elbow:extension': { movement: 'flexion', deg: 140 },
  'radioulnar:pronation': { movement: 'pronation', deg: 80 },
  'radioulnar:supination': { movement: 'pronation', deg: 80 },
  'hip:adduction': { movement: 'abduction', deg: 35 },
  'knee:extension': { movement: 'flexion', deg: 90 },
};

const J = (joint: JointId, movement: MovementId, deg?: number): Move => ({ joint, movement, deg });

/** Latin, English and Indonesian names of each joint movement. */
export const LABEL: Record<string, { la: string; en: string; id: string }> = {
  'shoulder:flexion': { la: 'Flexio articulationis humeri', en: 'Shoulder flexion', id: 'Fleksi sendi bahu' },
  'shoulder:extension': { la: 'Extensio articulationis humeri', en: 'Shoulder extension', id: 'Ekstensi sendi bahu' },
  'shoulder:abduction': { la: 'Abductio articulationis humeri', en: 'Shoulder abduction', id: 'Abduksi sendi bahu' },
  'shoulder:adduction': { la: 'Adductio articulationis humeri', en: 'Shoulder adduction', id: 'Adduksi sendi bahu' },
  'shoulder:medial-rotation': { la: 'Rotatio medialis articulationis humeri', en: 'Medial rotation of the shoulder', id: 'Rotasi medial sendi bahu' },
  'shoulder:lateral-rotation': { la: 'Rotatio lateralis articulationis humeri', en: 'Lateral rotation of the shoulder', id: 'Rotasi lateral sendi bahu' },
  'elbow:flexion': { la: 'Flexio articulationis cubiti', en: 'Elbow flexion', id: 'Fleksi sendi siku' },
  'elbow:extension': { la: 'Extensio articulationis cubiti', en: 'Elbow extension', id: 'Ekstensi sendi siku' },
  'radioulnar:pronation': { la: 'Pronatio antebrachii', en: 'Pronation of the forearm', id: 'Pronasi lengan bawah' },
  'radioulnar:supination': { la: 'Supinatio antebrachii', en: 'Supination of the forearm', id: 'Supinasi lengan bawah' },
  'wrist:flexion': { la: 'Flexio articulationis radiocarpalis', en: 'Wrist flexion', id: 'Fleksi pergelangan tangan' },
  'wrist:extension': { la: 'Extensio articulationis radiocarpalis', en: 'Wrist extension', id: 'Ekstensi pergelangan tangan' },
  'wrist:radial-deviation': { la: 'Abductio radialis manus', en: 'Radial deviation of the wrist', id: 'Deviasi radial pergelangan tangan' },
  'wrist:ulnar-deviation': { la: 'Adductio ulnaris manus', en: 'Ulnar deviation of the wrist', id: 'Deviasi ulnar pergelangan tangan' },
  'hip:flexion': { la: 'Flexio articulationis coxae', en: 'Hip flexion', id: 'Fleksi sendi panggul' },
  'hip:extension': { la: 'Extensio articulationis coxae', en: 'Hip extension', id: 'Ekstensi sendi panggul' },
  'hip:abduction': { la: 'Abductio articulationis coxae', en: 'Hip abduction', id: 'Abduksi sendi panggul' },
  'hip:adduction': { la: 'Adductio articulationis coxae', en: 'Hip adduction', id: 'Adduksi sendi panggul' },
  'hip:medial-rotation': { la: 'Rotatio medialis articulationis coxae', en: 'Medial rotation of the hip', id: 'Rotasi medial sendi panggul' },
  'hip:lateral-rotation': { la: 'Rotatio lateralis articulationis coxae', en: 'Lateral rotation of the hip', id: 'Rotasi lateral sendi panggul' },
  'knee:flexion': { la: 'Flexio articulationis genus', en: 'Knee flexion', id: 'Fleksi sendi lutut' },
  'knee:extension': { la: 'Extensio articulationis genus', en: 'Knee extension', id: 'Ekstensi sendi lutut' },
  'ankle:dorsiflexion': { la: 'Dorsiflexio articulationis talocruralis', en: 'Dorsiflexion of the ankle', id: 'Dorsofleksi sendi pergelangan kaki' },
  'ankle:plantarflexion': { la: 'Flexio plantaris articulationis talocruralis', en: 'Plantar flexion of the ankle', id: 'Plantarfleksi sendi pergelangan kaki' },
  'subtalar:inversion': { la: 'Inversio pedis', en: 'Inversion of the foot', id: 'Inversi kaki' },
  'subtalar:eversion': { la: 'Eversio pedis', en: 'Eversion of the foot', id: 'Eversi kaki' },
};

// ------------------------------------------------------------------ muscle groups used below
const BICEPS = ['long-head-of-biceps-brachii', 'short-head-of-biceps-brachii'];
const TRICEPS = ['long-head-of-triceps-brachii', 'lateral-head-of-triceps-brachii', 'medial-head-of-triceps-brachii'];
const DELT_A = ['acromial-part-of-deltoid-muscle'];
const DELT_C = ['clavicular-part-of-deltoid-muscle'];
const DELT_S = ['scapular-spinal-part-of-deltoid-muscle'];
const PEC = ['clavicular-head-of-pectoralis-major-muscle', 'sternocostal-head-of-pectoralis-major-muscle', 'abdominal-part-of-pectoralis-major-muscle'];
const PRON_TERES = ['superficial-head-of-pronator-teres', 'deep-head-of-pronator-teres'];
const FCU = ['humeral-head-of-flexor-carpi-ulnaris', 'ulnar-head-of-flexor-carpi-ulnaris'];
const ECU = ['humeral-head-of-extensor-carpi-ulnaris', 'ulnar-head-of-extensor-carpi-ulnaris'];
const FDS = ['humero-ulnar-head-of-flexor-digitorum-superficialis', 'radial-head-of-flexor-digitorum-superficialis'];
const QUAD = ['rectus-femoris-muscle', 'vastus-lateralis-muscle', 'vastus-medialis-muscle', 'vastus-intermedius-muscle'];
const HAM = ['long-head-of-biceps-femoris', 'short-head-of-biceps-femoris', 'semitendinosus-muscle', 'semimembranosus-muscle'];
const GASTRO = ['medial-head-of-gastrocnemius', 'lateral-head-of-gastrocnemius'];
const ADDUCT = ['adductor-longus', 'adductor-brevis', 'adductor-magnus', 'adductor-minimus', 'pectineus-muscle', 'gracilis-muscle'];
const LAT_ROT_HIP = ['piriformis-muscle', 'obturator-internus', 'superior-gemellus-muscle', 'inferior-gemellus-muscle', 'quadratus-femoris-muscle', 'obturator-externus'];
const ILIOPSOAS = ['psoas-major', 'iliacus-muscle'];

/** Prime movers (contract) and antagonists (lengthen) of each joint movement, as structure keys. */
export const MOVERS: Record<string, { agonists: string[]; antagonists: string[] }> = {
  'shoulder:flexion': { agonists: [...DELT_C, PEC[0], 'coracobrachialis-muscle', ...BICEPS], antagonists: [...DELT_S, 'latissimus-dorsi-muscle', TRICEPS[0], 'teres-major-muscle'] },
  'shoulder:extension': { agonists: [...DELT_S, 'latissimus-dorsi-muscle', 'teres-major-muscle', TRICEPS[0]], antagonists: [...DELT_C, PEC[0], 'coracobrachialis-muscle', ...BICEPS] },
  'shoulder:abduction': { agonists: [...DELT_A, 'supraspinatus-muscle'], antagonists: [...PEC, 'latissimus-dorsi-muscle', 'teres-major-muscle'] },
  'shoulder:adduction': { agonists: [...PEC, 'latissimus-dorsi-muscle', 'teres-major-muscle'], antagonists: [...DELT_A, 'supraspinatus-muscle'] },
  'shoulder:medial-rotation': { agonists: ['subscapularis-muscle', ...PEC, 'latissimus-dorsi-muscle', 'teres-major-muscle', ...DELT_C], antagonists: ['infraspinatus-muscle', 'teres-minor-muscle', ...DELT_S] },
  'shoulder:lateral-rotation': { agonists: ['infraspinatus-muscle', 'teres-minor-muscle', ...DELT_S], antagonists: ['subscapularis-muscle', ...PEC, 'latissimus-dorsi-muscle', 'teres-major-muscle'] },
  'elbow:flexion': { agonists: ['brachialis-muscle', ...BICEPS, 'brachioradialis-muscle'], antagonists: [...TRICEPS, 'anconeus-muscle'] },
  'elbow:extension': { agonists: [...TRICEPS, 'anconeus-muscle'], antagonists: ['brachialis-muscle', ...BICEPS, 'brachioradialis-muscle'] },
  'radioulnar:pronation': { agonists: ['pronator-quadratus', ...PRON_TERES], antagonists: ['supinator', ...BICEPS] },
  'radioulnar:supination': { agonists: ['supinator', ...BICEPS], antagonists: ['pronator-quadratus', ...PRON_TERES] },
  'wrist:flexion': { agonists: ['flexor-carpi-radialis', ...FCU, 'palmaris-longus-muscle', ...FDS], antagonists: ['extensor-carpi-radialis-longus', 'extensor-carpi-radialis-brevis', ...ECU, 'extensor-digitorum'] },
  'wrist:extension': { agonists: ['extensor-carpi-radialis-longus', 'extensor-carpi-radialis-brevis', ...ECU, 'extensor-digitorum'], antagonists: ['flexor-carpi-radialis', ...FCU, 'palmaris-longus-muscle', ...FDS] },
  'wrist:radial-deviation': { agonists: ['flexor-carpi-radialis', 'extensor-carpi-radialis-longus', 'extensor-carpi-radialis-brevis'], antagonists: [...FCU, ...ECU] },
  'wrist:ulnar-deviation': { agonists: [...FCU, ...ECU], antagonists: ['flexor-carpi-radialis', 'extensor-carpi-radialis-longus', 'extensor-carpi-radialis-brevis'] },
  'hip:flexion': { agonists: [...ILIOPSOAS, 'rectus-femoris-muscle', 'sartorius-muscle', 'tensor-fasciae-latae', 'pectineus-muscle'], antagonists: ['gluteus-maximus-muscle', ...HAM] },
  'hip:extension': { agonists: ['gluteus-maximus-muscle', HAM[0], HAM[2], HAM[3]], antagonists: [...ILIOPSOAS, 'rectus-femoris-muscle'] },
  'hip:abduction': { agonists: ['gluteus-medius-muscle', 'gluteus-minimus-muscle', 'tensor-fasciae-latae'], antagonists: ADDUCT },
  'hip:adduction': { agonists: ADDUCT, antagonists: ['gluteus-medius-muscle', 'gluteus-minimus-muscle', 'tensor-fasciae-latae'] },
  'hip:medial-rotation': { agonists: ['gluteus-minimus-muscle', 'gluteus-medius-muscle', 'tensor-fasciae-latae'], antagonists: [...LAT_ROT_HIP, 'gluteus-maximus-muscle'] },
  'hip:lateral-rotation': { agonists: [...LAT_ROT_HIP, 'gluteus-maximus-muscle'], antagonists: ['gluteus-minimus-muscle', 'tensor-fasciae-latae'] },
  'knee:flexion': { agonists: [...HAM, 'gracilis-muscle', 'sartorius-muscle', ...GASTRO], antagonists: QUAD },
  'knee:extension': { agonists: QUAD, antagonists: [...HAM, ...GASTRO] },
  'ankle:dorsiflexion': { agonists: ['tibialis-anterior-muscle', 'extensor-digitorum-longus', 'extensor-hallucis-longus', 'fibularis-tertius-muscle'], antagonists: [...GASTRO, 'soleus-muscle'] },
  'ankle:plantarflexion': { agonists: [...GASTRO, 'soleus-muscle', 'plantaris-muscle', 'calcaneal-tendon'], antagonists: ['tibialis-anterior-muscle', 'extensor-digitorum-longus', 'extensor-hallucis-longus'] },
  'subtalar:inversion': { agonists: ['tibialis-posterior-muscle', 'tibialis-anterior-muscle'], antagonists: ['fibularis-longus-muscle', 'fibularis-brevis-muscle'] },
  'subtalar:eversion': { agonists: ['fibularis-longus-muscle', 'fibularis-brevis-muscle', 'fibularis-tertius-muscle'], antagonists: ['tibialis-posterior-muscle', 'tibialis-anterior-muscle'] },
};

export interface MuscleEntry {
  /** structure keys that make up the muscle (default: the key itself, or its group members) */
  parts?: string[];
  /** clips, most typical action first; each clip is a set of moves played together */
  clips: Move[][];
}

const one = (...moves: Move[]): Move[][] => moves.map((m) => [m]);

/** Concept key -> actions. Keys may be a muscle, a muscle group or one head/part. */
export const MUSCLES: Record<string, MuscleEntry> = {
  // shoulder
  'deltoid-muscle': { parts: [...DELT_A, ...DELT_C, ...DELT_S], clips: one(J('shoulder', 'abduction'), J('shoulder', 'flexion'), J('shoulder', 'extension')) },
  'acromial-part-of-deltoid-muscle': { clips: one(J('shoulder', 'abduction')) },
  'clavicular-part-of-deltoid-muscle': { clips: one(J('shoulder', 'flexion'), J('shoulder', 'medial-rotation')) },
  'scapular-spinal-part-of-deltoid-muscle': { clips: one(J('shoulder', 'extension'), J('shoulder', 'lateral-rotation')) },
  'supraspinatus-muscle': { clips: one(J('shoulder', 'abduction')) },
  'infraspinatus-muscle': { clips: one(J('shoulder', 'lateral-rotation')) },
  'teres-minor-muscle': { clips: one(J('shoulder', 'lateral-rotation')) },
  'subscapularis-muscle': { clips: one(J('shoulder', 'medial-rotation')) },
  'rotator-cuff-muscles': { parts: ['supraspinatus-muscle', 'infraspinatus-muscle', 'teres-minor-muscle', 'subscapularis-muscle'], clips: one(J('shoulder', 'abduction'), J('shoulder', 'lateral-rotation'), J('shoulder', 'medial-rotation')) },
  'teres-major-muscle': { clips: one(J('shoulder', 'adduction'), J('shoulder', 'medial-rotation'), J('shoulder', 'extension')) },
  'latissimus-dorsi-muscle': { clips: one(J('shoulder', 'adduction'), J('shoulder', 'extension'), J('shoulder', 'medial-rotation')) },
  'pectoralis-major-muscle': { parts: PEC, clips: one(J('shoulder', 'adduction'), J('shoulder', 'medial-rotation'), J('shoulder', 'flexion')) },
  'clavicular-head-of-pectoralis-major-muscle': { clips: one(J('shoulder', 'flexion'), J('shoulder', 'adduction')) },
  'sternocostal-head-of-pectoralis-major-muscle': { clips: one(J('shoulder', 'adduction'), J('shoulder', 'medial-rotation')) },
  'abdominal-part-of-pectoralis-major-muscle': { clips: one(J('shoulder', 'adduction')) },
  'coracobrachialis-muscle': { clips: [[J('shoulder', 'flexion', 60)], [J('shoulder', 'adduction')]] },
  // arm
  'biceps-brachii-muscle': { parts: BICEPS, clips: [[J('elbow', 'flexion')], [J('radioulnar', 'supination')], [J('shoulder', 'flexion', 45)]] },
  'long-head-of-biceps-brachii': { clips: [[J('elbow', 'flexion')], [J('radioulnar', 'supination')], [J('shoulder', 'flexion', 45)]] },
  'short-head-of-biceps-brachii': { clips: [[J('elbow', 'flexion')], [J('radioulnar', 'supination')], [J('shoulder', 'flexion', 45)]] },
  'brachialis-muscle': { clips: one(J('elbow', 'flexion')) },
  'triceps-brachii-muscle': { parts: TRICEPS, clips: [[J('elbow', 'extension')], [J('shoulder', 'extension', 30)]] },
  'long-head-of-triceps-brachii': { clips: [[J('elbow', 'extension')], [J('shoulder', 'extension', 30)]] },
  'lateral-head-of-triceps-brachii': { clips: one(J('elbow', 'extension')) },
  'medial-head-of-triceps-brachii': { clips: one(J('elbow', 'extension')) },
  'anconeus-muscle': { clips: one(J('elbow', 'extension')) },
  // forearm
  'brachioradialis-muscle': { clips: one(J('elbow', 'flexion')) },
  'pronator-teres': { parts: PRON_TERES, clips: one(J('radioulnar', 'pronation'), J('elbow', 'flexion', 90)) },
  'superficial-head-of-pronator-teres': { clips: one(J('radioulnar', 'pronation')) },
  'deep-head-of-pronator-teres': { clips: one(J('radioulnar', 'pronation')) },
  'pronator-quadratus': { clips: one(J('radioulnar', 'pronation')) },
  supinator: { clips: one(J('radioulnar', 'supination')) },
  'flexor-carpi-radialis': { clips: one(J('wrist', 'flexion'), J('wrist', 'radial-deviation')) },
  'flexor-carpi-ulnaris': { parts: FCU, clips: one(J('wrist', 'flexion'), J('wrist', 'ulnar-deviation')) },
  'humeral-head-of-flexor-carpi-ulnaris': { clips: one(J('wrist', 'flexion'), J('wrist', 'ulnar-deviation')) },
  'ulnar-head-of-flexor-carpi-ulnaris': { clips: one(J('wrist', 'flexion'), J('wrist', 'ulnar-deviation')) },
  'palmaris-longus-muscle': { clips: one(J('wrist', 'flexion')) },
  'flexor-digitorum-superficialis': { parts: FDS, clips: one(J('wrist', 'flexion')) },
  'humero-ulnar-head-of-flexor-digitorum-superficialis': { clips: one(J('wrist', 'flexion')) },
  'radial-head-of-flexor-digitorum-superficialis': { clips: one(J('wrist', 'flexion')) },
  'flexor-digitorum-profundus': { clips: one(J('wrist', 'flexion')) },
  'extensor-carpi-radialis-longus': { clips: one(J('wrist', 'extension'), J('wrist', 'radial-deviation')) },
  'extensor-carpi-radialis-brevis': { clips: one(J('wrist', 'extension'), J('wrist', 'radial-deviation')) },
  'extensor-carpi-ulnaris': { parts: ECU, clips: one(J('wrist', 'extension'), J('wrist', 'ulnar-deviation')) },
  'humeral-head-of-extensor-carpi-ulnaris': { clips: one(J('wrist', 'extension'), J('wrist', 'ulnar-deviation')) },
  'ulnar-head-of-extensor-carpi-ulnaris': { clips: one(J('wrist', 'extension'), J('wrist', 'ulnar-deviation')) },
  'extensor-digitorum': { clips: one(J('wrist', 'extension')) },
  // hip
  'iliopsoas-muscle': { parts: ILIOPSOAS, clips: one(J('hip', 'flexion')) },
  'psoas-major': { clips: one(J('hip', 'flexion')) },
  'iliacus-muscle': { clips: one(J('hip', 'flexion')) },
  'gluteus-maximus-muscle': { clips: one(J('hip', 'extension'), J('hip', 'lateral-rotation')) },
  'gluteus-medius-muscle': { clips: one(J('hip', 'abduction'), J('hip', 'medial-rotation')) },
  'gluteus-minimus-muscle': { clips: one(J('hip', 'abduction'), J('hip', 'medial-rotation')) },
  'tensor-fasciae-latae': { clips: one(J('hip', 'abduction'), J('hip', 'flexion', 45), J('hip', 'medial-rotation')) },
  'piriformis-muscle': { clips: one(J('hip', 'lateral-rotation')) },
  'obturator-internus': { clips: one(J('hip', 'lateral-rotation')) },
  'superior-gemellus-muscle': { clips: one(J('hip', 'lateral-rotation')) },
  'inferior-gemellus-muscle': { clips: one(J('hip', 'lateral-rotation')) },
  'quadratus-femoris-muscle': { clips: one(J('hip', 'lateral-rotation')) },
  'obturator-externus': { clips: one(J('hip', 'lateral-rotation')) },
  'deep-gluteal-muscles': { parts: LAT_ROT_HIP.slice(0, 5), clips: one(J('hip', 'lateral-rotation')) },
  // thigh
  'sartorius-muscle': { clips: [[J('hip', 'flexion', 45), J('hip', 'abduction', 25), J('hip', 'lateral-rotation', 30), J('knee', 'flexion', 70)], [J('knee', 'flexion')]] },
  'rectus-femoris-muscle': { clips: one(J('knee', 'extension'), J('hip', 'flexion', 45)) },
  'vastus-lateralis-muscle': { clips: one(J('knee', 'extension')) },
  'vastus-medialis-muscle': { clips: one(J('knee', 'extension')) },
  'vastus-intermedius-muscle': { clips: one(J('knee', 'extension')) },
  'quadriceps-femoris-muscle': { parts: QUAD, clips: one(J('knee', 'extension')) },
  'quadriceps-femoris': { parts: QUAD, clips: one(J('knee', 'extension')) },
  'adductor-longus': { clips: one(J('hip', 'adduction')) },
  'adductor-brevis': { clips: one(J('hip', 'adduction')) },
  'adductor-magnus': { clips: one(J('hip', 'adduction'), J('hip', 'extension')) },
  'adductor-minimus': { clips: one(J('hip', 'adduction')) },
  'pectineus-muscle': { clips: one(J('hip', 'adduction'), J('hip', 'flexion', 45)) },
  'gracilis-muscle': { clips: one(J('hip', 'adduction'), J('knee', 'flexion', 90)) },
  'long-head-of-biceps-femoris': { clips: [[J('knee', 'flexion')], [J('hip', 'extension')]] },
  'short-head-of-biceps-femoris': { clips: one(J('knee', 'flexion')) },
  'biceps-femoris-muscle': { parts: HAM.slice(0, 2), clips: [[J('knee', 'flexion')], [J('hip', 'extension')]] },
  'semitendinosus-muscle': { clips: [[J('knee', 'flexion')], [J('hip', 'extension')]] },
  'semimembranosus-muscle': { clips: [[J('knee', 'flexion')], [J('hip', 'extension')]] },
  'posterior-compartment-of-thigh': { parts: HAM, clips: [[J('knee', 'flexion')], [J('hip', 'extension')]] },
  // leg
  'gastrocnemius-muscle': { parts: GASTRO, clips: one(J('ankle', 'plantarflexion'), J('knee', 'flexion', 60)) },
  'gastrocnemius': { parts: GASTRO, clips: one(J('ankle', 'plantarflexion'), J('knee', 'flexion', 60)) },
  'medial-head-of-gastrocnemius': { clips: one(J('ankle', 'plantarflexion'), J('knee', 'flexion', 60)) },
  'lateral-head-of-gastrocnemius': { clips: one(J('ankle', 'plantarflexion'), J('knee', 'flexion', 60)) },
  'soleus-muscle': { clips: one(J('ankle', 'plantarflexion')) },
  'plantaris-muscle': { clips: one(J('ankle', 'plantarflexion')) },
  'triceps-surae-muscle': { parts: [...GASTRO, 'soleus-muscle', 'calcaneal-tendon'], clips: one(J('ankle', 'plantarflexion')) },
  'superficial-part-of-posterior-compartment-of-leg': { parts: [...GASTRO, 'soleus-muscle', 'plantaris-muscle', 'calcaneal-tendon'], clips: one(J('ankle', 'plantarflexion')) },
  'tibialis-anterior-muscle': { clips: one(J('ankle', 'dorsiflexion'), J('subtalar', 'inversion')) },
  'extensor-digitorum-longus': { clips: one(J('ankle', 'dorsiflexion'), J('subtalar', 'eversion')) },
  'extensor-hallucis-longus': { clips: one(J('ankle', 'dorsiflexion')) },
  'fibularis-tertius-muscle': { clips: one(J('ankle', 'dorsiflexion'), J('subtalar', 'eversion')) },
  'anterior-compartment-of-leg': { parts: ['tibialis-anterior-muscle', 'extensor-digitorum-longus', 'extensor-hallucis-longus', 'fibularis-tertius-muscle'], clips: one(J('ankle', 'dorsiflexion')) },
  'fibularis-longus-muscle': { clips: one(J('subtalar', 'eversion'), J('ankle', 'plantarflexion')) },
  'fibularis-brevis-muscle': { clips: one(J('subtalar', 'eversion'), J('ankle', 'plantarflexion')) },
  'lateral-compartment-of-leg': { parts: ['fibularis-longus-muscle', 'fibularis-brevis-muscle'], clips: one(J('subtalar', 'eversion')) },
  'tibialis-posterior-muscle': { clips: one(J('subtalar', 'inversion'), J('ankle', 'plantarflexion')) },
  'flexor-digitorum-longus': { clips: one(J('ankle', 'plantarflexion'), J('subtalar', 'inversion')) },
  'flexor-hallucis-longus': { clips: one(J('ankle', 'plantarflexion')) },
};

/** Joint concept keys -> rig joint. */
export const JOINT_KEYS: Record<string, JointId> = {
  'glenohumeral-joint': 'shoulder',
  'elbow-joint': 'elbow',
  'humero-ulnar-joint': 'elbow',
  'humeroradial-joint': 'elbow',
  'proximal-radio-ulnar-joint': 'radioulnar',
  'distal-radio-ulnar-joint': 'radioulnar',
  'radio-ulnar-syndesmoses': 'radioulnar',
  'radiocarpal-joint': 'wrist',
  'midcarpal-joint': 'wrist',
  'hip-joint': 'hip',
  'knee-joint': 'knee',
  'ankle-joint': 'ankle',
  'talocrural-joint': 'ankle',
  'subtalar-joint': 'subtalar',
  'talocalcaneal-joint': 'subtalar',
  'talocalcaneonavicular-joint': 'subtalar',
};

/** Movements of each joint, in the order the Motion mode lists them. */
export const JOINT_MOVES: Record<JointId, MovementId[]> = {
  shoulder: ['flexion', 'extension', 'abduction', 'adduction', 'medial-rotation', 'lateral-rotation'],
  elbow: ['flexion', 'extension'],
  radioulnar: ['pronation', 'supination'],
  wrist: ['flexion', 'extension', 'radial-deviation', 'ulnar-deviation'],
  hip: ['flexion', 'extension', 'abduction', 'adduction', 'medial-rotation', 'lateral-rotation'],
  knee: ['flexion', 'extension'],
  ankle: ['dorsiflexion', 'plantarflexion'],
  subtalar: ['inversion', 'eversion'],
};
