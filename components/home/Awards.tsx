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
          showcaseProjects.map((project, idx) => (
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
                } relative w-full max-w-[260px] overflow-hidden rounded-md bg-white transition-all duration-500 hover:shadow-md md:max-w-[280px] lg:max-w-[260px] 2xl:max-w-[300px]`}
                style={{
                  transform: project.align === "left" ? "rotate(-2deg)" : "rotate(2deg)",
                }}
              >
                {/* Decorative Corner */}
                <div className={`absolute top-0 ${project.align === "left" ? "right-0" : "left-0"} h-24 w-24 overflow-hidden`}>
                  <div className={`absolute ${project.align === "left" ? "-right-12 -top-12" : "-left-12 -top-12"} h-24 w-24 rounded-full bg-gradient-to-br from-[#F97316] to-[#ff6b35] opacity-20`}></div>
                </div>

              

                {/* Project Image with Overlay */}
                <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-square">
                  {project.coverImage ? (
                    <>
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-2"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00522D] via-[#00522D] to-transparent opacity-10"></div>
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F97316] via-[#fdba74] to-[#15803d]">
                      <svg
                        className="h-20 w-20 text-white/30"
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

                  {/* Floating Tags on Image */}
                  
                </div>

                {/* Project Content with Tilted Effect */}
                <div className="relative space-y-3 p-5 md:p-6 lg:p-5 2xl:p-6">
                  {/* Decorative Line */}
                  <div className="h-px w-10 rounded-full bg-gradient-to-r from-[#F97316] to-[#15803d]"></div>

                  <h3 className=" text-lg  font-medium leading-[1.1] text-[#00522D] transition-colors group-hover:text-[#F97316] md:text-xl lg:text-md md 2xl:text-xl">
                    {project.title}
                  </h3>

                  <p className="line-clamp-2 font-clash text-xs leading-relaxed text-zinc-600 md:text-sm lg:text-xs 2xl:text-sm">
                    {project.shortDescription || "Explore this amazing project and discover the creative process behind it."}
                  </p>

                </div>

                {/* Decorative Bottom Corner */}
                <div className={`absolute bottom-0 ${project.align === "left" ? "left-0" : "right-0"} h-16 w-16 overflow-hidden`}>
                  <div className={`absolute ${project.align === "left" ? "-left-8 -bottom-8" : "-right-8 -bottom-8"} h-16 w-16 rounded-full bg-gradient-to-br from-[#15803d] to-[#00522D] opacity-10`}></div>
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
