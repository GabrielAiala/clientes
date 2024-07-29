'use client'
import { useState, useEffect } from 'react';
import { fetchData } from '../api/metodos';


interface pedido {
  id: number;
  nome: string;
  telefone: string;
  pedido: string;
  isDone: boolean;
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
    const prontos = pedidos.filter(pedido => pedido.isDone);
    const emPreparo = pedidos.filter(pedido => !pedido.isDone);

    setPronto(prontos);
    setPreparo(emPreparo);
  }, [pedidos])


  return (
    <div className="container">

      <div className="row">
        <div className="col my-5">

          <div className="row justify-content-center">
            <div style={{ maxWidth: "48px" }}>
              <img src="/logo.jpeg" alt="Logo" className="rounded-circle" width={48} />
            </div>
          </div>
          <div className="row">
            <p className="fw-bold text-center">Estação de café</p>


            <div className="row justify-content-center">
              <div style={{ maxWidth: "48px" }}>
                <img src="/logo.jpeg" alt="Logo" className="rounded-circle" width={48} />
              </div>
            </div>

            <p className="fw-bold fs-4 ">Peça agora seu café</p>

            <div className="col">
              <div className="row">
                <div className="col">
                  <div className="row">
                    <p> 1. Escaneie o qr code</p>
                  </div>
                  <div className="row">
                    <div className="row justify-content-center">
                      <div style={{ maxWidth: "48px" }}>
                        <img src="/logo.jpeg" alt="Logo" className="rounded-circle" width={48} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="row">
                    <p> 2. Escolha sua bebida pelo WhatsApp</p>
                  </div>
                  <div className="row">
                    <div className="row justify-content-center">
                      <div style={{ maxWidth: "48px" }}>
                        <img src="/logo.jpeg" alt="Logo" className="rounded-circle" width={48} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="col py-5 mt-5">
          <p className="text-center">Acompanhe seu pedido.</p>
          <div className="row">
            <div className="col">
              <div className="row">
                <p className="text-center">Em preparo</p>
              </div>
              <div className="row row-cols-2">
                {preparo.map((pedido) => (
                  <div className="col" key={pedido.id}>
                    <p className="text-center">{pedido.telefone.substr(pedido.telefone.length - 4, 4)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ border: 'solid 1px black', height: '300px', width: '0', padding: '0' }}></div>
            <div className="col">
              <div className="row">
                <p className="text-center">Prontas!</p>
              </div>

              <div className="row row-cols-2">
                {prontos.map((pedido) => (
                  <div className="col" key={pedido.id}>
                    <p className="text-center">{pedido.telefone.substr(pedido.telefone.length - 4, 4)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;