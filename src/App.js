import React, { useId, useState } from 'react'
// import { useNavigate } from 'react-router';
// components
import CardContainerMemo from './components/CardContainer';
import Select from "./components/Select";
import SaveContainerMemo from './components/SaveContainer';
import Input from './components/Input';
import UploadFile from './components/UploadFile';
import Loader from './components/Loader';
import DetailsHeader from './components/DetailsHeader';
import FieldsetBeije from './components/FieldsetBeije';
// utils & api
import { uploadLink, uploadDoc } from "./config/axios.config"
// import { navigateWithNotify } from '../../utils/utils';
// import { notify, ToastContainer } from '../../utils/toast';

const initState = {
    description: "",
    academy: "FE",
    title: "",
    type: "document",
    file: "",
    link: "",
    fileName: "",
}

const App = ({ isNew }) => {

    const [state, setState] = useState(initState);
    const [load, setLoad] = useState(false);

    const toastId = useId();
    // const navigate = useNavigate();

    const handleSubmitDoc = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("file", state.file);

        setLoad(true);

        try {
            if (state.link) {
                await uploadLink(`/admin/material_link/${0}`, { ...state, file: null, fileName: null }, "post");
                // navigateWithNotify(navigate, "/teaching-materials");
            }

            else {
                const res = await uploadDoc("/admin/material", formData, "post");
                uploadLink(`/admin/material_link/${res.id}`, { ...state, link: null, fileName: null }, "post");
            }

        } catch (error) {
            // notify("error", toastId, error?.message);

        } finally {
            setLoad(false);
        }
    }

    const handleSetAcademy = (e) => {
        setState({ ...state, academy: e })
    }

    const handleBack = () => {
        // navigate(-1)
    }

    return (
        <>
            {
            load ? <Loader isImage={true} />
                :
                <>
                    <DetailsHeader handleBack={handleBack} isNew={isNew} title="Material" onSubmit={handleSubmitDoc} />
                    <form>

                    <FieldsetBeije>
                            <CardContainerMemo head="Documento">
                        
                                <Select
                                    style={{ maxWidth: "50%", marginTop: "2rem" }}
                                    value={state.academy}
                                    label="Academy"
                                    options={[
                                        { value: "FE", label: "Front-end" },
                                        { value: "BE", label: "Back-end" },
                                    ]}
                                    onChange={handleSetAcademy}
                                />
                        
                                <Input
                                    style={{ width: "50%", marginTop: "3rem" }}
                                    placeholder="Titolo"
                                    name="title"
                                    value={state.title}
                                    onChange={(e) => {
                                        setState((p) => ({ ...p, title: e.target.value }));
                                    }}
                                />
                        
                                <Input
                                    disabled={state.file ? true : false}
                                    style={{ width: "50%", marginTop: "3rem" }}
                                    placeholder="Link alla risorsa"
                                    name="name"
                                    value={state.link}
                                    onChange={(e) => {
                                        setState((p) => ({ ...p, link: e.target.value }));
                                    }}
                                />
                        
                                <UploadFile
                                    disabled={state.link ? true : false}
                                    style={{ marginTop: "3rem", marginBottom: "3rem" }}
                                    value={state.file}
                                    onChange={e => {
                                        setState({ ...state, file: e.content, fileName: e.fileName })
                                    }}
                                />
                        
                                <p>{state.fileName}</p>
                            </CardContainerMemo>
                        
                            <CardContainerMemo
                                head="Descrizione"
                                style={{ minHeight: "30rem" }}
                            >
                                <textarea
                                    style={{ width: "50%", height: "30rem", marginTop: "2rem" }}
                                    placeholder="Descrizione"
                                    name="title"
                                    value={state.description}
                                    onChange={(e) => {
                                        setState((p) => ({ ...p, description: e.target.value }));
                                    }}
                                />
                            </CardContainerMemo>
                        
                            <SaveContainerMemo isNew={isNew} onSubmit={handleSubmitDoc} />
                    </FieldsetBeije>
                    </form>
                    {/* <ToastContainer /> */}
                </>
            }
        </>
    )
}

export default App;