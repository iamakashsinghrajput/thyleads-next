/**
 * The problem: best-fit customers are defined by context a database filter
 * can't express. Three examples contrast what a filter sees with what actually
 * decides fit, then the section hands off to what Harvin does about it.
 *
 * Deliberately no product visual: this is the one section where the product
 * should not appear. Showing a screen here would answer the problem before it
 * lands.
 */

const EXAMPLES = [
  {
    seller: 'A payments company',
    cares: 'may care about who receives money internationally.',
    filter: 'Industry: Fintech',
    fit: 'Who receives money internationally',
  },
  {
    seller: 'A retail software company',
    cares: 'may care about store count.',
    filter: 'Industry: Retail',
    fit: 'Store count',
  },
  {
    seller: 'A SaaS company',
    cares: 'may care about the tools a business uses.',
    filter: 'Employees: 50–500',
    fit: 'The tools a business uses',
  },
];

const COLUMNS = ['If you sell', 'A database filter sees', 'What decides fit'];

export default function SdrProblem() {
  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 max-w-[760px] lg:mb-14">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">The problem</p>
          <h2 className="mt-4 text-[clamp(27px,3.2vw,42px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
            B2B company discovery that starts
            <br />
            with your business, not a filter.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
            Your best-fit customers are rarely defined by industry, size and location alone.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.02]">
          {/* Column labels — desktop only; on mobile each row labels its own chips. */}
          <div
            aria-hidden="true"
            className="hidden border-b border-slate-200 px-6 py-4 text-[13px] font-medium text-slate-500 dark:border-white/[0.08] dark:text-slate-400 lg:grid lg:grid-cols-[1.7fr_1fr_1.15fr] lg:gap-6"
          >
            {COLUMNS.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>

          <ul>
            {EXAMPLES.map((ex) => (
              <li
                key={ex.seller}
                className="grid gap-4 border-b border-slate-200 px-6 py-5 last:border-b-0 dark:border-white/[0.06] lg:grid-cols-[1.7fr_1fr_1.15fr] lg:items-center lg:gap-6"
              >
                <p className="text-[16px] leading-[1.55] text-slate-600 dark:text-slate-400">
                  <strong className="font-semibold text-slate-900 dark:text-white">{ex.seller}</strong>{' '}
                  {ex.cares}
                </p>

                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 lg:hidden">
                    {COLUMNS[1]}
                  </span>
                  <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[14px] font-medium text-slate-400 line-through decoration-slate-400 dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-slate-500 dark:decoration-slate-500">
                    <span className="sr-only">Not: </span>
                    {ex.filter}
                  </span>
                </div>

                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 lg:hidden">
                    {COLUMNS[2]}
                  </span>
                  <span className="inline-flex rounded-lg border border-ember-500 bg-ember-50 px-3 py-1.5 text-[14px] font-semibold text-ember-600 dark:border-ember-400/70 dark:bg-ember-500/[0.08] dark:text-ember-400">
                    {ex.fit}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 max-w-[860px] lg:mt-14">
          <p className="text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
            That context is hard to fit into a few database filters.
          </p>
          <p className="mt-4 text-[clamp(22px,2.4vw,30px)] font-semibold leading-[1.3] tracking-[-0.02em] text-slate-900 dark:text-white">
            So teams still spend hours researching companies, checking whether they actually fit, and
            finding the right people inside them.{' '}
            <span className="text-ember-500 dark:text-ember-400">Harvin was built to do that work.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
