import type { Metadata } from "next";
import { MissionArticle } from "../mission-article";
import { aegisStory } from "../story-data";

export const metadata: Metadata = {
  title: "Our Visit to Aegis Living | 3DP for Good",
  description: "Brian Wakefield talked with us about activities, walkers, games, and mealtimes at Aegis Living.",
};

export default function AegisLivingArticle() {
  return <MissionArticle {...aegisStory} />;
}
