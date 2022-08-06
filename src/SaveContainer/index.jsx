import React from 'react';
import styles from "./styles.module.css";

function SaveContainer({ isNew, onSubmit }) {

  return (
    <div className={styles["save-container"]}>

     { !isNew && <button
        name="quickSave"
        type="submit"
        className="secondary-button"
        onClick={onSubmit}>
        Salvataggio rapido
      </button>}

      <button type="submit" className="success-button"
        onClick={onSubmit}>
        {isNew ? "Salva" : "Salva modifiche"}
      </button>
    </div>
  )
}

const SaveContainerMemo = React.memo(SaveContainer);

export default SaveContainerMemo;
