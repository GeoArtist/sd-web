import { ImgsLinks } from '@/types/imgsLinks';
import Image from 'next/image';
import Link from 'next/link';

import styles from './InfitnieHorizontalScroll.module.scss';



export default function InfitnieHorizontalScroll({imgs}:{imgs:ImgsLinks[]}){ 
    const animationSpeedFactor = 0.4
    const duplicatedImgs = [...imgs, ...imgs]

    return (
      <>
        <div className={styles.scroller}>
          <ul
            className={styles.scroller__wrapper}
            style={
              {
                "--_animation-duration": `${
                  imgs.length / animationSpeedFactor
                }s`,
              } as React.CSSProperties
            }
          >
            {duplicatedImgs.map((obj, index) => (
              <li key={index}>
                <Link
                  href={obj.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={obj.url} alt={obj.alt} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
}
