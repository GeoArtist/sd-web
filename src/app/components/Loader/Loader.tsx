import styles from './Loader.module.scss';


export default function Loader() {
    return (
        <div className={styles.loader}>
            <div className={styles.orbe} style={{"--index": 0} as React.CSSProperties}></div>
            <div className={styles.orbe} style={{"--index": 1} as React.CSSProperties}></div>
            <div className={styles.orbe} style={{"--index": 2} as React.CSSProperties}></div>
            <div className={styles.orbe} style={{"--index": 3} as React.CSSProperties}></div>
            <div className={styles.orbe} style={{"--index": 4} as React.CSSProperties}></div>

        </div>
    )
}