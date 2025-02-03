import { Metadata } from "next/types";
import styles from "./page.module.scss";
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
