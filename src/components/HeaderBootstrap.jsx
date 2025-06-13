import imgUrl from '../assets/img/Hospital-Infantil-Sabará.png';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

function HeaderBootstrap() {
  return (
    <header className="border-bottom">
      <div className="container">
      <div className="flex align-items-center">
        <a href="/" className="d-flex text-dark text-decoration-none me-auto">
          <img
            src={imgUrl}
            alt="Hospital Infantil Sabará"
            className="w-[190px]"
          />
        </a>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li className="nav-item custom-dropdown">
            <span className="nav-link dropdown-toggle-custom text-black">
                Estoque<span className="arrow">▼</span>
              </span>
              <ul className="custom-dropdown-menu">
                <li>
                  <Link to="/estoque/lote" className="custom-dropdown-item">
                   Lotes
                  </Link>
                </li>
                <li>
                  <Link to="/estoque/produto" className="custom-dropdown-item">
                   Produtos
                  </Link>
                </li>
              </ul>
            </li>
            <li><a href="/agenda" className="nav-link px-2 link-dark">Agenda</a></li>
            <li><a href="/administrativo" className="nav-link px-2 link-dark">Administrativo</a></li>
            <li><a href="/Artificial" className="nav-link px-2 link-dark">Hermes IA</a></li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" className="form-control" placeholder="Procurar..." aria-label="Procurar" />
          </form>

          <div className="dropdown text-end">
            <a
             href="#"
              className="d-flex align-items-center gap-2 link-dark text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >
              <img
                src="https://github.com/mdo.png"
                alt="Usuário"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </a>
            <ul className="dropdown-menu text-small custom-red-dropdown" aria-labelledby="dropdownUser1">
              <li><a className="dropdown-item" href="/">Sair</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderBootstrap;