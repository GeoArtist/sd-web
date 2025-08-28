"use client";
import { motion } from "framer-motion";
import { ReactNode, isValidElement, Children, Fragment } from "react";
import { Variants } from "framer-motion";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  variantType?: keyof typeof sectionVariants;
  animateOnlyFirst?: boolean;
};

const childVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const sectionVariants: Record<string, Variants> = {
  fromRight: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  },
  fromTop: {
    hidden: { opacity: 0, y: -50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        ease: "easeInOut",
      },
    },
  },
  clipCircle: {
    hidden: {
      clipPath: "circle(0% at 100% 0%)",
    },
    show: {
      clipPath: "circle(150% at 100% 0%)",
      transition: {
        duration: 1,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  },
};

export default function AnimatedSection({
  children,
  className,
  variantType = "fromTop",
  animateOnlyFirst = false,
}: AnimatedSectionProps) {
  const amount = variantType === "clipCircle" ? 0 : 0.15;

  const childrenArray = Children.toArray(children);

  return (
    <motion.div
      className={className}
      variants={sectionVariants[variantType]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      style={{ overflow: "hidden" }}
    >
      {childrenArray.map((child, index) => {
        if (!isValidElement(child)) return null;

        if (animateOnlyFirst) {
          if (index === 0) {
            return (
              <motion.div key={index} variants={childVariant}>
                {child}
              </motion.div>
            );
          } else {
            return <Fragment key={index}>{child}</Fragment>;
          }
        }

        return (
          <motion.div key={index} variants={childVariant}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}