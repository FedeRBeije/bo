import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import UploadFile from "./UploadFile"
const instance = axios.create({
  baseURL: "https://dev-mgmt.beije.it/",
  headers: {
    Authorization: "Bearer ", //devi mettere il token dopo il bearer
  },
});

function App() {
  const [data, setData] = useState();

  return (
    <form onSubmit={async (e) => {
      e.preventDefault()

      await instance("/admin/material", {
        data,
        method: "post"
      })
    }} className="App">

      <UploadFile
        style={{ marginTop: "3rem", marginBottom: "3rem" }}
        value={data}
        onChange={e => {
          setData(e.content)
        }}
      />

      <input type="submit" />
    </form>
  );
}

export default App;
