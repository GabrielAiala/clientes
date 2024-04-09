export default function Home() {


  return (
    <main>
      <div className="container mt-5">
        <h1>Novo Cliente</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input type="text" className="form-control" id="nome" name="nome" required />
          </div>
          <div className="mb-3">
            <label htmlFor="telefone" className="form-label">Telefone</label>
            <input type="tel" className="form-control" id="telefone" name="telefone" required />
          </div>
          <div className="mb-3">
            <label htmlFor="pedido" className="form-label">Pedido</label>
            <textarea className="form-control" id="pedido" name="pedido" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>

    </main>
  );
}
