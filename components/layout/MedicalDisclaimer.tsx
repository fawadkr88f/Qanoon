import { Callout } from '@/components/ui/Callout';

export function MedicalDisclaimer({ className }: { readonly className?: string }) {
  return (
    <Callout tone="warning" title="Educational tool — not a medical diagnosis" className={className}>
      This self-observation is based on the classical Qanoon-e-Mufrad Aza framework and is intended for
      education only. Do not start, stop or change any medicine — including herbal or mineral formulations —
      without a qualified practitioner. If you have severe, sudden or worsening symptoms, contact your doctor or
      emergency services (EU: <strong>112</strong>, Pakistan: <strong>1122</strong>).
    </Callout>
  );
}
