import React from "react";
import Button from "./Button";
import { FaBeer } from "react-icons/fa"; // example icon from react-icons

const App = () => (
  <Button
    label="Click Me"
    icon={<FaBeer />}
    onClick={() => alert("Button clicked!")}
  />
);

export default App;
