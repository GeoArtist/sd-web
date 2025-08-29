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
      staggerChildren: 0.15,
    },
  },
};

export function AnimatedUl({
  amount = 0.1,
  ...props
}: HTMLMotionProps<"ul"> & { amount?: number }) {
  return (
    <motion.ul
      variants={listVariants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount }}
      {...props}
    />
  );
}

export function AnimatedOl({
  amount = 0.15,
  ...props
}: HTMLMotionProps<"ol"> & { amount?: number }) {
  return (
    <motion.ol
      variants={listVariants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount }}
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
