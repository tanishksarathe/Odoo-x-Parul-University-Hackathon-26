import { useState } from "react";

import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; 
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateTrip from "./pages/CreateTrip";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Toaster/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
