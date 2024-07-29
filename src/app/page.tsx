'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react';
import { fetchData, hidePedido, marcarPedidoPronto } from './api/metodos';
import _ from 'lodash';

interface pedido {
  id: number;
  nome: string;
  telefone: number;
  pedido: string;
  isDone: boolean;
  show: boolean;
}

export default function Home() {
  const [pedidos, setPedidos] = useState<pedido[]>([]);

  const fetchPedidos = async () => {
    try {
      const response = await fetchData('api/clientes');
      setPedidos(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPedidos();
    const interval = setInterval(() => {
      fetchPedidos();
    }, 5000);
    
    return () => clearInterval(interval);// Intervalo de 5 segundos (5000 ms)
  }, []);

  const handleMarcarPronto = (selectedPedido: pedido) => {
    let newPedidos = _.cloneDeep(pedidos);
    newPedidos = newPedidos.map((pedido) => {
      if (pedido.id === selectedPedido.id) {
        pedido.isDone = true;
      }
      return pedido;
    });
    marcarPedidoPronto(selectedPedido)
    setPedidos(newPedidos);

  };

  const handleEsconderPedido = (selectedPedido: pedido) => {
    hidePedido(selectedPedido);
    let newPedidos = _.cloneDeep(pedidos);
    _.remove(newPedidos, (pedido) => pedido.id === selectedPedido.id);
    setPedidos(newPedidos);
  }

  return (
    <>
    <header className="p-3 bg-dark text-white">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 mb-md-0">
          <li>
            <a className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown-toggle">
              <img src="/logo.jpeg" alt="Logo" className="rounded-circle" width={32}/>
            </a>
          </li>
        </ul>

      </div>
    </div>
  </header>
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
                  {!pedido.isDone && (
                    <button onClick={() => handleMarcarPronto(pedido)} className="btn btn-success btn-sm">Pronto</button>
                  )}
                  <button onClick={() => handleEsconderPedido(pedido)} className="btn btn-danger btn-sm">Esconder</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </main>
    </>
  );
}
