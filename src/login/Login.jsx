import Component from '../assets/img/Component 3.png';

function Login() {

    return (
        <>
        <div className='fechamento-tela fechamento-tela-expand-lg bg-body-tertiary fixed-top'>
            <button type="button" class="btn-close" disabled aria-label="Close"></button>
        </div>

        <div className="pagina-login d-flex flex-lg-row flex-column min-vh-100 fixed-top">
            <div className="imagem col-lg-6 d-flex align-items-center justify-content-center p-4">
                <img src={Component} alt="Logo do Hospital com formas geometicas nas cores, azul, vermelho e verde" className="img-fluid imagem-login d-none d-md-block" />
            </div>

            <div className="login col-lg-6 d-flex flex-column justify-content-center align-items-center p-5">
                <h1 className="mb-4">Login</h1>

                <form className="w-100" style={{ maxWidth: '400px' }}>
                <div className="mb-3">
                    <select className="form-select" id="tipoUsuario">
                    <option defaultValue>Selecione o usuário</option>
                    <option value="P">Paciente</option>
                    <option value="M">Médico</option>
                    <option value="A">Administrativo</option>
                    </select>
                </div>

                <div className="mb-3">
                    <input type="text" className="form-control" id="cpf" placeholder="Informe seu CPF ou CRM" />
                </div>

                <div className="mb-3 ">
                    <label htmlFor="senha" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="senha" placeholder="Informe sua senha" />
                </div>

                <div className="mb-3 d-flex justify-content-between">
                    <a href="#">Esqueceu a senha?</a>
                </div>

                <div className="d-grid gap-2">
                    <a href="/administrativo"><div className="btn btn-primary">Entrar</div></a>
                </div>
                </form>
            </div>
        </div>


        </>
    )
}

export default Login
