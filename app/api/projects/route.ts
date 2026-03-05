import { NextRequest, NextResponse } from "next/server";
import { projectCreateSchema } from "@/lib/schemas/projectSchema";
import { createProject, getProjects } from "@/lib/services/projectService";

export async function GET(_request: NextRequest) {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = projectCreateSchema.parse(body);
    const project = await createProject(data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
