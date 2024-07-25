'use client'
import { useState, useEffect, FormEvent } from 'react';
import io from 'socket.io-client';

let socket: any;

interface pedido {
  id: number;
  nome: string;
  pedido: number;
  status: string;
}

const Home = () => {
  const [pedido, setPedido] = useState<pedido>();
  const [pedidos, setPedidos] = useState<pedido[]>([]);
  const [prontos, setPronto] = useState<pedido[]>([]);
  const [preparo, setPreparo] = useState<pedido[]>([]);

  useEffect(() => {
    socketInitializer();


  }, []);

  useEffect(() => {
    console.log(pedidos)
    const prontos = pedidos.filter(pedido => pedido.status === 'Pronto');
    const emPreparo = pedidos.filter(pedido => pedido.status !== 'Pronto');

    setPronto(prontos);
    setPreparo(emPreparo);
  }, [pedidos])

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

  return (
    <div className="container">
      <div className="row pt-4 align-items-center">
        <div className="col ">
          <img src="/logo.jpeg" alt="Logo" className="rounded-circle float-end" width={32} />
        </div>
        <div className="col col-auto me-auto">
          <h4 className="text-center">ESTAÇÃO DE CAFE</h4>
          <h4 className="text-center"><strong>GETBOTS</strong></h4>
        </div>
        <div className="col me-auto">
          <img src="/logo.jpeg" alt="Logo" className="rounded-circle float-start" width={32} />
        </div>
      </div>
      <div className="py-4">
        <p className="text-center" style={{ lineHeight: 0 }}>Acompanhe seu pedido ao vivo.</p>
        <p className="text-center" style={{ lineHeight: 0 }}>Visualize o final do número do seu telefone.</p>
      </div>
      <div className="row">
        <div className="col">
          <div className="row">
            <p className="text-center">Em preparo</p>
          </div>

          <div className="row row-cols-2">
            {preparo.map((pedido) => (
              <div className="col" key={pedido.id}>
                <p className="text-center">{pedido.pedido}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ border: 'solid 1px black', height: '300px', width: '0', padding: '0' }}></div>
        <div className="col">
          <div className="row">
            <p className="text-center">Pronto</p>
          </div>

          <div className="row row-cols-2">
            {prontos.map((pedido) => (
              <div className="col" key={pedido.id}>
                <p className="text-center">{pedido.pedido}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <ul>
        {preparo.map((pedido) => (
          <li key={pedido.id}>
            {pedido.pedido}
          </li>
        ))}
      </ul>
      Prontos
      <ul>
        {prontos.map((pedido) => (
          <li key={pedido.id}>
            {pedido.pedido}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Home;