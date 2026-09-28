"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/Button";

export default function BlogBackButton() {
  const router = useRouter();

  const handleBackClick = () => {
    // Use document.referrer to check if user has a previous page
    if (document.referrer) {
      router.back();
    } else {
      router.push("/blog"); // default fallback
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button onClick={handleBackClick} type="button">
      Powrót
    </Button>
  );
}
