import { cn } from '@/lib/cn';
import type { IntakeOption, IntakeQuestion, OptionKey } from '@/types/qma';

interface QuestionStepProps {
  readonly question: IntakeQuestion;
  readonly selectedOptionKey?: OptionKey;
  readonly onSelect: (key: OptionKey) => void;
}

export function QuestionStep({ question, selectedOptionKey, onSelect }: QuestionStepProps) {
  return (
    <fieldset className="space-y-6">
      <legend className="sr-only">
        {question.domain}: {question.prompt}
      </legend>

      <div>
        <span className="inline-block rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-800">
          {question.domain}
        </span>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {question.prompt}
        </h2>
        {question.rationale && (
          <p className="mt-1 text-xs text-slate-500 italic">
            Clinical focus: {question.rationale}
          </p>
        )}
      </div>

      <div className="space-y-3" role="radiogroup" aria-label={question.prompt}>
        {question.options.map((option: IntakeOption) => {
          const isSelected = selectedOptionKey === option.key;

          return (
            <label
              key={option.key}
              className={cn(
                'group relative flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-left transition-all',
                'hover:border-brand-400 hover:bg-slate-50/70',
                isSelected
                  ? 'border-brand-600 bg-brand-50/50 shadow-sm ring-1 ring-brand-600'
                  : 'border-slate-200 bg-white'
              )}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.key}
                checked={isSelected}
                onChange={() => onSelect(option.key)}
                className="mt-1 size-4 shrink-0 text-brand-600 focus:ring-brand-500 border-slate-300"
              />
              <div className="flex-1">
                <span className="text-sm font-medium leading-relaxed text-slate-800">
                  {option.label}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
