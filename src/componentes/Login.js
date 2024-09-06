import { auth } from '../firebaseConection'; 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';


function Login () {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(false);
  const [detalhesUsuario, setDetalhesUsuario] = useState({});

  useEffect(()=>{
    async function verificarLogin() {
      
      onAuthStateChanged(auth, (user) =>{
        if(user){
          //tem usuario logado
          setUsuario(true);
          setDetalhesUsuario({
            uid: user.uid,
            email: user.email
          })}
          else {
            //nao possui usuario login
            setUsuario(false);
            setDetalhesUsuario({});
          }
      
      })
      
    }
    verificarLogin();
  },[])
   
  

  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value)=>{
      alert("Usuário logada com sucesso")
      setUsuario(true);
      setDetalhesUsuario({
        uid:value.user.uid,
        email: value.user.email,
      })
      setEmail("");
      setEmail("");

      navigate('/showTarefas');
    })
    .catch(()=>{
      alert("Erro ao fazer login!")
    })
  }


  return(
    <div>
      <div className="container">
      <div className="form-container sign-up">
    <h2>Usuários</h2>
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
    <button onClick={logarUsuario}>Login</button>
    <button><Link to="/cadastrar">Cadastrar</Link></button>
    </div>
    </div>
  </div>

  )
}

export default Login;