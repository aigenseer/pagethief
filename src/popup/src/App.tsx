import React        from 'react';
import logo         from './logo.svg';
//import BrowserUtils from "../../lib/utils/BrowserUtils";
import './App.css';

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
      console.log(blob);
      
    }
    
    // if(backgroundWindow != null){
    //   let zipBlob = backgroundWindow.pageTief.zipBlob;
    //   console.log(zipBlob);
      
    // }
   

    /**
     * 
     * 
     * if (data !== null && navigator.msSaveBlob)
        return navigator.msSaveBlob(new Blob([data], { type: type }), name);
   
     */
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <img  src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <span
          onClick={() => startDownload()}
        >
          Learn React
        </span>
>
      </header>
    </div>
  );
}

export default App;
