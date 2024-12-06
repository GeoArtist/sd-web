import styles from './CertificatesImage.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import gugik from '@/public/images/certificates/GUGiK_logo.svg'
import fme from '@/public/images/certificates/fme_logo.png'
import python from '@/public/images/certificates/python_institute_logo.svg'



export default function CertificatesImage(){


    return <>
    <div className={styles.certificatesImageWrapper}>
        <Link href="https://www.safe.com/"  target="_blank" rel="noopener noreferrer">
            <Image src={gugik} alt={'gugik logo'} />
        </Link>
        <Link href="https://www.gov.pl/web/gugik"  target="_blank" rel="noopener noreferrer">
            <Image src={fme} alt={'fme logo'}/>
        </Link>
        <Link href="https://pythoninstitute.org"  target="_blank" rel="noopener noreferrer">
            <Image src={python} alt={'python institute logo'}/>
        </Link>
    </div>
    </>
}