import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

const instance = axios.create({
  baseURL: "https://dev-mgmt.beije.it/",
  headers: {
    Authorization: "Bearer ",
  },
});

function App() {
  const [data, setData] = useState();

  return (
    <form onSubmit={async () => await instance("/admin/material", {
      data,
      method: "post"
    })} className="App">
      <input type="file" onChange={e => {
        setData(e)
      }} />
    </form>
  );
}

export default App;
