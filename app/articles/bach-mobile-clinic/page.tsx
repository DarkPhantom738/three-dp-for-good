import type { Metadata } from "next";
import { MissionArticle } from "../mission-article";

export const metadata: Metadata = {
  title: "Sharing Aids at BACH’s Mobile Clinic | 3DP for Good",
  description: "How the 3DP for Good team shared 3D-printed aids with older adults visiting a Bay Area Community Health mobile clinic.",
};

export default function BachMobileClinicArticle() {
  return <MissionArticle
    organization="Bay Area Community Health"
    title="Sharing aids at the mobile clinic"
    date="Community giveaway"
    byline="BACH mobile clinic"
    introduction="We stood outside a Bay Area Community Health mobile clinic with a box of 3D-printed parts to give away. As older adults came for clinical help, we had a chance to put practical aids directly into their hands."
    photos={[
      { src: "/assets/bach-mobile-clinic-01.jpg", alt: "Two 3DP for Good volunteers hold a box of printed aids in front of the back of a Bay Area Community Health mobile clinic truck.", caption: "Our team brought printed parts to BACH’s mobile clinic." },
      { src: "/assets/bach-mobile-clinic-02.jpg", alt: "Two 3DP for Good volunteers stand beside the Bay Area Community Health mobile clinic truck.", caption: "Outside the clinic, where older adults were arriving for care." },
    ]}
    sections={[
      {
        heading: "Meeting people where care happens",
        paragraphs: [
          "BACH’s mobile clinic brings care into the community. For this giveaway, we set up outside the truck while seniors arrived for clinical help. Being there let us share our work in the same place people were already seeking support.",
        ],
      },
      {
        heading: "Putting printed parts in people’s hands",
        paragraphs: [
          "We gave away 3D-printed parts to older adults who came by. Our goal was to make useful, physical tools available at no cost and let people see and handle them for themselves.",
          "A printed part is small, but the need it addresses can be part of an everyday routine. Sharing the parts face to face helps us keep that routine—and the person using the tool—at the center of the design.",
        ],
      },
      {
        heading: "More than a handoff",
        paragraphs: [
          "This visit was another step in getting our designs out of the workshop and into the community. We’re grateful to Bay Area Community Health for the chance to share them alongside its mobile clinic.",
        ],
      },
    ]}
  />;
}
