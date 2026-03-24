export const dynamic = "force-dynamic";

import { getBlogs } from "@/lib/services/blogService";
import BlogList from "@/components/blog/BlogList";

export default async function BlogPage() {
  const blogs = await getBlogs();

  return <BlogList blogs={blogs} />;
}
