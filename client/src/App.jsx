import "./App.css";
import { useState, useEffect } from "react";
const te = require("tradingeconomics");
te.login("740f7b774a0a4dd:tgsklshwtjbfx2d");

export default function App() {
  const [helloString, setHelloString] = useState("hello");

  return (
    <>
      <p>{helloString}</p>
    </>
  );
}
