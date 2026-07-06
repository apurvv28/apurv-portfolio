import type { Metadata } from "next";
import AdminLoginClient from "@/components/admin/AdminLoginClient";

export const metadata: Metadata = {
  title: "Airlock Access",
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export default function AdminLoginPage(): JSX.Element {
  return <AdminLoginClient />;
}