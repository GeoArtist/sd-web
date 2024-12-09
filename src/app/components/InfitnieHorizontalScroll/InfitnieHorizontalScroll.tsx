

import styles from './InfitnieHorizontalScroll.module.scss';

import { ImgsLinks } from '@/types/imgsLinks';

import Image from 'next/image';
import Link from 'next/link';



export default function InfitnieHorizontalScroll({imgs}:{imgs:ImgsLinks[]}){ 
    const duplicatedImgs = [...imgs, ...imgs]

    return <>
        <div className={styles.scroller}>
            <ul className={styles.scroller__inner} style={{ '--_animation-duration' : `${imgs.length/0.3}s` } as React.CSSProperties}>
                {duplicatedImgs.map((obj, index) => 

                <li key={index}>
                    <Link href={obj.href || "#"} target="_blank" rel="noopener noreferrer" >
                        <Image src={obj.url} alt={obj.alt} />
                    </Link>
                </li>)}
                            
            </ul>
        </div>
        
    </>
}
