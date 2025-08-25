"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { Variants } from "framer-motion";

type AnimatedLiProps = HTMLMotionProps<"li"> & {
  variantType?: keyof typeof itemVariants; // "fromRight" | "fromTop"
};

const itemVariants: Record<string, Variants> = {
  fromRight: {
    initial: { opacity: 0, x: 50 },
    whileInView: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  },
  fromTop: {
    initial: { opacity: 0, y: -50, rotateY: -90, rotateX: -45 },
    whileInView: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  },
};

const listVariants = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export function AnimatedUl(props: HTMLMotionProps<"ul">) {
  return (
    <motion.ul
      variants={listVariants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount: 0.75 }}
      {...props}
    />
  );
}

export function AnimatedOl(props: HTMLMotionProps<"ol">) {
  return (
    <motion.ol
      variants={listVariants}
      initial="initial"
      whileInView="whileInView"
      {...props}
    />
  );
}

export function AnimatedLi({
  variantType = "fromRight",
  ...props
}: AnimatedLiProps) {
  return (
    <motion.li
      variants={itemVariants[variantType]}
      transition={{ duration: 0.4 }}
      {...props}
    />
  );
}
