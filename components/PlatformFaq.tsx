/**
 * The category questions, answered on the page.
 *
 * This exists for a specific reason: nothing on the site defined what an SDR
 * management platform IS, or how it differs from a sales engagement tool, so
 * neither a search engine nor an answer engine had a passage to lift for the
 * queries the repositioning is aimed at. Each answer is written to stand alone
 * — a reader (or a model) should be able to quote one without the surrounding
 * page for context, which is why they repeat the subject rather than saying
 * "it" or "the platform".
 *
 * The same array feeds the FAQPage JSON-LD in app/platform/layout.tsx. Marking
 * up questions that are not visible on the page is a guidelines violation, so
 * these two must never diverge — that is why the data is exported from here,
 * where it is rendered, rather than duplicated in the schema file.
 */
export const PLATFORM_FAQ = [
  {
    q: 'What is an SDR management platform?',
    a: 'An SDR management platform is the software an SDR leader uses to run a sales development team, rather than the software a rep uses to send outreach. It holds territories and account ownership, decides what each rep should work on today, runs execution across email, calls and tasks, tracks meetings through to the AE handoff, and reports on what the team produced. Harvin is an SDR management platform: it gives a manager one place to see who owns which accounts, whether those accounts are being worked, and whether the activity turned into pipeline.',
  },
  {
    q: 'How is that different from a sales engagement platform?',
    a: 'A sales engagement platform helps a rep execute — sequences, email, dialing. An SDR management platform is aimed a level up: it decides who should work which accounts, sets the priorities each rep starts the day with, and connects that work to the pipeline it eventually created. Harvin includes the execution channels, but the reason it exists is the management layer around them, which is normally assembled from spreadsheets, CRM reports and manager workflows.',
  },
  {
    q: 'How does Harvin decide what an SDR should work on today?',
    a: 'Harvin ranks each rep’s book by account fit, live buying signals and how similar accounts have performed before. Signals include hiring activity, headcount growth, funding events, tech-stack changes and M&A, and every account shows the reason it ranked — so a rep opens the day with an ordered list and the evidence behind it, rather than a decision to make.',
  },
  {
    q: 'What does an SDR manager see that they cannot see today?',
    a: 'Who owns which accounts, which of those accounts are actually being worked and which are untouched, what each rep is focused on, which sequences and channels are producing conversations, and how much qualified pipeline the team generated. Those questions normally require piecing together a CRM report, a spreadsheet and a sales engagement dashboard; Harvin answers them from one live view.',
  },
  {
    q: 'How does AI coaching work?',
    a: 'Harvin surfaces patterns a manager would otherwise have to find by inspecting activity or listening to calls — reps generating activity but few conversations, meetings that rarely qualify, accounts repeatedly missing follow-up, objections recurring across the team, and sequences losing effectiveness. It points at where coaching would have the most impact; the coaching itself stays with the manager.',
  },
  {
    q: 'Who is Harvin built for?',
    a: 'SDR leaders and SDR managers who own a team’s output, CROs and sales leaders who need to know what the sales development investment is producing, and the SDRs themselves — who get a focused workspace around their own accounts, prospects, conversations and tasks in return for the visibility their manager gains.',
  },
];

export default function PlatformFaq() {
  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 max-w-[720px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">Common questions</p>
          <h2 className="mt-4 text-[clamp(27px,3.2vw,42px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
            What an SDR management platform is, and what it is not
          </h2>
        </div>

        <div className="border-t border-slate-200 dark:border-white/[0.08]">
          {PLATFORM_FAQ.map((f) => (
            <div
              key={f.q}
              className="grid gap-3 border-b border-slate-200 py-7 dark:border-white/[0.08] md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-12"
            >
              <h3 className="text-[17px] font-bold leading-[1.35] tracking-[-0.015em] text-slate-900 dark:text-white">
                {f.q}
              </h3>
              <p className="text-[15.5px] leading-[1.7] text-slate-600 dark:text-slate-400">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
