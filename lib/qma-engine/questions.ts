import type { IntakeQuestion } from '@/types/qma';

/**
 * Sheet "5_Diagnostic Intake Matrix" — 10 weighted questions.
 * Option A → Aasabi, B → Azlati, C → Ghudi, with per-option weights.
 *
 * `tieBreakPriority` ranks the strongest diagnostic markers:
 *   1 = Qarura (urine colour, strongest proxy for Nabz)
 *   2 = Tongue coating
 *   3 = Thermal profile
 */
export const INTAKE_QUESTIONS: readonly IntakeQuestion[] = [
  {
    id: 'Q1.1',
    section: 'Temperament',
    domain: 'Thermal profile',
    prompt: 'How does your body react to climate and temperature?',
    rationale: 'Primary metabolic temperature vector',
    tieBreakPriority: 3,
    options: [
      { key: 'A', tissue: 'aasabi', weight: 3, label: 'Chilly or neutral; cold brings lethargy, brain fog and water puffiness' },
      { key: 'B', tissue: 'azlati', weight: 3, label: 'Extremely sensitive to cold & draughts; cold worsens joint pain and spasms' },
      { key: 'C', tissue: 'ghudi', weight: 3, label: 'Intolerant to heat and sun; prone to hot flushes, crave iced drinks and shade' },
    ],
  },
  {
    id: 'Q1.2',
    section: 'Temperament',
    domain: 'Perspiration',
    prompt: 'What is your typical sweating pattern and skin feel?',
    rationale: 'Determines cutaneous moisture & lipid balance',
    options: [
      { key: 'A', tissue: 'aasabi', weight: 2, label: 'Cold, clammy sweat, or pale, soft, moist skin with minimal smell' },
      { key: 'B', tissue: 'azlati', weight: 2, label: 'Rarely sweat; skin stays dry, rough, scaly or tight' },
      { key: 'C', tissue: 'ghudi', weight: 2, label: 'Profuse, warm sweat with strong odour; skin feels oily or greasy' },
    ],
  },
  {
    id: 'Q2.1',
    section: 'Qarura (urine)',
    domain: 'Urine colour',
    prompt: 'What is the typical colour of your midday urine?',
    rationale: 'Strongest digital proxy for the physical pulse (Nabz)',
    tieBreakPriority: 1,
    options: [
      { key: 'A', tissue: 'aasabi', weight: 3, label: 'Completely clear, pale water-white (Boul Abyad)' },
      { key: 'B', tissue: 'azlati', weight: 3, label: 'Dark reddish-brown, like concentrated tea, or cloudy straw (Boul Ahmar)' },
      { key: 'C', tissue: 'ghudi', weight: 3, label: 'Bright vibrant yellow, lemon, or burning amber (Boul Asfar)' },
    ],
  },
  {
    id: 'Q2.2',
    section: 'Qarura (urine)',
    domain: 'Urinary frequency',
    prompt: 'What sensations and frequency accompany urination?',
    rationale: 'Differentiates organ irritation vs fluid congestion',
    options: [
      { key: 'A', tissue: 'aasabi', weight: 2, label: 'High frequency, large volume, waking 2+ times at night; no burning' },
      { key: 'B', tissue: 'azlati', weight: 2, label: 'Low volume, straining, retention, back stiffness; occasional gravel' },
      { key: 'C', tissue: 'ghudi', weight: 3, label: 'Scalding burning sensation, urgent flow, drop-by-drop discomfort' },
    ],
  },
  {
    id: 'Q3.1',
    section: 'Tongue & taste',
    domain: 'Tongue coating',
    prompt: "What best describes your tongue's appearance in the morning?",
    rationale: 'Direct marker of gastrointestinal & humoral build-up',
    tieBreakPriority: 2,
    options: [
      { key: 'A', tissue: 'aasabi', weight: 3, label: 'Thick white or milky-grey coat; moist, with tooth marks along the sides' },
      { key: 'B', tissue: 'azlati', weight: 3, label: 'Dry, darkish-brown coat; cracked surface, feels like sandpaper' },
      { key: 'C', tissue: 'ghudi', weight: 3, label: 'Bright yellow or yellowish-green coat; tip and margins are fiery red' },
    ],
  },
  {
    id: 'Q3.2',
    section: 'Tongue & taste',
    domain: 'Oral taste',
    prompt: 'What is the predominant taste in your mouth on waking?',
    rationale: 'Reflects dominant stomach acid vs biliary reflux',
    options: [
      { key: 'A', tissue: 'aasabi', weight: 2, label: 'Tasteless, insipid, sweetish, or excessively watery saliva' },
      { key: 'B', tissue: 'azlati', weight: 3, label: 'Sour, puckering acid taste (Khataas) or metallic astringency' },
      { key: 'C', tissue: 'ghudi', weight: 3, label: 'Bitter (Karwa), pungent, or dry throat with a foul taste' },
    ],
  },
  {
    id: 'Q4.1',
    section: 'Digestion',
    domain: 'Bowel pattern',
    prompt: 'What is your natural bowel elimination pattern?',
    rationale: 'Crucial for selecting stimulant (Shadeed) vs aperient (Mulyan)',
    options: [
      { key: 'A', tissue: 'aasabi', weight: 2, bowelStatus: 'purging', label: 'Loose, soft, frequent stools; tendency towards watery diarrhoea' },
      { key: 'B', tissue: 'azlati', weight: 3, bowelStatus: 'constipated', label: 'Hard, dry, small pellet-like stools; severe straining; skipping days' },
      { key: 'C', tissue: 'ghudi', weight: 3, bowelStatus: 'purging', label: 'Stools with burning rectal heat, yellow mucus, or sudden loose rushes' },
    ],
  },
  {
    id: 'Q4.2',
    section: 'Digestion',
    domain: 'Gas & bloating',
    prompt: 'Where is your discomfort or flatulence located?',
    rationale: 'Maps gas location (intestine vs stomach vs liver)',
    options: [
      { key: 'A', tissue: 'aasabi', weight: 2, label: 'Generalised abdominal fullness, water heaviness, bloating after meals' },
      { key: 'B', tissue: 'azlati', weight: 3, label: 'Upper gastric pressure (Tabkheer), sour belching, chest tightness or palpitations' },
      { key: 'C', tissue: 'ghudi', weight: 3, label: 'Right upper abdomen / liver fullness, nausea, burning acid reflux in the throat' },
    ],
  },
  {
    id: 'Q5.1',
    section: 'Mind & pain',
    domain: 'Neuro-psychological',
    prompt: 'How do stress and emotions show up for you?',
    rationale: 'Classifies central nervous vs cardiac vs hepatic mood',
    options: [
      { key: 'A', tissue: 'aasabi', weight: 2, label: 'Low mood, drowsiness, lack of drive, brain fog, excessive sleep' },
      { key: 'B', tissue: 'azlati', weight: 3, label: 'Intense anxiety, panic, insomnia, racing mind, muscle tension' },
      { key: 'C', tissue: 'ghudi', weight: 2, label: 'Short temper, anger outbursts, restless sleep, waking with a pounding pulse' },
    ],
  },
  {
    id: 'Q5.2',
    section: 'Mind & pain',
    domain: 'Pain character',
    prompt: 'What is the nature of your body or joint pain?',
    rationale: 'Confirms tissue pathology (nerve vs muscle vs blood)',
    options: [
      { key: 'A', tissue: 'aasabi', weight: 2, label: 'Dull, heavy ache; puffiness around ankles/knees; relieved by warmth' },
      { key: 'B', tissue: 'azlati', weight: 3, label: 'Sharp cramps, sciatic tightness, lower-back stiffness, uric acid spikes' },
      { key: 'C', tissue: 'ghudi', weight: 3, label: 'Throbbing, burning soles & palms; inflamed hot joints with redness' },
    ],
  },
];

/** Ordered, de-duplicated section labels for the progress stepper. */
export const INTAKE_SECTIONS: readonly string[] = Array.from(
  new Set(INTAKE_QUESTIONS.map((q) => q.section)),
);
