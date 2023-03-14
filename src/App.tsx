import { useState, useEffect } from "react";
//import "./App.css";
import { Flipside, Query } from "@flipsidecrypto/sdk";
import ToggleButton from "./components/ToggleButton";
import View from "./components/View";
import WalletInput from "./components/WalletInput";

function App() {
  return (
    <div className="h-screen bg-slate-800">
      <WalletInput></WalletInput>
    </div>
  );
}

export default App;
