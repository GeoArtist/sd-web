"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
};

export default function MotionWrapper({
  children,
  className,
}: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
