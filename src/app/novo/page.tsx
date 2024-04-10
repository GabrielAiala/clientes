'use client'

import { ChangeEvent, useState } from "react";
import { createData } from "../api/metodos";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    pedido: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, field: string) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('aee');
    console.log(formData)
    createData('api/clientes', formData)
      .then(() => {
        router.push('/');
      })
      .catch((error) => console.log('erro',error));
  }
  


  return (
    <main>
      <div className="container mt-5">
        <h1>Novo Cliente</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input type="text" className="form-control" value={formData.nome} onChange={(e) => handleChange(e, "nome")}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Telefone</label>
            <input type="tel" className="form-control" value={formData.telefone} onChange={(e) => handleChange(e, "telefone")}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Pedido</label>
            <textarea className="form-control" value={formData.pedido} onChange={(e) => handleChange(e, "pedido")}></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>

    </main>
  );
}
