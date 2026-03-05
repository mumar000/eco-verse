import { headers } from "next/headers";

export const enforceDashboardAuth = () => {
  const requiredToken = process.env.DASHBOARD_ACCESS_TOKEN;

  if (!requiredToken) {
    return;
  }

  const token = headers().get("x-admin-token");

  if (token !== requiredToken) {
    throw new Error("Unauthorized");
  }
};
