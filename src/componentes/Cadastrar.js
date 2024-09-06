import { auth } from '../firebaseConection'; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles/Cadastrar.css';

import {
  createUserWithEmailAndPassword,
} from 'firebase/auth';

function Cadastrar () {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function novoUsuario () {
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(()=>{
      alert("Usuario cadastrado com sucesso")
      setEmail("");
      setSenha("");

      navigate('/');
    }).catch((error)=>{
      if(error.code === 'auth/weak-password'){
        alert("Senha muito fraca")
      }
      else if(error.code === 'auth/email-already-in-use'){
        alert("Email já existe!")
      }

    })
    
  }

  return(
    <div className="container">
    <div className="form-container sign-up">
    <form>
    <h2>Cadastro de Usuário</h2>
    <br/>
    <label>Email:</label>
    <input
      type="email"
      placeholder="Digite um email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <label>Senha:</label>
    <input
      type="password"
      placeholder="Digite uma senha"
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
    />

    <button onClick={novoUsuario}>Cadastrar</button>
    </form>
    </div>
    </div>

  )
}
  
export default Cadastrar;