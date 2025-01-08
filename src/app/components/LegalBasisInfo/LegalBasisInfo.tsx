import Link from "next/link";
import {legalBasisLinks} from "@/constants/legalBasisLinks";

import styles from './LegalBasisInfo.module.scss';


export default function LegalBasisInfo({legalBasis}:{legalBasis: string[]}) {
    return (
      <>
        <div className={styles.legalBasis}>
          <h3 className={styles.legalBasis__name}>Podstawa prawna:</h3>
          <ul>
            {legalBasis.map((basis, index) => (
              <li key={index}>
                {
                  <Link
                    href={
                      legalBasisLinks.filter(
                        (legalBasis) => legalBasis.name == basis
                      )[0].link
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {basis}
                  </Link>
                }
              </li>
            ))}
          </ul>
        </div>
      </>
    );
}