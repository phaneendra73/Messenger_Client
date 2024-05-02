import React, { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function App() {
  const socket = io("http://localhost:9000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("Form submitted with value:", inputValue);
    socket.io("message", inputValue);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter something"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
          style={{ marginBottom: "16px" }}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}
export default App;
