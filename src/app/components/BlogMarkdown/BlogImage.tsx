"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// The wrapper is a span because Markdown puts images inside <p>
export default function BlogImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <motion.span
      style={{ display: "block" }}
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 1.5,
        bounce: 1,
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 900px) 100vw, 900px"
      />
    </motion.span>
  );
}
