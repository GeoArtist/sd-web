"use client";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(
  () =>
    import("@/app/components/ContactMap/ContactMap").then(
      (mod) => mod.ContactMap
    ),
  {
    ssr: false,
  }
);

export function DynamicContactMap() {
  return (
    <>
      <DynamicMap />
    </>
  );
}
