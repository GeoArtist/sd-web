"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Variants } from "framer-motion";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  variantType?: "fromRight" | "fromTop";
};

const sectionVariants: Record<string, Variants> = {
  fromRight: {
    hidden: { opacity: 0, x: 100 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
  fromTop: {
    hidden: { opacity: 0, y: -25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
};

export default function AnimatedSection({
  children,
  className,
  variantType = "fromTop", // domyślnie slide z góry
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      variants={sectionVariants[variantType]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
