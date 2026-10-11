import type { OrderId, QMAOrder, TissueInfo, TissueType } from '@/types/qma';

/** Canonical tissue order (also used as the final deterministic tie-breaker). */
export const TISSUE_SEQUENCE: readonly TissueType[] = ['aasabi', 'azlati', 'ghudi'] as const;

export const TISSUES: Readonly<Record<TissueType, TissueInfo>> = {
  aasabi: {
    id: 'aasabi',
    name: 'Aasabi',
    nameUrdu: 'اعصابی',
    tissueEn: 'Nervous',
    organ: 'Brain',
    description:
      'Nervous tissue governed by the brain. Its stimulation produces cold, moist states and phlegm (Balgham).',
  },
  azlati: {
    id: 'azlati',
    name: 'Azlati',
    nameUrdu: 'عضلاتی',
    tissueEn: 'Muscular',
    organ: 'Heart',
    description:
      'Muscular tissue governed by the heart. Its stimulation produces dry states and black bile (Sauda).',
  },
  ghudi: {
    id: 'ghudi',
    name: 'Ghudi',
    nameUrdu: 'غدی',
    tissueEn: 'Glandular',
    organ: 'Liver',
    description:
      'Glandular tissue governed by the liver. Its stimulation produces hot states and yellow bile (Safra).',
  },
};

/**
 * The six orders in natural cyclical sequence (sheet "1_Overview & 3-Hop Logic").
 * Index i holds order i + 1.
 */
export const QMA_ORDERS: readonly QMAOrder[] = [
  {
    id: 1,
    slug: 'aasabi-azlati',
    primary: 'aasabi',
    secondary: 'azlati',
    systemEn: 'Nervous – Muscular',
    classicalName: 'Aasabi-Azlati',
    termUrdu: 'اعصابی عضلاتی',
    temperament: { en: 'Cold & Moist', ur: 'تر سرد' },
    dominantHumour: 'Balgham (Phlegm)',
    governingOrgan: 'Brain / Sensorimotor Nerves',
  },
  {
    id: 2,
    slug: 'azlati-aasabi',
    primary: 'azlati',
    secondary: 'aasabi',
    systemEn: 'Muscular – Nervous',
    classicalName: 'Azlati-Aasabi',
    termUrdu: 'عضلاتی اعصابی',
    temperament: { en: 'Dry & Cold', ur: 'خشک سرد' },
    dominantHumour: 'Sauda (Black Bile)',
    governingOrgan: 'Heart / Muscular Tissues',
  },
  {
    id: 3,
    slug: 'azlati-ghudi',
    primary: 'azlati',
    secondary: 'ghudi',
    systemEn: 'Muscular – Glandular',
    classicalName: 'Azlati-Ghudi',
    termUrdu: 'عضلاتی غدی',
    temperament: { en: 'Dry & Hot', ur: 'خشک گرم' },
    dominantHumour: 'Sauda / Acidic Bile',
    governingOrgan: 'Heart / Arterial Network',
  },
  {
    id: 4,
    slug: 'ghudi-azlati',
    primary: 'ghudi',
    secondary: 'azlati',
    systemEn: 'Glandular – Muscular',
    classicalName: 'Ghudi-Azlati',
    termUrdu: 'غدی عضلاتی',
    temperament: { en: 'Hot & Dry', ur: 'گرم خشک' },
    dominantHumour: 'Safra (Yellow Bile)',
    governingOrgan: 'Liver / Secretory Glands',
  },
  {
    id: 5,
    slug: 'ghudi-aasabi',
    primary: 'ghudi',
    secondary: 'aasabi',
    systemEn: 'Glandular – Nervous',
    classicalName: 'Ghudi-Aasabi',
    termUrdu: 'غدی اعصابی',
    temperament: { en: 'Hot & Moist', ur: 'گرم تر' },
    dominantHumour: 'Safra / Moist Bile',
    governingOrgan: 'Liver / Excretory Epithelium',
  },
  {
    id: 6,
    slug: 'aasabi-ghudi',
    primary: 'aasabi',
    secondary: 'ghudi',
    systemEn: 'Nervous – Glandular',
    classicalName: 'Aasabi-Ghudi',
    termUrdu: 'اعصابی غدی',
    temperament: { en: 'Moist & Hot', ur: 'تر گرم' },
    dominantHumour: 'Balgham (Warm Phlegm)',
    governingOrgan: 'Brain / Parasympathetic System',
  },
] as const satisfies readonly QMAOrder[];

export const ORDER_IDS: readonly OrderId[] = [1, 2, 3, 4, 5, 6];

/** Explanatory copy for the stimulation dynamics and triad. */
export const TRIAD_COPY = {
  tehreek: {
    label: 'Tehreek',
    urdu: 'تحریک',
    state: 'Hyperactive / Stimulated',
    description:
      'The currently stimulated, diseased organ producing excess pathological humour. Orders 1, 3, 5 are Mechanical (میکانیکی); Orders 2, 4, 6 are Chemical (کیمیاوی). At a given time, it is paired with either Tehleel or Taskeen.',
  },
  tehleel: {
    label: 'Tehleel',
    urdu: 'تحلیل',
    state: 'Dissolving / Depleted',
    description:
      'In Mechanical stimulation (Orders 1, 3, 5), the organ located 2 hops further in the cycle undergoes Tehleel (depletion/dissolution). Medication and dietary regimen are administered directly to this Tehleel area.',
  },
  taskeen: {
    label: 'Taskeen',
    urdu: 'تسکین',
    state: 'Dormant / Sedated',
    description:
      'In Chemical stimulation (Orders 2, 4, 6), the organ located 2 hops further in the cycle undergoes Taskeen (sedation/dormancy). Medication and dietary regimen are administered directly to this Taskeen area.',
  },
} as const;
