"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BlogCreateInput, BlogUpdateInput } from "@/lib/schemas/blogSchema";

export const blogKeys = {
  all: ["blogs"] as const,
};

const fetchBlogs = async () => {
  const response = await fetch("/api/blogs");

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return response.json();
};

const createBlog = async (input: BlogCreateInput) => {
  const response = await fetch("/api/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create blog");
  }

  return response.json();
};

const updateBlog = async (input: BlogUpdateInput) => {
  const response = await fetch(`/api/blogs/${input.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to update blog");
  }

  return response.json();
};

const deleteBlog = async (id: number) => {
  const response = await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }

  return response.json();
};

export const useBlogs = () =>
  useQuery({
    queryKey: blogKeys.all,
    queryFn: fetchBlogs,
  });

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: blogKeys.all }),
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: blogKeys.all }),
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: blogKeys.all }),
  });
};

