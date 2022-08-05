import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

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

      <input type="file" onChange={e => {
        setData(e)
      }} />
      
      <input type="submit" />
    </form>
  );
}

export default App;
