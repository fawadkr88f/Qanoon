import { cn } from '@/lib/cn';

interface StepProgressProps {
  readonly currentStep: number;
  readonly totalSteps: number;
  readonly currentSection: string;
  readonly className?: string;
}

export function StepProgress({
  currentStep,
  totalSteps,
  currentSection,
  className,
}: StepProgressProps) {
  const percentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-xs font-medium text-slate-600">
        <span className="uppercase tracking-wider text-brand-700">
          Section: <strong className="font-semibold text-slate-800">{currentSection}</strong>
        </span>
        <span aria-live="polite">
          Question {currentStep + 1} of {totalSteps} ({percentage}%)
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Assessment progress: Question ${currentStep + 1} of ${totalSteps}`}
        className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
      >
        <div
          className="h-full bg-brand-600 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
