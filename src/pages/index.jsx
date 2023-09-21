import { Routes, Route } from "react-router-dom";
import Memory from "./memory";
import Start from "./start";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/game" element={<Memory />} />
    </Routes>
  );
};

export default App;
