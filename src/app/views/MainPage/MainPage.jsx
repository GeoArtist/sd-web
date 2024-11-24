'use client'
import styles from './MainPage.module.scss';
import Image from 'next/image';
import { carouselImgs } from '@/constants/carouselImgs';

import { useState, useEffect } from 'react';

export function MainPage() {
    const [imageIndex, setImageIndex] = useState(0);
    const sliderTime = 10000

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
    });

    const img = carouselImgs[imageIndex];
    
    return <>
    <div className={styles.mainPage}>
        <div className={styles.carousel}> 
            <div className={styles.carousel__container}>
             
                <Image src={img.url} alt={img.alt} key={img.alt} 
                    className={styles.carousel__img} 
                    style={{animationDuration: `${sliderTime}ms`}}/>

    
            </div>

        </div>
        
    </div>
   
    </>
}