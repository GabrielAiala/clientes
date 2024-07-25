'use client'
import { useState, useEffect, FormEvent } from 'react';
import io from 'socket.io-client';

let socket: any;

const Home = () => {
    const [pedido, setPedido] = useState('');
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        socketInitializer();
    }, []);

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

    const enviarPedido = (event: FormEvent) => {
        event.preventDefault();
        socket.emit('pedido', { pedido });
    };

    const atualizarPedido = (id: number, status: string) => {
        socket.emit('atualizarPedido', { id, status });
    };

    return (
        <div>
            <h1>Fazer Pedido</h1>
            <form onSubmit={enviarPedido}>
                <input 
                    type="text" 
                    value={pedido} 
                    onChange={(e) => setPedido(e.target.value)} 
                    placeholder="Digite seu pedido" 
                />
                <button type="submit">Enviar Pedido</button>
            </form>
            <h2>Lista de Pedidos</h2>
            <ul>
                {pedidos.map((pedido) => (
                    <li key={pedido.id}>
                        {pedido.pedido} - {pedido.status}
                        <button onClick={() => atualizarPedido(pedido.id, 'Pronto')}>Marcar como Pronto</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;