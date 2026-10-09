import type { Metadata } from "next";
import { MissionArticle } from "../mission-article";
import { masonicStory } from "../story-data";

export const metadata: Metadata = {
  title: "Our Visit to Masonic Homes | 3DP for Good",
  description: "Our Masonic Homes visit, the button hooks and book page holders we shared, and what we learned about practical aids for older adults.",
};

export default function MasonicHomesArticle() {
  return <MissionArticle {...masonicStory} />;
}
