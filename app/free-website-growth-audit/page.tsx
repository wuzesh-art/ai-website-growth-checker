import type { Metadata } from "next";
import { landingPages } from "../landing-page-data";
import { LandingPageTemplate } from "../landing-page-template";

const page = landingPages.freeWebsiteGrowthAudit;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function FreeWebsiteGrowthAuditPage() {
  return <LandingPageTemplate page={page} />;
}
