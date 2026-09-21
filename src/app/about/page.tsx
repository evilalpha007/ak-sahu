import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "Yagami — About",
};

export default function Page() {
  return <AboutPage />;
}
