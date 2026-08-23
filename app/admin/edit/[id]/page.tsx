import React from "react";
import { DEMO_SISTERS } from "@/lib/defaultData";
import { EditClient } from "./EditClient";

export function generateStaticParams() {
  return [
    ...DEMO_SISTERS.map((s) => ({ id: s.id })),
    { id: "sister-surprise" },
  ];
}

export default function EditSisterPage({ params }: { params: { id: string } }) {
  const id = params?.id || "";
  return <EditClient id={id} />;
}
