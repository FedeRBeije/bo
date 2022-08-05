import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import UploadFile from "./UploadFile"
const instance = axios.create({
  baseURL: "http://localhost:8080/mgmt/",
  headers: {

    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGVzIjpbIlVTRVIiLCJBRE1JTiIsIkhSIiwiQ09NTUVSQ0lBTCJdLCJpYXQiOjE2NTk3MDE2MDIsImV4cCI6MTY1OTcwNTIwMn0.jVcB0lLTrsr-oQM0d_XI5graZVyQzeXuqUj5HwrHTXU", //devi mettere il token dopo il bearer
  },
});

function App() {
  const [data, setData] = useState();

  return (
    <form onSubmit={async (e) => {
      e.preventDefault()

      await instance("/admin/material", {
        data:{
          file: data,
          title: "wow",
          description: "wow2",
          type:"document",
          academy: "be"
        },
        method: "post",
        headers: {
          "content-type": "multipart/form-data"
        },
      })
    }} className="App">

      <UploadFile
        style={{ marginTop: "3rem", marginBottom: "3rem" }}
        value={data}
        onChange={e => {
          console.log(e.content);
          setData(e.content)
        }}
      />

      <input type="file" onChange={e => {
        console.log(e.target.files[0]);
        setData(e)
      }} />

      <input type="submit" />
    </form>
  );
}

export default App;