import logo from './logo.svg';
import './App.css';
import Landing from "./components/Landing";
import Upload from "./components/Upload";
import {useState} from "react";

function App() {
    const [upload, toggleUpload] = useState(false);
  return (
      <div>
        <Landing toggleShow={toggleUpload}/>
        <Upload show={upload} toggleShow={toggleUpload}/>
      </div>
  )
}

export default App;
