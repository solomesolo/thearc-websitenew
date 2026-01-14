import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About The Arc | TheArc",
  description: "ARC is the operating system for long term human health. A personalized longevity system that adapts to your biology, lifestyle, and location so your health never has to start over.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




