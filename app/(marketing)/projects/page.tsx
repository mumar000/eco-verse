import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/services/projectService";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-7xl px-6 py-14 md:px-10">
      <h1 className="text-4xl font-bold text-foreground md:text-5xl">Case Studies</h1>
      <p className="mt-3 max-w-2xl text-sm text-foreground/70 md:text-base">
        Explore campaign stories, impact metrics, and strategy breakdowns.
      </p>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
          >
            <Link href={`/projects/${project.slug}`} className="block">
              <div className="relative aspect-[16/9] bg-zinc-100">
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="space-y-2 p-5">
                <h2 className="text-2xl font-semibold text-foreground">{project.title}</h2>
                {project.shortDescription ? (
                  <p className="line-clamp-2 text-sm text-foreground/70">{project.shortDescription}</p>
                ) : null}
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

