import { useEffect, useId, useState } from "react";

// style
import styles from "./styles.module.css";

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      resolve({ content: e.target.result });
    });
    reader.addEventListener("error", (e) => {
      reject({ error: e.target.result });
    });
    reader.readAsDataURL(file);
  });
}

const UploadFile = ({ value, onChange, isBlogMassive, noEdit, style, ...props }) => {
  const id = useId();

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (isBlogMassive) {
      (async () => {
        const { content, error } = await readFile(value);
        if (!error) {
          onChange(content);
        }
      })()
    }
  }, [])
  return (

    <div className={styles["actions-container"]} style={{ ...style }}>
      <input
        {...props}
        className="hidden"
        id={id}
        type="file"
        onChange={async (e) => {
          // if (e.target.files[0].size > 499999) return

          const { content, error } = await readFile(e.target.files[0]);

          if (!error) {
            onChange({content: e.target.files[0], fileName: e.target.files[0].name});
          } else {
            onChange("");
          }

          e.target.value = "";
        }}
      />
      {/* {!noEdit && <label className={styles["upload-btn"]} htmlFor={id}>
        <span>{value ? "Modifica" : "Carica documento"}</span>
      </label>} */}

      {value && (
        <button
          className={styles["delete-btn"]}
          onClick={(e) => {
            e.preventDefault();

            onChange("", true);
            setFileName("");
          }}
        >
          Elimina
        </button>
      )}
      {fileName && <p>{fileName}</p>}

    </div>
  );
};

export default UploadFile;