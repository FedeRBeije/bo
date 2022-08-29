import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const notify = (type, toastId, msg) => {
    let message = ""
    switch (type.toLowerCase()) {
        case "success":
            message = msg ?? "Salvato";
            break;
        case "error":
            message = `Qualcosa è andato storto: ${msg ?? "Messaggio di errore non disponibile"}`
            break;
    }
    toast[type](message, {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        toastId
    })
}

export { notify, ToastContainer }