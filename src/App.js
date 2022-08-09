import React, { useEffect, useId, useState } from 'react'
// components

import CardContainerMemo from './CardContainer';
import Select from "./Select";
import SaveContainerMemo from './SaveContainer';
import Input from './Input';
import UploadFile from './UploadFile';
import axios from 'axios';

const instance = axios.create({
  baseURL: "https://dev-mgmt.beije.it/",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGVzIjpbIlVTRVIiLCJBRE1JTiIsIkhSIiwiQ09NTUVSQ0lBTCJdLCJpYXQiOjE2NjAwMzc1MjAsImV4cCI6MTY2MDA0MTEyMH0.UWoJs34imz_z0l7cyptpoNWNi9_RBZN3tSlm4Bs0Ny4",
  },
});

const initState = {
  description: "",
  academy: "FE",
  title: "",
  type: "document",
  file: "",
  link: "",
  fileName: "",
}
let saved;
let id = 0;

async function uploadDoc(resource, docObj, method) {
  return await instance(resource, {
    data: docObj,
    method,
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
    .then((response) => response.data)
    .catch((error) => error);
}

async function link(resource, obj, method) {
  return await instance(resource, {
    data: obj,
    method
  })
}

async function download(resource, obj, method) {
  return await instance(resource, {
    data: obj,
    method
  })
}

const App = ({ isNew }) => {

  const [state, setState] = useState(initState);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [goBack, setGoBack] = useState(false);

  const toastId = useId();

  useEffect(() => {
   (async()=>{
   })()


  }, [])

  const handleSubmitDoc = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    console.log(state.file)
    formData.append("file", state.file);

    saved = true;

    if (state.link) link(`/admin/material_link/${id = 0}`,{ ...state, file: null, fileName: null }, "post");

    else {
      const res = await uploadDoc("/admin/material", formData, "post");
      console.log(res);
      link(`/admin/material_link/${res.id}`,{ ...state, link: null, fileName: null }, "post");
    }

  }

  const handleSetAcademy = (e) => {
    setState({ ...state, academy: e })
  }

  return (


   <>
     <form>
    
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
     </form>
    
   </>
  )
}

export default App;