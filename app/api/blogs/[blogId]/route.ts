import { NextRequest, NextResponse } from "next/server";
import { blogUpdateSchema, type BlogUpdateInput } from "@/lib/schemas/blogSchema";
import { deleteBlog, updateBlog } from "@/lib/services/blogService";
import { getOrCreateCategoryByName } from "@/lib/services/categoryService";

export async function PATCH(request: NextRequest, context: { params: Promise<{ blogId: string }> }) {
  try {
    const params = await context.params;
    const body = await request.json();
    const id = Number(params.blogId);
    const payload = { ...body, id };
    const data = blogUpdateSchema.parse(payload);
    const { categoryName, ...rest } = data;

    const parsedCategoryId =
      data.categoryId ??
      (categoryName
        ? (await getOrCreateCategoryByName(categoryName)).id
        : undefined);

    const normalized: BlogUpdateInput =
      parsedCategoryId !== undefined
        ? ({ ...rest, id, categoryId: parsedCategoryId } as BlogUpdateInput)
        : (rest as BlogUpdateInput);

    const blog = await updateBlog(normalized);
    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ blogId: string }> }) {
  try {
    const params = await context.params;
    const id = Number(params.blogId);
    const blog = await deleteBlog(id);
    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
