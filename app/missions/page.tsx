import type { Metadata } from "next";
import { MissionPage } from "./mission-page";

export const metadata: Metadata = {
  title: "Missions: Our Visit to Masonic Homes | 3DP for Good",
  description: "Our latest mission at Masonic Homes, with photos, conversations, and recorded excerpts. Explore our BACH and Aegis Living visits too.",
};

export default function MissionsPage() {
  return <MissionPage selected="masonic-homes" />;
}
