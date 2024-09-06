import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './componentes/Login';
import Home from './componentes/Home';
import Cadastrar from './componentes/Cadastrar';

function RoutesApp(){
  return(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />}/>
    <Route path="/showTarefas" element={<Home />}/>
    <Route path="/Cadastrar" element={<Cadastrar />}/>

    </Routes>
  
  
  </BrowserRouter>
  )
}

export default RoutesApp;