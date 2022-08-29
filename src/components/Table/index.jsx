import DuplicateButton from "../DuplicateButton";
import styles from "./styles.module.css";

const Table = ({ headers, records, onAction, actionLabel, formatDimension, duplicateButton, duplicateAction, isMaterial, noEdit }) => {
  return (
    <div className={styles["container"]}>
      <div
        style={{
          gridTemplateColumns: `repeat(${headers.length}, ${formatDimension}px) ${actionLabel ? "120px" : ""
            } ${duplicateButton ? "120px" : ""}`,
        }}
        className={styles["headers"]}
      >
        {headers.map((h, index) => (
          <p key={`${h}${index}`}>{h}</p>
        ))}
        {actionLabel ? <p></p> : ""}
        {duplicateButton ? <p></p> : ""}
      </div>
      <div className={styles["row-container"]}>
        {records.map((r, index) => (
          <div
            key={`${JSON.stringify(r)}${index}`}
            style={{
              gridTemplateColumns: `repeat(${headers.length}, ${formatDimension}px) ${actionLabel ? "120px" : ""
                } ${duplicateButton ? "120px" : ""}`,
            }}
            className={styles["row"]}
          >
            {Object.entries(r).map(([k, v], index) => (
              <div key={`${k}${index}`} className={styles["row-size"]}>
                {k !== "typeFile" &&
                  <p>
                    {typeof v === "boolean" ? (
                      v ? (
                        <span>&#x2713;</span>
                      ) : (
                        <span>&times;</span>
                      )
                    ) : (
                      v
                    )}
                  </p>
                }
              </div>
            ))}
            {
              !noEdit &&
              <button
                className={styles[r.hasOwnProperty("typeFile") && r.typeFile !== null ? "link-btn" : "action-btn"]}
                onClick={() => onAction(r)}
              >
                {isMaterial && r.typeFile !== null ?
                  "Link" : actionLabel}
              </button>
            }
            {duplicateButton &&
              <DuplicateButton
                isDetail={false}
                action={() => duplicateAction(r.id)} />
            }
          </div>
        ))}
      </div>
    </div >
  );
};

export default Table;