import { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConection';
import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import './styles/Home.css'


function Home() {
  const [titulo, setTitulo] = useState(''); // Título da tarefa para adicionar/editar
  const [idTarefa, setIdTarefa] = useState('');
  const [usuario, setUsuario] = useState(false);
  const [detalhesUsuario, setDetalhesUsuario] = useState({});
  const [tarefas, setTarefas] = useState([]); // Lista de tarefas

  useEffect(() => {
    async function carregarPost() {
      const dados = onSnapshot(collection(db, "tarefa"), (Snapshot) => {
        let listatarefa = [];
        Snapshot.forEach((doc) => {
          listatarefa.push({
            id: doc.id,
            titulo: doc.data().titulo // Corrigir de "tarefa" para "titulo"
          });
        });
        setTarefas(listatarefa);
      });
    }
    carregarPost();
  }, []);

  async function fazerLogout() {
    await signOut(auth);
    setUsuario(false);
    setDetalhesUsuario({});
  }

  // C - Create
  async function adicionarTarefa() {
    if (titulo === '') {
      alert("Preencha o título da tarefa.");
      return;
    }

    await addDoc(collection(db, "tarefa"), {
      titulo: titulo
    }).then(() => {
      alert("Cadastro realizado com sucesso!");
      setTitulo(''); // Limpa o campo de título após o cadastro
    }).catch((error) => {
      console.log(error);
    });
  }

  // R - Read
  async function buscarTarefas() {
    const config = collection(db, "tarefa");
    await getDocs(config).then((Snapshot) => {
      let lista = [];

      Snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
        });
      });

      setTarefas(lista);
    }).catch((error) => {
      console.log(error);
    });
  }

  // U - Update
  async function editarTarefa() {
    const postEditado = doc(db, "tarefa", idTarefa);

    await updateDoc(postEditado, {
      titulo: titulo
    }).then(() => {
      alert("Tarefa editada com sucesso!");
      setIdTarefa('');
      setTitulo(''); // Limpa o campo de título após a edição
    }).catch((error) => {
      console.log(error);
    });
  }

  // D - Delete
  async function excluirTarefa(id) {
    try {
      const postDeletado = doc(db, "tarefa", id);
      await deleteDoc(postDeletado);
      alert("Tarefa deletada com sucesso");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">

      <div>
      {usuario && (
        <div>
          <strong>Seja Bem-vindo (a)</strong>
          <br />
          <span>ID: {detalhesUsuario.uid}</span>
          <br />
          <span>Email: {detalhesUsuario.email}</span>
          <br />
          <button onClick={fazerLogout}>Sair</button>
        </div>
      )}


      <h2>Tarefas</h2>
      <br/>
      <form>
      <label>ID da Tarefa</label>
      <input
        placeholder="ID da tarefa"
        value={idTarefa}
        onChange={(e) => setIdTarefa(e.target.value)}
      />

      <label>Tarefa:</label>
      <textarea
        type="text"
        placeholder="Título"
        value={titulo} 
        onChange={(e) => setTitulo(e.target.value)}
      />
      </form>
      <button className="i" onClick={adicionarTarefa}>Inserir</button>
      <button onClick={editarTarefa}>Editar</button>


      <div className='tarefas'>
      <ul>
        {tarefas.map((value) => (
          <li key={value.id}>
            <strong>ID: {value.id}</strong>
            <br/>
            <br/>
            <span style={{ fontSize: '18px' }}><strong>Tarefa:</strong>{value.titulo}</span>
            <br />
            <button onClick={() => excluirTarefa(value.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      </div>

        </div>
      </div>

  );
}

export default Home;