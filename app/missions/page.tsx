import type { Metadata } from "next";
import { MissionPage } from "./mission-page";

export const metadata: Metadata = {
  title: "Missions: Our Visit to Masonic Homes | 3DP for Good",
  description: "Our visit to Masonic Homes of California’s Union City campus, where we shared button hooks and book page holders with residents. Explore our BACH mobile clinic drive too.",
};

export default function MissionsPage() {
  return <MissionPage selected="masonic-homes" />;
}
