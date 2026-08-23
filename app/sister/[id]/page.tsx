import React from "react";
import { DEMO_SISTERS } from "@/lib/defaultData";
import { SisterClient } from "./SisterClient";

export function generateStaticParams() {
  return [
    ...DEMO_SISTERS.map((s) => ({ id: s.id })),
    { id: "sister-surprise" },
  ];
}

export default function SisterPage({ params }: { params: { id: string } }) {
  const id = params?.id || "";
  return <SisterClient id={id} />;
}
