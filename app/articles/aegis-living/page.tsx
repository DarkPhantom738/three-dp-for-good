import type { Metadata } from "next";
import { MissionArticle } from "../mission-article";

export const metadata: Metadata = {
  title: "Designing with Memory Care in Mind | 3DP for Good",
  description: "What we learned from Brian Wakefield at Aegis Living about designing safe, familiar, engaging aids for older adults.",
};

export default function AegisLivingArticle() {
  return <MissionArticle
    organization="Aegis Living"
    title="Designing with memory care in mind"
    date="Community listening session"
    byline="Interview with Brian Wakefield"
    introduction="We met with Brian Wakefield at Aegis Living to ask a deceptively simple question: what would make an ordinary day a little easier for residents and the people who care for them? Brian answered with practical examples from memory care, activities, mobility, and mealtimes. The conversation did not produce a finished invention. It gave us something more useful at the beginning of a design process: a clearer picture of the people and situations a tool would need to serve."
    photos={[{ src: "/assets/aegis-visit.jpg", alt: "Aegis Living representative with three members of the 3DP for Good team outside the care community.", caption: "Our team with an Aegis Living representative after the listening visit." }]}
    sections={[
      {
        heading: "What we learned",
        paragraphs: [
          "Brian described sorting activities that staff already use: matching colors, separating forks from spoons, and putting objects into familiar groups. The routine can be reassuring, but repeating the same activity for months can also leave staff looking for ways to renew it. That tension matters to designers. An activity should feel understandable and familiar to a resident while giving the care team room to adapt it.",
          "He emphasized keeping the interaction simple. A clear, visible rule can help a resident get started and can help a volunteer support the activity without a long explanation. One example he offered was returning tiles to a box. The point is to make the invitation to participate easy to understand while still respecting adults’ interests and preferences.",
          "Brian also suggested that repetitive hand movements can be engaging for some residents. He imagined a larger fidget object that expands and compacts, with movement built into the design. Any such idea would need to be developed around residents’ interests, handling abilities, and the care setting."
        ],
        quotes: [{ text: "To a certain extent, repetition is really comfortable for them.", attribution: "Brian Wakefield, on familiar activities in memory care" }],
        audio: { src: "/assets/aegis-repetition.m4a", label: "Brian on repetitive activities", description: "A short excerpt from our Aegis Living interview." },
      },
      {
        heading: "Safety and familiarity come first",
        paragraphs: [
          "The conversation also made clear that an object can be experienced differently by someone living with dementia. Brian cautioned that a person may misinterpret an object or put it in their mouth, especially in later stages. A design that looks harmless on a screen may not be appropriate in a memory-care setting. Material, size, edges, attachment points, and how easily a part can break off all deserve attention before a prototype reaches a resident.",
          "He described wanting a malleable, non-toxic object and raised concerns about small pieces. Familiarity matters too. Instead of assuming that a trendy fidget or game will appeal to everyone, designers should ask residents and staff what feels comfortable, recognizable, and worth returning to."
        ],
        audio: { src: "/assets/aegis-material-safety.m4a", label: "Brian on safe materials", description: "A short excerpt about materials for memory care." },
      },
      {
        heading: "Movement, mobility, and independence",
        paragraphs: [
          "Brian brought up residents forgetting their walkers. A soft, inviting handle or an easy-to-notice feature might draw attention to the walker, but the conversation left that as a design question—not a tested solution. He also talked about hand-eye coordination and games based on familiar actions such as matching, swinging, or tossing.",
          "He pointed to Wii Sports as an example of an activity residents can enjoy, while noting that the controller’s button sequences can be a barrier. He imagined bowling or tennis that responded to a simple arm movement. A motion-based game could remove the need to manage a sequence of buttons and let someone focus on the familiar movement itself."
        ],
        quotes: [{ text: "We take it for granted, our hand-eye coordination.", attribution: "Brian Wakefield, on skills many people do not notice until they become difficult" }],
        audio: { src: "/assets/aegis-motion-games.m4a", label: "Brian on movement-based games", description: "A short excerpt about simplifying familiar games." },
      },
      {
        heading: "From a conversation to a useful aid",
        paragraphs: [
          "Brian also connected design to ordinary tasks like using a fork and knife at mealtime. He described residents who eat in a communal dining room but need some extra help with these movements. A tool does not need to be high-tech to matter. A larger grip, a clear tactile cue, or a simple activity may help someone take part in a routine in a way that feels more comfortable to them. The right adaptation depends on the person; it should support their choices and preserve dignity, not turn an individual need into a one-size-fits-all product.",
          "This visit helped us identify directions to explore—safe tactile objects, intuitive games, and cues that make useful items easier to notice. We still need to sketch, prototype, and ask residents and care staff what works. A 3D print is only a starting point. It should be checked for stability, materials, fit, and safe use in the setting where it is meant to help.",
          "That is why conversations like this matter. Older adults and care professionals know which small moments can become difficult and which routines are meaningful. Assistive aids can make everyday tasks more approachable, but the most important first step is listening to the people who will use them."
        ],
        quotes: [{ text: "a large population of seniors who just need a little extra help", attribution: "Brian Wakefield, describing residents at mealtime" }],
      },
    ]}
  />;
}
