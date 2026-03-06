import { headers } from "next/headers";

export const enforceDashboardAuth = async () => {
  const requiredToken = process.env.DASHBOARD_ACCESS_TOKEN;

  if (!requiredToken) {
    return;
  }

  const requestHeaders = await headers();
  const token = requestHeaders.get("x-admin-token");

  if (token !== requiredToken) {
    throw new Error("Unauthorized");
  }
};
