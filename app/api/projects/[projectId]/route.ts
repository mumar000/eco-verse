import { NextRequest, NextResponse } from "next/server";
import { projectUpdateSchema } from "@/lib/schemas/projectSchema";
import { deleteProject, updateProject } from "@/lib/services/projectService";

export async function PATCH(request: NextRequest, context: { params: Promise<{ projectId: string }> }) {
  try {
    const body = await request.json();
    const params = await context.params;
    const id = Number(params.projectId);
    const data = projectUpdateSchema.parse({ ...body, id });
    const project = await updateProject(data);
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ projectId: string }> }) {
  try {
    const params = await context.params;
    const id = Number(params.projectId);
    const project = await deleteProject(id);
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
