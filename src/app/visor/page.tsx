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
            <div style={{ maxWidth: "150px" }}>
              <img src="/logo.jpeg" alt="Logo" className="rounded-circle" width={150} />
            </div>
          </div>
          <div className="row">
            <h1 className="fw-bold text-center">Estação de café</h1>


            <div className="row justify-content-center">
              <div style={{ maxWidth: "192px" }}>
                <img src="/getCoffee.jpeg" alt="Logo" className="rounded-circle" width={192} />
              </div>
            </div>

            <p className="fw-bold fs-4 text-center">Peça agora seu café</p>

            <div className="col">
              <div className="row">
                <div className="col">
                  <div className="row">
                    <p className="fs-5"> 1. Escaneie o qr code</p>
                  </div>
                  <div className="row">
                    <div className="row justify-content-center">
                      <div style={{ maxWidth: "192px" }}>
                        <img src="/qrcode.jpeg" alt="Logo" width={192} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="row">
                    <p className="fs-5"> 2. Escolha sua bebida pelo WhatsApp</p>
                  </div>
                  <div className="row">
                    <div className="row justify-content-center">
                      <div style={{ maxWidth: "150px" }}>
                        <img src="/whats.jpg" alt="Logo"  width={150} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="col py-5 mt-5">
          <h3 className="text-center">Acompanhe seu pedido.</h3>
          <div className="row">
            <div className="col">
              <div className="row">
                <p className="text-center fs-5">Em preparo</p>
              </div>
              <div className="row row-cols-2">
                {preparo.map((pedido) => (
                  <div className="col" key={pedido.id}>
                    <p className="text-center fs-5">{pedido.id}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ border: 'solid 1px black', height: '600px', width: '0', padding: '0' }}></div>
            <div className="col">
              <div className="row">
                <p className="text-center fs-5">Prontas!</p>
              </div>

              <div className="row row-cols-2">
                {prontos.map((pedido) => (
                  <div className="col" key={pedido.id}>
                    <p className="text-center fs-5">{pedido.id}</p>
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