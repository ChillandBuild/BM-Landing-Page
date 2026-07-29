import type { Metadata } from "next";
import DesignReviewClient from "./DesignReviewClient";

export const metadata: Metadata = {
  title: "Design Review (internal)",
  robots: { index: false, follow: false },
};

export default function DesignReviewPage() {
  return <DesignReviewClient />;
}
