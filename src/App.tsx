import FormStunting from "./FormStunting";
import FormBMI from "./FormBMI";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layanan from "./Layanan";
import FormDiabetes from "./FormDiabetes";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formstunting" element={<FormStunting onFetchMessages={() => console.log("Fetch Messages!")} />} />
          <Route path="/formdiabetes" element={<FormDiabetes onFetchMessages={() => console.log("Fetch Messages!")} />} />
          <Route path="/formbmi" element={<FormBMI />} />
          <Route path="/layanan" element={<Layanan />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
