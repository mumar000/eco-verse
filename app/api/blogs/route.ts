import { NextRequest, NextResponse } from "next/server";
import { blogCreateSchema, type BlogCreateInput } from "@/lib/schemas/blogSchema";
import { createBlog, getBlogs } from "@/lib/services/blogService";
import { getOrCreateCategoryByName } from "@/lib/services/categoryService";

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = blogCreateSchema.parse(body);

    const categoryId =
      parsed.categoryId ??
      (parsed.categoryName
        ? (await getOrCreateCategoryByName(parsed.categoryName)).id
        : (await getOrCreateCategoryByName("General")).id);

    const payload: Omit<BlogCreateInput, "categoryName"> & { categoryId: number } = {
      ...parsed,
      categoryId,
    };
    const blog = await createBlog(payload);
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
