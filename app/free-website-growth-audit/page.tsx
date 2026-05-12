import type { Metadata } from "next";
import { landingPages } from "../landing-page-data";
import { LandingPageTemplate } from "../landing-page-template";

const page = landingPages.freeWebsiteGrowthAudit;

export const metadata: Metadata = {
  title: {
    absolute: page.metaTitle,
  },
  description: page.metaDescription,
  alternates: {
    canonical: `https://growth.gurubox.ai${page.slug}`,
  },
};

export default function FreeWebsiteGrowthAuditPage() {
  return <LandingPageTemplate page={page} />;
}
