/**
 * The problem, stated as the six questions a manager can't answer quickly.
 *
 * Copy is taken verbatim from the positioning wireframe. It sits between the
 * hero and the SDR-management-layer flow, so the reader hits the gap before
 * they are shown the thing that closes it.
 *
 * Deliberately no visual: this is the one section where the product should not
 * appear. Showing a screen here would answer the questions before they land.
 */

const QUESTIONS = [
  'Who owns which accounts?',
  'Are the right accounts being worked?',
  'What is each SDR focused on?',
  'What’s generating conversations and meetings?',
  'Which reps need help?',
  'Is all of this activity actually creating pipeline?',
];

export default function SdrProblem() {
  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 max-w-[760px] lg:mb-14">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">The problem</p>
          <h2 className="mt-4 text-[clamp(27px,3.2vw,42px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
            Your SDR team has plenty of tools.
            <br />
            You still don’t have one place to run it.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
            Your SDRs use sales engagement tools for email, calls and sequences. Your CRM records
            what happens later.
          </p>
          <p className="mt-3 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
            But managing the team still means piecing together spreadsheets, CRM reports, dashboards
            and different platforms to answer basic questions.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUESTIONS.map((q) => (
            <div
              key={q}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-white/[0.08] dark:bg-white/[0.02]"
            >
              <span
                aria-hidden="true"
                className="mt-[3px] font-bricolage text-[15px] font-bold leading-none text-ember-500"
              >
                ?
              </span>
              <span className="text-[15px] font-semibold leading-[1.4] tracking-[-0.01em] text-slate-900 dark:text-white">
                {q}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[17px] font-bold tracking-[-0.015em] text-slate-900 dark:text-white">
          Harvin gives you one place to manage the SDR operation behind it all.
        </p>
      </div>
    </section>
  );
}
