import { FOOD_GROUP_LABELS, MEAL_SLOTS, MEAL_SLOT_LABELS } from '@/lib/qma-engine';
import type { DietaryPlan, FoodGroups } from '@/types/qma';

const GROUP_KEYS = Object.keys(FOOD_GROUP_LABELS) as (keyof FoodGroups)[];

export function FoodGroupTable({ plan, caption }: { readonly plan: DietaryPlan; readonly caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 print:overflow-visible">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption ?? `Ghaza No. ${plan.ghazaNo} recommended foods by group`}</caption>
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th scope="col" className="w-1/3 px-4 py-3 font-semibold">Food group</th>
            <th scope="col" className="px-4 py-3 font-semibold">Recommended</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {GROUP_KEYS.map((key) => (
            <tr key={key} className="align-top">
              <th scope="row" className="px-4 py-3 font-medium text-slate-800">{FOOD_GROUP_LABELS[key]}</th>
              <td className="px-4 py-3 text-slate-700">
                <ul className="flex flex-wrap gap-1.5">
                  {plan.foodGroups[key].map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-brand-50 px-2 py-0.5 text-brand-900 ring-1 ring-inset ring-brand-100 print:bg-transparent print:ring-slate-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MealPlanTable({ plan, caption }: { readonly plan: DietaryPlan; readonly caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 print:overflow-visible">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption ?? `Diet Plan ${plan.ghazaNo} daily menu`}</caption>
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th scope="col" className="w-1/4 px-4 py-3 font-semibold">Meal</th>
            <th scope="col" className="px-4 py-3 font-semibold">Menu</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {MEAL_SLOTS.map((slot) => (
            <tr key={slot} className="align-top">
              <th scope="row" className="px-4 py-3 font-medium text-slate-800">{MEAL_SLOT_LABELS[slot]}</th>
              <td className="px-4 py-3 leading-relaxed text-slate-700">{plan.mealPlan[slot]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
