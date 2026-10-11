export function LogoMark({ className = 'size-8' }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <polygon
        points="20,2 35.6,11 35.6,29 20,38 4.4,29 4.4,11"
        className="fill-brand-700"
      />
      <polygon points="20,8 30.4,14 30.4,26 20,32 9.6,26 9.6,14" className="fill-brand-50" />
      <circle cx="20" cy="12.5" r="3" className="fill-aasabi" />
      <circle cx="26.5" cy="24" r="3" className="fill-azlati" />
      <circle cx="13.5" cy="24" r="3" className="fill-ghudi" />
    </svg>
  );
}
