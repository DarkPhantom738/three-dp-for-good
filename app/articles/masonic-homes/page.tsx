import type { Metadata } from "next";
import { MissionArticle } from "../mission-article";

export const metadata: Metadata = {
  title: "Our Visit to Masonic Homes | 3DP for Good",
  description: "Our Masonic Homes visit, the button hooks and book page holders we shared, and what we learned about practical aids for older adults.",
};

export default function MasonicHomesArticle() {
  return <MissionArticle
    organization="Masonic Homes of California · Union City Campus"
    title="Small aids, more comfortable routines"
    date="September 29, 2026"
    byline="Interview with Jennifer Macrae · Union City, California"
    introduction="We visited Masonic Homes of California’s Union City campus to share practical aids and learn from residents and staff. Our conversation with Jennifer Macrae turned to routines that can become difficult with limited mobility—from pulling up socks to fastening buttons—and the kinds of simple tools that can make those moments more manageable."
    sections={[
      {
        heading: "What we learned",
        paragraphs: [
          "The interview began with a question about daily tasks residents might want help with. Jennifer immediately named reach and dressing aids: putting on shoes, tying laces, and pulling up socks. Those tasks can involve bending down, which may be harder for someone with back problems, dizziness, reduced mobility, or who uses a wheelchair.",
          "Jennifer explained that reaching down can raise the risk of a fall. Staff often help residents dress, so a well-considered aid could support a resident through one part of a routine while also making assistance more comfortable for everyone involved. That possibility is a design opportunity, not a substitute for hands-on care when someone needs it.",
          "Jennifer also pointed to buttons and other tasks affected by arthritis or reduced hand mobility. The button hooks we shared at the visit fit this practical need: they provide a larger handle to guide a button through a buttonhole. They do not solve every dressing challenge, but they can offer another way to approach a specific step."
        ],
        quotes: [{ text: "Whenever the residents are reaching down, they’re more at risk for fall.", attribution: "Jennifer Macrae, on dressing and mobility" }],
        audio: { src: "/assets/masonic-fall-risk.m4a", label: "Jennifer on reaching and fall risk", description: "A short excerpt from our Masonic Homes interview." },
      },
      {
        heading: "Designing for the person and the setting",
        paragraphs: [
          "The conversation also turned to memory care. Jennifer said a larger fidget object with repetitive movement could be useful, while cautioning against designs with small parts that might pose a choking hazard. The size, strength, and construction of an aid matter just as much as what it is meant to do.",
          "Her point is a useful reminder for anyone making or choosing an assistive aid: context matters. A design intended for independent living may not be suitable in memory care. Materials, pieces that could detach, how the object is handled, and how staff supervise its use all need to be considered with the specific person and environment in mind.",
          "Our team had discussed fidget objects and repetitive movement before this visit. Jennifer’s perspective helped sharpen the question: how can a tactile activity be engaging without being too small or complicated? This kind of feedback can help us improve a sketch before it becomes a printed object."
        ],
        audio: { src: "/assets/masonic-memory-care.m4a", label: "Jennifer on memory-care safety", description: "A short excerpt about the size and design of tactile aids." },
      },
      {
        heading: "What we shared—and what comes next",
        paragraphs: [
          "At the visit, we gave residents button hooks and book page holders. The hook can help with a button fastening; the page holder can keep pages spread open for reading. Residents loved trying the aids, and seeing their response made the visit especially meaningful for our team.",
          "The sock and shoe tools Jennifer described were ideas for future exploration—we did not bring those devices to this visit. She welcomed us to follow up with questions and ideas. We would love to return, share prototypes, and hear whether they address the needs residents and staff actually identify.",
          "Aids can make small parts of a day easier: getting dressed, holding a book open, or joining an activity. Those moments connect to comfort, choice, and dignity. But a useful aid is not defined by its printer file; it is defined by whether it fits a person’s real routine. Listening to older adults, families, and care teams is how we learn the difference."
        ],
        quotes: [{ text: "I saw a lot of people take those items.", attribution: "Jennifer Macrae, after seeing residents choose the aids" }],
        audio: { src: "/assets/masonic-buttons.m4a", label: "Jennifer on button hooks", description: "A short excerpt about the aids residents chose." },
      },
    ]}
  />;
}
