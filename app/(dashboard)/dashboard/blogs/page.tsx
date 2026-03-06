import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import BlogsManager from "@/components/dashboard/BlogsManager";
import { blogKeys } from "@/lib/hooks/useBlogs";
import { getBlogs } from "@/lib/services/blogService";

export default async function BlogsPage() {
  const queryClient = new QueryClient();
  const blogs = await getBlogs();

  queryClient.setQueryData(blogKeys.all, blogs);

  return (
    <section className="space-y-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogsManager />
      </HydrationBoundary>
    </section>
  );
}
