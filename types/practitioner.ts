export type ConsultationMethod = 'in-person' | 'remote';

export type CountryCode = 'DE' | 'PK' | 'GB';

export interface VerificationInfo {
  readonly status: 'verified';
  /** ISO date of last credential check. */
  readonly verifiedOn: string;
  readonly registrationBody: string;
  readonly registrationNo: string;
}

export interface PractitionerContact {
  readonly phone?: string;
  /** E.164 digits without "+", used for wa.me links. */
  readonly whatsapp?: string;
  readonly email?: string;
  readonly website?: string;
}

export interface PractitionerProfile {
  readonly id: string;
  readonly name: string;
  /** e.g. "Hakim, Fazil-ut-Tib wal Jarahat (FTJ)" */
  readonly title: string;
  readonly clinicName: string;
  readonly city: string;
  readonly country: string;
  readonly countryCode: CountryCode;
  readonly methods: readonly ConsultationMethod[];
  readonly languages: readonly string[];
  readonly specialties: readonly string[];
  readonly yearsInPractice: number;
  readonly bio: string;
  readonly verification: VerificationInfo;
  readonly contact: PractitionerContact;
  /** Seed/demo data flag — must be false for real listings. */
  readonly isSample: boolean;
}
