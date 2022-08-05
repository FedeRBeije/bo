import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UploadFile from "./UploadFile"
const instance = axios.create({
  baseURL: "http://localhost:8080/mgmt/",
  headers: {

    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGVzIjpbIlVTRVIiLCJBRE1JTiIsIkhSIiwiQ09NTUVSQ0lBTCJdLCJpYXQiOjE2NTk3MDk4MDQsImV4cCI6MTY1OTcxMzQwNH0.XotrfB6CUPywfI79iDj0Yq0BtykZ4p9YBnVHMfvkJmo", //devi mettere il token dopo il bearer
  },
});


function App() {
  const [data, setData] = useState();
  useEffect(() => {
    
  }, [data])
  
  return (
    <form encType='multipart/form-data' onSubmit={async (e) => {
      e.preventDefault()
      let formData = new FormData();
      formData.append("file", data)
      
      console.log(formData.get("file"))
      await instance.post("/admin/material", formData,
        {
          // params:{
          //  formData
          // },
          headers: {
            'Content-type': 'multipart/form-data'
          },
        })
    }}
      className="App">

      <UploadFile
        style={{ marginTop: "3rem", marginBottom: "3rem" }}
        value={data}
        onChange={e => {
          console.log(e.content);
          setData(e.content)
        }}
      />

      <input type="file" onChange={e => {
        setData(e.target.files[0])
      }} />

      <input type="submit" />
    </form>
  );
}

export default App;