import Link from "next/link";

type LegalSubsection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalSection = {
  id: string;
  title: string;
  summary: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: LegalSubsection[];
};

type LegalPageTemplateProps = {
  eyebrow: string;
  title: string;
  intro: string;
  effectiveDate: string;
  breadcrumbs: {
    current: string;
  };
  sections: LegalSection[];
};

export default function LegalPageTemplate({
  eyebrow,
  title,
  intro,
  effectiveDate,
  breadcrumbs,
  sections,
}: LegalPageTemplateProps) {
  return (
    <div className="bg-background text-[#00522D]">
      <section className="relative overflow-hidden px-6 pb-10 pt-32 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange-200/60 via-orange-100/30 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
          <nav
            aria-label="Breadcrumb"
            className="font-clash text-[11px] uppercase tracking-[0.24em] text-[#00522D]/60"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#00522D]/30">
                /
              </li>
              <li className="text-[#00522D]">{breadcrumbs.current}</li>
            </ol>
          </nav>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div className="max-w-4xl">
              <span className="inline-flex rounded-full border border-[#00522D]/10 bg-white/70 px-4 py-2 font-clash text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-500 backdrop-blur">
                {eyebrow}
              </span>
              <h1 className="mt-5 max-w-4xl font-beni text-5xl leading-[0.92] text-[#00522D] sm:text-6xl lg:text-8xl">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl font-clash text-base leading-7 text-[#00522D]/75 sm:text-lg sm:leading-8">
                {intro}
              </p>
            </div>

            <div className="rounded-[30px] border border-[#00522D]/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,82,45,0.08)] backdrop-blur">
              <p className="font-clash text-[11px] font-semibold uppercase tracking-[0.24em] text-[#00522D]/45">
                Quick Access
              </p>
              <p className="mt-3 font-clash text-sm leading-6 text-[#00522D]/70">
                Effective date: {effectiveDate}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-full bg-[#00522D] px-5 py-3 font-clash text-xs font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Back to Home
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-[#00522D]/15 bg-orange-100 px-5 py-3 font-clash text-xs font-semibold uppercase tracking-[0.18em] text-[#00522D] transition-colors duration-300 hover:bg-orange-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[32px] border border-[#00522D]/10 bg-[#FFEDD5] p-6">
              <p className="font-clash text-[11px] font-semibold uppercase tracking-[0.24em] text-[#00522D]/45">
                On This Page
              </p>
              <ul className="mt-5 space-y-3">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-start gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-white/70"
                    >
                      <span className="font-clash text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-clash text-sm leading-5 text-[#00522D]/75 transition-colors group-hover:text-[#00522D]">
                        {section.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="space-y-6">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="rounded-[32px] border border-[#00522D]/10 bg-white px-6 py-8 shadow-[0_18px_50px_rgba(0,82,45,0.05)] sm:px-8 sm:py-10"
              >
                <div className="max-w-4xl">
                  <h2 className="font-beni text-3xl leading-tight text-[#00522D] sm:text-4xl">
                    {section.title}
                  </h2>
                  <p className="mt-3 font-clash text-sm uppercase tracking-[0.18em] text-orange-500">
                    {section.summary}
                  </p>

                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-6 font-clash text-base leading-8 text-[#00522D]/78"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets ? (
                    <ul className="mt-6 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 font-clash text-base leading-7 text-[#00522D]/78"
                        >
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-orange-400" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.subsections?.map((subsection) => (
                    <div
                      key={subsection.title}
                      className="mt-8 rounded-[28px] bg-[#FFF8F6] p-6"
                    >
                      <h3 className="font-beni text-2xl leading-tight text-[#00522D]">
                        {subsection.title}
                      </h3>
                      {subsection.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-4 font-clash text-base leading-8 text-[#00522D]/78"
                        >
                          {paragraph}
                        </p>
                      ))}

                      {subsection.bullets ? (
                        <ul className="mt-5 space-y-3">
                          {subsection.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex gap-3 font-clash text-base leading-7 text-[#00522D]/78"
                            >
                              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#00522D]" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-[32px] bg-[#00522D] px-6 py-8 text-white sm:px-8 sm:py-10">
              <p className="font-clash text-[11px] uppercase tracking-[0.24em] text-white/65">
                Need Clarification?
              </p>
              <h2 className="mt-3 font-beni text-3xl leading-tight sm:text-4xl">
                If anything here feels unclear, ask before you rely on it.
              </h2>
              <p className="mt-4 max-w-3xl font-clash text-base leading-8 text-white/75">
                The fastest route is our contact page. We can explain how these
                terms or privacy commitments apply to your relationship with Echo
                Verse.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex rounded-full bg-orange-300 px-5 py-3 font-clash text-xs font-semibold uppercase tracking-[0.18em] text-[#00522D] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Go to Contact
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
