import styles from './SubPageHeader.module.scss'
import Image from 'next/image'
import logoCut from '@/public/logos/logo_cut.png'

export function SubPageHeader({title}:{title:string}) {

    return (
      <>
        <div className={styles.subpageHeader}>
          <Image
            src={logoCut}
            alt="logo-cutted-version"
            className={styles.subpageHeader__logo}
          />
          <h1>{title}</h1>
        </div>
      </>
    );
}