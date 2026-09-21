import type { Metadata } from "next";
import WorkPage from "@/components/pages/WorkPage";

export const metadata: Metadata = {
  title: "Yagami — Work",
};

export default function Page() {
  return <WorkPage />;
}
