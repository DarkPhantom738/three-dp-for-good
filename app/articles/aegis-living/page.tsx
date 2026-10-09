import type { Metadata } from "next";
import { MissionArticle } from "../mission-article";

export const metadata: Metadata = {
  title: "Our Visit to Aegis Living | 3DP for Good",
  description: "Brian Wakefield talked with us about activities, walkers, games, and mealtimes at Aegis Living.",
};

export default function AegisLivingArticle() {
  return <MissionArticle
    organization="Aegis Living"
    title="Our visit to Aegis Living"
    date="Community visit"
    byline="Interview with Brian Wakefield"
    introduction="We visited Aegis Living to ask Brian Wakefield what we could make for residents. He talked us through activities in memory care, the trouble some residents have using game controllers, and everyday tasks like eating with a fork and knife. Here are a few things we took away from the conversation."
    photos={[{ src: "/assets/aegis-visit.jpg", alt: "Aegis Living representative with three members of the 3DP for Good team outside the care community.", caption: "Our team with an Aegis Living representative after our visit." }]}
    sections={[
      {
        heading: "Activities in memory care",
        paragraphs: [
          "Brian told us about activities staff already use, like sorting colors or separating forks from spoons. Familiar tasks can be comforting for residents, though staff sometimes need new versions of the same activity after doing it for months.",
          "He suggested keeping the rules simple. Returning tiles to a box, for example, is easy to explain to both residents and volunteers. He also described a larger fidget object that expands and compacts as something we could look into making.",
        ],
        quotes: [{ text: "To a certain extent, repetition is really comfortable for them.", attribution: "Brian Wakefield, on familiar activities in memory care" }],
        audio: { src: "/assets/aegis-repetition.m4a", label: "Brian on repetitive activities", description: "A short excerpt from our Aegis Living interview." },
      },
      {
        heading: "Choosing materials",
        paragraphs: [
          "Brian asked us to think carefully about what an object is made of and how someone might use it. Some residents living with dementia may put objects in their mouths, so small pieces are a concern.",
          "He described wanting something flexible and non-toxic. Those details give us a starting point for choosing materials and deciding which ideas are worth developing with the care team.",
        ],
        audio: { src: "/assets/aegis-material-safety.m4a", label: "Brian on safe materials", description: "A short excerpt about materials for memory care." },
      },
      {
        heading: "Walkers and games",
        paragraphs: [
          "Some residents forget their walkers. We talked about whether a soft handle or a feature that catches their attention could help them remember. It is an idea we would need to try with residents and staff.",
          "Brian also mentioned Wii Sports. Residents can enjoy the games, but remembering which buttons to press can get in the way. He was interested in bowling or tennis games that respond to a simple arm movement.",
        ],
        quotes: [{ text: "We take it for granted, our hand-eye coordination.", attribution: "Brian Wakefield, on hand-eye coordination" }],
        audio: { src: "/assets/aegis-motion-games.m4a", label: "Brian on movement-based games", description: "A short excerpt about simplifying familiar games." },
      },
      {
        heading: "Ideas to work on",
        paragraphs: [
          "At mealtimes, Brian said some residents need extra help using a fork and knife. That gave us another task to think about as we consider what to make next.",
          "We left with several ideas to sketch out: larger fidget objects, simpler games, and ways to make walkers easier to notice. We still need to make prototypes and get feedback from residents and staff before we know which of them will work.",
        ],
        quotes: [{ text: "a large population of seniors who just need a little extra help", attribution: "Brian Wakefield, describing residents at mealtime" }],
      },
    ]}
  />;
}
