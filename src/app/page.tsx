import  Link  from 'next/link'

export default function Home() {
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
            <tr>
              <td>1,001</td>
              <td>random</td>
              <td>data</td>
              <td>placeholder</td>
              <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" className="btn btn-success btn-sm">Success</button>
                <button type="button" className="btn btn-danger btn-sm">Danger</button>
                <button type="button" className="btn btn-warning btn-sm">Warning</button>
              </td>
            </tr>
            <tr>
              <td>1,002</td>
              <td>placeholder</td>
              <td>irrelevant</td>
              <td>visual</td>
              <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" className="btn btn-success btn-sm">Success</button>
                <button type="button" className="btn btn-danger btn-sm">Danger</button>
                <button type="button" className="btn btn-warning btn-sm">Warning</button>
              </td>
            </tr>
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


    </main>
  );
}
