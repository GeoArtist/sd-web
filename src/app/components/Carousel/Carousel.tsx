'use client'
import Image from 'next/image';
import { carouselImgs } from "@/constants/carouselImgs";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import styles from "./Carousel.module.scss";

export function Carousel() {
  const ANIMATION_TIME = 7000;
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, ANIMATION_TIME);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <>
      <div className={styles.carousel}>
        <div ref={sliderRef} className="keen-slider">
          {carouselImgs.map((img, index) => {
            return (
              <div key={index} className="keen-slider__slide">
                <Image src={img.url} alt={img.alt} priority={img.priority} />
              </div>
            );
          })}
        </div>

        <div className={styles.slogan}>
          <div className={styles.slogan__blur}>
            <h1>SOFT-DATA</h1>
            <h2>więcej niż dane</h2>
          </div>
        </div>
      </div>
    </>
  );
}

