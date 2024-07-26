'use client'
import { useState, useEffect } from 'react';
import { fetchData } from '../api/metodos';


interface pedido {
  id: number;
  nome: string;
  telefone: string;
  pedido: string;
  isdone: boolean;
  show: boolean;
}

const Home = () => {
  const [pedidos, setPedidos] = useState<pedido[]>([]);
  const [prontos, setPronto] = useState<pedido[]>([]);
  const [preparo, setPreparo] = useState<pedido[]>([]);

  const fetchPedidos = async () => {
    try {
      const response = await fetchData('api/dados');
      setPedidos(response.data);
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

  useEffect(() => {
    console.log(pedidos)
    const prontos = pedidos.filter(pedido => pedido.isdone);
    const emPreparo = pedidos.filter(pedido => !pedido.isdone);

    setPronto(prontos);
    setPreparo(emPreparo);
  }, [pedidos])


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
                <p className="text-center">{pedido.telefone.substr(pedido.telefone.length-4, 4)}</p>
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
                <p className="text-center">{pedido.telefone.substr(pedido.telefone.length-4, 4)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;