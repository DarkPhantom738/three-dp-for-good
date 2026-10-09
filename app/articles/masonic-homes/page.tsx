import type { Metadata } from "next";
import { MissionArticle } from "../mission-article";

export const metadata: Metadata = {
  title: "Our Visit to Masonic Homes | 3DP for Good",
  description: "Our Masonic Homes visit, the button hooks and book page holders we shared, and what we learned about practical aids for older adults.",
};

export default function MasonicHomesArticle() {
  return <MissionArticle
    organization="Masonic Homes of California · Union City Campus"
    title="Our visit to Masonic Homes"
    date="September 29, 2026"
    byline="Interview with Jennifer Macrae · Union City, California"
    introduction="On September 29, we brought button hooks and book page holders to Masonic Homes of California’s Union City campus. Residents tried the aids, and we spoke with Jennifer Macrae about other things we could make. Shoes, socks, and buttons came up right away."
    sections={[
      {
        heading: "Shoes, socks, and buttons",
        paragraphs: [
          "When we asked Jennifer which daily tasks residents need help with, she mentioned putting on shoes, tying laces, and pulling up socks. Bending down can be difficult for residents with back problems, dizziness, or limited mobility.",
          "Jennifer explained that reaching down can also increase the risk of a fall. Staff often help residents get dressed, and she was interested in tools that could help with those tasks.",
          "She also brought up arthritis and difficulty fastening buttons. The button hooks we brought have a larger handle and a hook that guides a button through its buttonhole.",
        ],
        quotes: [{ text: "Whenever the residents are reaching down, they’re more at risk for fall.", attribution: "Jennifer Macrae, on dressing and mobility" }],
        audio: { src: "/assets/masonic-fall-risk.m4a", label: "Jennifer on reaching and fall risk", description: "A short excerpt from our Masonic Homes interview." },
      },
      {
        heading: "Activities in memory care",
        paragraphs: [
          "Jennifer suggested that a larger fidget object with a repetitive movement could be useful in memory care. She cautioned us about small parts that could become choking hazards.",
          "We had already been discussing fidget objects as a team. Her feedback gave us something specific to work on: keeping the movement simple and making the object large enough to handle safely.",
        ],
        audio: { src: "/assets/masonic-memory-care.m4a", label: "Jennifer on memory-care safety", description: "A short excerpt about the size and design of tactile aids." },
      },
      {
        heading: "What we brought",
        paragraphs: [
          "We gave away button hooks and book page holders during the visit. The page holders keep a book open while someone reads. Residents tried the tools and took some to use themselves.",
          "The sock and shoe aids Jennifer mentioned are ideas for a future visit. She invited us to follow up with questions, and we would like to bring back prototypes for residents and staff to try.",
        ],
        quotes: [{ text: "I saw a lot of people take those items.", attribution: "Jennifer Macrae, after seeing residents choose the aids" }],
        audio: { src: "/assets/masonic-buttons.m4a", label: "Jennifer on button hooks", description: "A short excerpt about the aids residents chose." },
      },
    ]}
  />;
}
