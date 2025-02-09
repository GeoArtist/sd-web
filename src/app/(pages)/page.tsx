import { Metadata } from "next/types";
import { MainView } from "@/views/MainView/MainView";

export const metadata: Metadata = {
  verification: {
    google: "aaaa",
  },
};

export default function Home() {
  return (
    <>
      <MainView></MainView>
    </>
  );
}
