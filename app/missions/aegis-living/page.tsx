import type { Metadata } from "next";
import { MissionPage } from "../mission-page";
export const metadata: Metadata = { title: "Our Visit to Aegis Living | 3DP for Good", description: "Our conversation with Brian Wakefield about everyday tasks and activities at Aegis Living." };
export default function Page() { return <MissionPage selected="aegis-living" />; }
