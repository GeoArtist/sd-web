import styles from './RegulationView.module.scss';

export default function RegulationView({md_contentHTML}:{md_contentHTML:string}) {

    return (
        <div className={styles.regulation} >
            <div dangerouslySetInnerHTML={{ __html: md_contentHTML }} />

        </div>
    )
}