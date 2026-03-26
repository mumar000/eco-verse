import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/app/generated/prisma/client";

type AwardsProps = {
  projects?: Project[];
};

const Awards = ({ projects = [] }: AwardsProps) => {
  // Take first 8 projects and assign alternating alignment
  const showcaseProjects = projects.slice(0, 8).map((project, index) => ({
    ...project,
    index,
    align: index % 2 === 0 ? ("left" as const) : ("right" as const),
  }));

  return (
    <section className="relative bg-[#FFEDD5] py-20 md:py-24">
      <div className="mb-20 text-center md:mb-28">
        <h2 className="font-beni font-black text-6xl uppercase leading-none text-[#00522D] md:text-[10rem] lg:text-[8rem]">
          Projects
        </h2>
      </div>

      <div className="absolute left-1/2 top-[240px] bottom-0 hidden w-px -translate-x-1/2 bg-[#F97316]/20 md:block" />
      <div className="award-line-marker absolute left-1/2 top-[260px] z-20 hidden -translate-x-1/2 md:block">
        <div className="relative flex items-center justify-center">
          <div className="absolute left-1/1 top-1/2 h-[4px] w-10 -translate-x-1/2 -translate-y-1/2 bg-[#f97316]" />
        </div>
      </div>

      <div className="container mx-auto space-y-10 px-6 md:space-y-14">
        {showcaseProjects.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-3xl border-2 border-dashed border-[#F97316]/30 bg-white/50 px-8 py-16 text-center shadow-lg backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F97316]/10">
              <svg
                className="h-10 w-10 text-[#F97316]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="font-beni text-2xl font-bold uppercase text-[#00522D]">
              No Projects Yet
            </h3>
            <p className="mt-2 font-clash text-sm text-zinc-600">
              Projects will appear here once they're added to the dashboard.
            </p>
          </div>
        ) : (
          showcaseProjects.map((project) => (
            <div
              key={project.id}
              className={`relative flex flex-col items-center md:flex-row ${
                project.align === "left" ? "md:justify-start" : "md:justify-end"
              }`}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={`award-scroll group ${
                  project.align === "left"
                    ? "award-left md:ml-28"
                    : "award-right md:mr-28"
                } w-full max-w-[88vw] rounded-lg border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(113,74,39,0.12)] sm:max-w-[360px] md:max-w-[280px] md:p-4 lg:max-w-[240px] lg:p-3 2xl:max-w-[360px] 2xl:p-4 ${
                  project.index % 2 === 0
                    ? "border-[#d9c8c0] bg-[#eaded8]"
                    : "border-[#c8d7c6] bg-[#dde8db]"
                }`}
                style={{
                  transform:
                    project.align === "left" ? "rotate(-2deg)" : "rotate(2deg)",
                  ["--card-rotate" as string]:
                    project.align === "left" ? "-2deg" : "2deg",
                }}
              >
                <div
                  className={`relative aspect-1/1 w-full overflow-hidden rounded-lg md:rounded-[16px] lg:mx-auto lg:w-[95%] lg:rounded-lg 2xl:w-full 2xl:rounded-[20px] ${
                    project.index % 2 === 0 ? "bg-[#f7f3f1]" : "bg-[#eef4ec]"
                  }`}
                >
                  {project.coverImage ? (
                    <>
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    </>
                  ) : (
                    <div
                      className={`flex h-full w-full items-center justify-center ${
                        project.index % 2 === 0
                          ? "bg-[#f7f3f1]"
                          : "bg-[#eef4ec]"
                      }`}
                    >
                      <svg
                        className="h-16 w-16 text-[#1f1f1f]/20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="space-y-4 px-1 pb-1 pt-5 md:space-y-3 md:pt-4 lg:space-y-3 lg:pt-4 2xl:space-y-5 2xl:pt-6">
                  <h3
                    className={`font-clash text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.03em] transition-colors md:text-[1.4rem] lg:text-[1.2rem] 2xl:text-[1.85rem] ${
                      project.index % 2 === 0
                        ? "text-[#141414] group-hover:text-[#00522D]"
                        : "text-[#17351f] group-hover:text-[#0f5c2f]"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p
                    className={`max-w-[17ch] font-clash text-[0.95rem] leading-[1.12] md:max-w-[16ch] md:text-[0.82rem] lg:max-w-[25ch] lg:text-[0.70rem] 2xl:max-w-[17ch] 2xl:text-[0.95rem] ${
                      project.index % 2 === 0
                        ? "text-[#232323]"
                        : "text-[#28412e]"
                    }`}
                  >
                    {project.shortDescription ||
                      "Explore this amazing project and discover the creative process behind it."}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Awards;
