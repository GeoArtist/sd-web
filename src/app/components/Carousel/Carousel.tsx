'use client'
import Image from 'next/image';
import { carouselImgs } from '@/constants/carouselImgs';
import { useState, useEffect } from 'react';

import styles from './Carousel.module.scss';

export function Carousel() {
    const [imageIndex, setImageIndex] = useState(0);
    const sliderTime = 7000

    function showNextImage(){
        setImageIndex(index=>{
            if (index === carouselImgs.length -1){
                return 0;
            }
            return index + 1;
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            showNextImage();
        }, sliderTime);
        return () => clearInterval(interval);
    },[]);

    const img = carouselImgs[imageIndex];
    
    return (
      <>
        <div className={styles.carousel}>
          <div className={styles.carousel__container}>
            <Image
              src={img.url}
              alt={img.alt}
              key={img.alt}
              priority={img.priority}
              className={styles.carousel__img}
              placeholder="empty"
              fill
              style={{ animationDuration: `${sliderTime + 500}ms` }}
            />
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