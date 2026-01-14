import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Method | TheArc",
  description: "The ARC screening is built to do one thing well: turn a small amount of information into a clear, practical plan. No guessing. No fear based messaging. No one size advice.",
};

export default function MethodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




