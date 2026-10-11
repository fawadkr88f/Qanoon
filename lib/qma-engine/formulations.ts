import type { Formulation, FormulationDegree, FormulationHazard, OrderId } from '@/types/qma';

/** Sheet "2_Pharmacopeia (Orders 1-6)" — Sabir Multani formulation matrix. */

export const DEGREE_INFO: Readonly<
  Record<FormulationDegree, { label: string; urdu: string; role: string; practitionerOnly: boolean }>
> = {
  shadeed: { label: 'Shadeed', urdu: 'شدید', role: 'Stimulant', practitionerOnly: false },
  mulyan: { label: 'Mulyan', urdu: 'ملین', role: 'Aperient', practitionerOnly: false },
  mushil: { label: 'Mus-hil', urdu: 'مسہل', role: 'Purgative', practitionerOnly: true },
  akseer: { label: 'Akseer', urdu: 'اکسیر', role: 'Elixir', practitionerOnly: true },
};

export const DEGREE_SEQUENCE: readonly FormulationDegree[] = ['shadeed', 'mulyan', 'mushil', 'akseer'];

export const HAZARD_LABELS: Readonly<Record<FormulationHazard, string>> = {
  mercury: 'Contains mercury compounds',
  arsenic: 'Contains arsenic compounds (Hartal)',
  croton: 'Contains purified croton (Jamalgota)',
  'strong-purgative': 'Strong purgative',
  mineral: 'Processed mineral ingredient',
};

const URDU_DIGITS = ['', '۱', '۲', '۳', '۴', '۵', '۶'] as const;

interface FormulaRow {
  readonly ingredients: readonly string[];
  readonly ratio: string;
  readonly singleDose: string;
  readonly frequency: string;
  readonly purpose: string;
  readonly hazards?: readonly FormulationHazard[];
}

function formula(order: OrderId, degree: FormulationDegree, row: FormulaRow): Formulation {
  const info = DEGREE_INFO[degree];
  const hazards = row.hazards ?? [];
  return {
    order,
    degree,
    name: `${info.label} No. ${order}`,
    nameUrdu: `${info.urdu} ${URDU_DIGITS[order]}`,
    ingredients: row.ingredients,
    ratio: row.ratio,
    singleDose: row.singleDose,
    frequency: row.frequency,
    purpose: row.purpose,
    practitionerOnly: info.practitionerOnly || hazards.length > 0,
    hazards,
  };
}

