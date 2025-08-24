"use client";

import { motion } from "framer-motion";
import type { Components } from "react-markdown";

const MotionImage = motion.img;

// Wrapper for a single image
function AnimatedImage({
  className,
  ...props
}: any & { className?: string }) {
  return (
    <MotionImage
      {...props}
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 1.5,
        bounce: 1
      }}
      viewport={{ once: true, amount: 0.2 }}
      className={`${className ?? ""}`}
    />
  );
}

// Function to create markdown components
export function createMarkdownComponents(customImgClass = "blogPost__img"): Components {
  return {
    img: ({ node, className, ...props }) => (
      <AnimatedImage
        {...props}
        className={`${customImgClass} ${className ?? ""}`}
      />
    ),

  };
}
