'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react';
import { fetchData, deleteData } from './api/metodos';
import _ from 'lodash';

import io from 'socket.io-client';

let socket: any;
interface pedido {
  id: number;
  nome: string;
  telefone: number;
  pedido: string;
}


export default function Home() {
  const [pedidos, setPedidos] = useState<pedido[]>([]);
  const [selectedClient, setSelectedClient] = useState<pedido | null>(null);
  const [isModelOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    socketInitializer();

    // fetchData('api/clientes')
    //   .then((response) => setClientes(response))
    //   .catch((err) => console.log(err));
  }, []);

  const handleOpenModal = (pedido: pedido) => {
    setSelectedClient(pedido);
    setIsModalOpen(true)
    console.log(isModelOpen, selectedClient)
  }

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedClient(null);

  };

  const socketInitializer = async () => {
    socket = io('http://localhost:4000');

    socket.on('connect', () => {
      console.log('Conectado ao Socket.IO');
    });

    socket.on('pedidoAtualizado', (data) => {
      setPedidos((prevPedidos) => {
        const index = prevPedidos.findIndex(p => p.id === data.id);
        if (index !== -1) {
          const newPedidos = [...prevPedidos];
          newPedidos[index] = data;
          return newPedidos;
        }
        return [...prevPedidos, data];
      });
    });

    const response = await fetch('http://localhost:4000/pedidos');
    const data = await response.json();
    setPedidos(data);
  };

  const handleMarcarPronto = (id: number, status: string) => {
    socket.emit('atualizarPedido', { id, status });
};

  const handleDelete = () => {
    // if (selectedClient?.id) {
    //   deleteData(`api/clientes/${selectedClient.id}`);
    //   let newClients = _.cloneDeep(clientes);
    //   _.remove(newClients, (cliente) => cliente.id === selectedClient.id);
    //   setClientes(newClients);
    //   handleClose();
    // }
  }

  return (
    <main>

      <div className="py-5 container">
        <div className="row justify-content-between">
          <div className="col">
            Pedidos
          </div>
          <div className="col ">
            <Link href="/novo" className="btn btn-primary">Novo pedido</Link>
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
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.nome}</td>
                <td>{pedido.telefone}</td>
                <td>{pedido.pedido}</td>
                <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                  {pedido.status !== "Pronto" && (
                    <button onClick={() => handleMarcarPronto(pedido.id, 'Pronto')} className="btn btn-success btn-sm">Pronto</button>
                  )}
                  <button onClick={() => handleOpenModal(pedido)} className="btn btn-danger btn-sm">Deletar</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>

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
