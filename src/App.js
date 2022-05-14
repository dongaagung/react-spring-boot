import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployee from "./components/AddEmployee";
import EmployeesList from "./components/EmployeesList";
import Navigation from "./components/Navigation";
import NotFound from "./components/NotFound";

function App(){

  return(
    <BrowserRouter>
      <div>
        <Navigation/>
        <Routes>
          <Route exact path="/" element={<EmployeesList/>} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/add" element={<AddEmployee/>} />
          <Route path="/employees/edit/:id" element={<AddEmployee/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;