import type { Metadata } from 'next';
import { QMAAssessment } from '@/components/quiz/QMAAssessment';

export const metadata: Metadata = {
  title: 'Clinical Assessment · Qanoon-e-Mufrad Aza',
  description:
    'Private, client-side digital intake to determine your dominant tissue state (Tehreek) and 3-hop dietary balancing plan.',
};

export default function AssessmentPage() {
  return (
    <div className="container-page py-10">
      <div className="mx-auto max-w-2xl text-center space-y-2 mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Clinical QMA Self-Observation
        </h1>
        <p className="text-sm text-slate-600">
          Answer 10 diagnostic questions covering thermal temperament, Qarura (urine proxy),
          tongue signs, digestion, and neuro-emotional markers.
        </p>
      </div>

      <QMAAssessment />
    </div>
  );
}
