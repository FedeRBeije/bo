import React from 'react'
import styles from "./styles.module.css";

export default function DuplicateButton({ action, isDetail }) {
    return (
        <>
            <button
                className={styles[isDetail ? "detail-btn" : "action-btn"]}
                onClick={action}
            >
                Duplica
            </button>
        </>
    )
}
