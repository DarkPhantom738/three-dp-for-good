import type { Metadata } from "next";
import { MissionArticle } from "../mission-article";

export const metadata: Metadata = {
  title: "Our BACH Mobile Clinic Giveaway | 3DP for Good",
  description: "How the 3DP for Good team shared 3D-printed aids with older adults visiting a Bay Area Community Health mobile clinic.",
};

export default function BachMobileClinicArticle() {
  return <MissionArticle
    organization="Bay Area Community Health"
    title="Giving away aids at BACH’s mobile clinic"
    date="Community giveaway"
    byline="BACH mobile clinic"
    introduction="We brought a box of 3D-printed parts to a Bay Area Community Health mobile clinic and gave them away to seniors who came for care."
    photos={[
      { src: "/assets/bach-mobile-clinic-01.jpg", alt: "Two 3DP for Good volunteers hold a box of printed aids in front of the back of a Bay Area Community Health mobile clinic truck.", caption: "Our team brought printed parts to BACH’s mobile clinic." },
      { src: "/assets/bach-mobile-clinic-02.jpg", alt: "Two 3DP for Good volunteers stand beside the Bay Area Community Health mobile clinic truck.", caption: "Outside the clinic, where older adults were arriving for care." },
    ]}
    sections={[
      {
        heading: "Outside the clinic",
        paragraphs: [
          "Our team stood outside the BACH truck with the parts we had printed. As older adults arrived for clinical help, we offered them the aids to take home for free.",
          "Thank you to everyone who stopped by and to Bay Area Community Health for having us.",
        ],
      },
    ]}
  />;
}
