import React        from 'react';
import logo         from './logo.svg';
//import BrowserUtils from "../../lib/utils/BrowserUtils";
import './App.css';
import { start } from 'repl';

function App() {


  function startDownload() {
    const backgroundWindow = chrome.extension.getBackgroundPage() as any;
    if(backgroundWindow != null){
      let blob = backgroundWindow["pageThief"].zipBlob;
      console.log(blob);
      
      if(blob != null){
        let a = document.createElement("a");
        document.body.appendChild(a);
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'download';
        a.click();
        window.URL.revokeObjectURL(url);
      }      
    }    
  }

  function start() {
    console.log("?");
    const backgroundWindow = chrome.extension.getBackgroundPage() as any;

    console.log(backgroundWindow);
    backgroundWindow["pageThief"]?.start();
  }

  return (
    <div className="App">
      <header className="App-header">
        
        <button onClick={() => start()} >
          <img  src={logo} className="App-logo" alt="logo" />          
        </button>

        <span onClick={() => startDownload()} > Download </span>
>
      </header>
    </div>
  );
}

export default App;
