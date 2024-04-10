'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react';
import { fetchData, deleteData } from './api/metodos';
import _ from 'lodash';

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [isModelOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData('api/clientes')
      .then((response) => setClientes(response))
      .catch((err) => console.log(err));
  }, []);

  const handleOpenModal = (cliente) => {
    setSelectedClient(cliente);
    setIsModalOpen(true)
    console.log(isModelOpen, selectedClient)
  }

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedClient({});
    
  };

  const handleDelete = () => {
    deleteData(`api/clientes/${selectedClient.id}`);
    let newClients = _.cloneDeep(clientes);
    _.remove(newClients, (cliente) => cliente.id === selectedClient.id );
    setClientes(newClients);
    handleClose();
  }

  return (
    <main>

      <div className="py-5 container">
        <div className="row">
          <div className="col">
            Clientes
          </div>
          <div className="col">
            <div className="input-group">
              <input type="text" className="form-control" id="autoSizingInputGroup" placeholder="Username" />
              <div className="input-group-text btn btn-primary" style={{ cursor: "pointer" }}>Pesquisar</div>
            </div>
          </div>
          <div className="col">
            <Link href="/novo" className="btn btn-primary">Novo Cliente</Link>
          </div>
        </div>
      </div>

      <div className="py-3  container">

        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Telefone</th>
              <th scope="col">Pedido</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.pedido}</td>
                <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button onClick={() => handleOpenModal(cliente)} className="btn btn-danger btn-sm">Deletar</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>

      {isModelOpen && selectedClient && (
        <div className="modal" tabIndex={-1} style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button onClick={handleClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Deseja realmente deletar o {selectedClient.nome}?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>Fechar</button>
                <button className="btn btn-danger" onClick={handleDelete}>Deletar</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