export const FORMULATIONS: readonly Formulation[] = [
  // ── Order 1 ────────────────────────────────────────────────────────────────
  formula(1, 'shadeed', {
    ingredients: ['Post Reetha (Soapnut husk)', 'Kishneez Khushk (Coriander seeds)'],
    ratio: '1:1 (equal parts)',
    singleDose: '500 mg – 1 g',
    frequency: '2–3× daily with water',
    purpose: 'Cool down internal bilious heat, relieve acidity & insomnia',
  }),
  formula(1, 'mulyan', {
    ingredients: ['Shadeed No. 1 base', 'Gond Kikar (Acacia gum)', 'Maghz Tukhm Kadu (Pumpkin seed kernel)'],
    ratio: '1:1:1 (equal parts)',
    singleDose: '1 g – 2 g',
    frequency: '1–2× daily with water or milk',
    purpose: 'Gentle stool softening in high-heat conditions without irritation',
  }),
  formula(1, 'mushil', {
    ingredients: ['Mulyan No. 1 base', 'Halela Siah Biryan (Roasted Black Myrobalan)'],
    ratio: '2 parts Mulyan 1 : 1 part Halela Siah',
    singleDose: '1 g – 1.5 g',
    frequency: 'Bedtime with warm milk',
    purpose: 'Clear deep-seated bilious toxins from bowel and urinary tract',
    hazards: ['strong-purgative'],
  }),
  formula(1, 'akseer', {
    ingredients: ['Phitkari Safaid Biryan (Purified Alum)', 'Kishneez (Coriander)', 'Gond Kikar (Acacia gum)'],
    ratio: '4 : 2 : 2',
    singleDose: '125 mg – 250 mg',
    frequency: '1–2× daily with water',
    purpose: 'Rapid bleeding control, severe burning dysentery, ulceration',
    hazards: ['mineral'],
  }),

  // ── Order 2 ────────────────────────────────────────────────────────────────
  formula(2, 'shadeed', {
    ingredients: ['Filfil Siah (Black Pepper)', 'Post Halela Zard (Yellow Myrobalan rind)', 'Amla Khushk (Dried Amla)'],
    ratio: '10 g : 20 g : 30 g (1:2:3)',
    singleDose: '250 mg – 500 mg',
    frequency: '2–3× daily after meals',
    purpose: 'Stimulate heart & muscle tone, counter excessive phlegmatic diarrhoea',
  }),
  formula(2, 'mulyan', {
    ingredients: ['Shadeed No. 2 base', 'Sana Makki (Senna leaves)'],
    ratio: '60 g : 60 g (1:1)',
    singleDose: '1 g – 2 g',
    frequency: 'Night with lukewarm water',
    purpose: 'Aperient for cold-damp conditions, expels phlegmatic waste',
  }),
  formula(2, 'mushil', {
    ingredients: ['Mulyan No. 2 base', 'Jamalgota Mudabbar (Purified Croton)'],
    ratio: '120 g : 10 g',
    singleDose: '250 mg – 500 mg',
    frequency: 'Single dose with warm water',
    purpose: 'Intense evacuation for dropsy, phlegmatic coma, ascites',
    hazards: ['croton', 'strong-purgative'],
  }),
  formula(2, 'akseer', {
    ingredients: ['Hartal Warqiya Mudabbar (Processed Orpiment)', 'Post Halela Zard', 'Gond Kikar'],
    ratio: '10 g : 30 g : 20 g',
    singleDose: '60 mg – 125 mg',
    frequency: 'Once daily in butter/cream',
    purpose: 'Deep chronic cold phlegm, chronic respiratory catarrh',
    hazards: ['arsenic'],
  }),

  // ── Order 3 ────────────────────────────────────────────────────────────────
  formula(3, 'shadeed', {
    ingredients: ['Long (Cloves)', 'Darcheeni (Cinnamon)', 'Javitri (Mace)'],
    ratio: '10 g : 30 g : 20 g (1:3:2)',
    singleDose: '250 mg – 500 mg',
    frequency: '3× daily with water or kahwa',
    purpose: 'Stimulate arterial circulation, elevate low BP, treat tabkheer',
  }),
  formula(3, 'mulyan', {
    ingredients: ['Shadeed No. 3 base', 'Sana Makki (Senna leaves)'],
    ratio: '60 g : 60 g (1:1)',
    singleDose: '1 g – 2 g',
    frequency: 'Bedtime with warm water',
    purpose: 'Break stubborn dry-cold constipation, relieve cardiac flatulence',
  }),
  formula(3, 'mushil', {
    ingredients: ['Mulyan No. 3 base', 'Jamalgota Mudabbar (Purified Croton)'],
    ratio: '120 g : 10 g',
    singleDose: '250 mg – 500 mg',
    frequency: 'Once with warm milk',
    purpose: 'Clear deep melancholic/acidic humours, relieve chronic paralysis',
    hazards: ['croton', 'strong-purgative'],
  }),
  formula(3, 'akseer', {
    ingredients: ['Shangraf Mudabbar (Processed Cinnabar)', 'Long (Cloves)', 'Darcheeni (Cinnamon)'],
    ratio: '10 g : 20 g : 30 g',
    singleDose: '30 mg – 60 mg',
    frequency: 'Morning in butter/malai',
    purpose: 'Supreme neuromuscular tonic, treats hypothermia, sexual debility',
    hazards: ['mercury'],
  }),

  // ── Order 4 ────────────────────────────────────────────────────────────────
  formula(4, 'shadeed', {
    ingredients: ['Gandhak Amlasar (Purified Sulphur)', 'Rai (Mustard seeds)'],
    ratio: '70 g : 50 g (7:5)',
    singleDose: '500 mg – 1 g',
    frequency: '2–3× daily after meals',
    purpose: 'Stimulate liver, eliminate excess uric acid, relieve dry cough & asthma',
  }),
  formula(4, 'mulyan', {
    ingredients: ['Shadeed No. 4 base', 'Babchi (Psoralea seeds)', 'Sana Makki (Senna leaves)'],
    ratio: '120 g : 20 g : 140 g',
    singleDose: '1 g – 2 g',
    frequency: '1–2× daily with water',
    purpose: 'Blood purifier, skin disorders (eczema, psoriasis), relieves gout',
  }),
  formula(4, 'mushil', {
    ingredients: ['Mulyan No. 4 base', 'Revand Asarah (Rhubarb extract)'],
    ratio: '280 g : 30 g',
    singleDose: '500 mg – 1 g',
    frequency: 'Night with warm water',
    purpose: 'Evacuate toxic liver congestion, high uric crystals and joint deposits',
    hazards: ['strong-purgative'],
  }),
  formula(4, 'akseer', {
    ingredients: ['Seemab Mudabbar (Processed Mercury)', 'Gandhak (Sulphur, as Kajjali)', 'Filfil Siah (Black Pepper)'],
    ratio: '10 g : 20 g : 10 g',
    singleDose: '30 mg – 60 mg',
    frequency: 'Once daily in butter/malai',
    purpose: 'Intensive blood purification, severe chronic skin lesions',
    hazards: ['mercury'],
  }),

  // ── Order 5 ────────────────────────────────────────────────────────────────
  formula(5, 'shadeed', {
    ingredients: ['Zanjabeel (Dry Ginger)', 'Naushadar (Ammonium Chloride)', 'Filfil Siah (Black Pepper)'],
    ratio: '50 g : 20 g : 10 g (5:2:1)',
    singleDose: '250 mg – 500 mg',
    frequency: '2–3× daily after meals',
    purpose: 'Stimulate biliary secretions, warm glandular organs, relieve gas',
  }),
  formula(5, 'mulyan', {
    ingredients: ['Shadeed No. 5 base', 'Sana Makki (Senna leaves)'],
    ratio: '80 g : 80 g (1:1)',
    singleDose: '1 g – 2 g',
    frequency: 'Bedtime with warm water',
    purpose: 'Standard liver aperient, softens stools, clears chronic constipation',
  }),
  formula(5, 'mushil', {
    ingredients: ['Mulyan No. 5 base', 'Revand Asarah (Rhubarb extract)'],
    ratio: '160 g : 40 g',
    singleDose: '500 mg – 1 g',
    frequency: 'Single dose with warm water',
    purpose: 'Evacuate obstructed bile, treat jaundice, relieve portal hypertension',
    hazards: ['strong-purgative'],
  }),
  formula(5, 'akseer', {
    ingredients: ['Hartal Warqiya Mudabbar (Processed Orpiment)', 'Zanjabeel (Dry Ginger)', 'Filfil Siah (Black Pepper)'],
    ratio: '10 g : 40 g : 20 g (ground fine)',
    singleDose: '60 mg – 125 mg',
    frequency: 'Once daily in cream/milk',
    purpose: 'Potent anti-spasmodic, relieves deep muscular aches, chronic arthritis',
    hazards: ['arsenic'],
  }),

  // ── Order 6 ────────────────────────────────────────────────────────────────
  formula(6, 'shadeed', {
    ingredients: ['Haldi (Turmeric)', 'Gond Kikar (Acacia gum)', 'Chob Zard (Amba Haldi)'],
    ratio: '50 g : 30 g : 20 g (5:3:2)',
    singleDose: '500 mg – 1 g',
    frequency: '2–3× daily with water',
    purpose: 'Soothe gastrointestinal inflammation, heal gastric ulcers, reduce heat',
  }),
  formula(6, 'mulyan', {
    ingredients: ['Shadeed No. 6 base', 'Sana Makki (Senna leaves)'],
    ratio: '100 g : 100 g (1:1)',
    singleDose: '1 g – 2 g',
    frequency: '1–2× daily with water or milk',
    purpose: 'Soft laxative for heat-stroke, burning stools, relieves haemorrhoids',
  }),
  formula(6, 'mushil', {
    ingredients: ['Mulyan No. 6 base', 'Revand Khatai (Rhubarb)'],
    ratio: '200 g : 50 g',
    singleDose: '500 mg – 1 g',
    frequency: 'Night with warm milk',
    purpose: 'Clear extreme heat toxicity, high-fever crisis, bilious dysentery',
    hazards: ['strong-purgative'],
  }),
  formula(6, 'akseer', {
    ingredients: ['Maghz Badam (Almond kernel)', 'Chobchini (China root)', 'Haldi (Turmeric)', 'Zafran (Saffron)'],
    ratio: '40 g : 20 g : 20 g : 5 g',
    singleDose: '250 mg – 500 mg',
    frequency: 'Twice daily with warm milk',
    purpose: 'Brain and nervous regenerative tonic, relieves dry anxiety, hypertension',
  }),
];
