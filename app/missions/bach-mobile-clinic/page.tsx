import type { Metadata } from "next";
import { MissionPage } from "../mission-page";
export const metadata: Metadata = { title: "Our BACH Mobile Clinic Giveaway | 3DP for Good", description: "Free 3D-printed aids for seniors visiting a Bay Area Community Health mobile clinic." };
export default function Page() { return <MissionPage selected="bach-mobile-clinic" />; }
