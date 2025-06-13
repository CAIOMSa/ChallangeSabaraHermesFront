import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MainPage from "../main/MainPage";

const customStyles = `
  .percent-range:disabled {
    background: rgb(255, 255, 255);
    width: 100%; /* Ajustado para ser responsivo */
    appearance: none;
    -webkit-appearance: none;
    border-radius: 30px;
    position: relative;
    height: 8px; /* Altura um pouco maior para melhor visualização */
  }
  .percent-range:disabled::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
    border: none;
  }
  .percent-range:disabled::-moz-range-thumb {
    width: 0;
    height: 0;
    border: none;
    background: none;
  }
  .form-label-custom {
    font-weight: 500;
    color: #333;
    margin-bottom: 0.25rem;
  }
`;

function Artificial() {
  const [formData, setFormData] = useState({
    observacoes_medicas: '',
    relatorio_pessoal: '',
    pressao: '',
    saturacao_sangue: '',
    peso: '',
    exames_realizados: '',
    historico_med_familiar: '',
    condicoes_med_preexistentes: '',
    medicacoes_em_uso: '',
    restricoes: '',
    temperatura: '',
  });

  const [resultadoIA, setResultadoIA] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const instrucoesModalRef = useRef(null);
  const [hasShownInstructions, setHasShownInstructions] = useState(() => {
    return localStorage.getItem('hasShownInstructionsModal') === 'true';
  });

  useEffect(() => {
    const tryShowModal = () => {
      if (window.bootstrap && window.bootstrap.Modal && instrucoesModalRef.current) {
        if (!hasShownInstructions) {
          const bsModal = new window.bootstrap.Modal(instrucoesModalRef.current);
          bsModal.show();
          localStorage.setItem('hasShownInstructionsModal', 'true');
          setHasShownInstructions(true);
        }
        clearInterval(checkBootstrapInterval);
      }
    };

    let checkBootstrapInterval;
    if (!hasShownInstructions) {
      tryShowModal();
      checkBootstrapInterval = setInterval(tryShowModal, 100);
    }

    return () => {
      if (checkBootstrapInterval) {
        clearInterval(checkBootstrapInterval);
      }
    };
  }, [hasShownInstructions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'observacoes_medicas', 'relatorio_pessoal', 'pressao', 'saturacao_sangue',
      'peso', 'exames_realizados', 'historico_med_familiar',
      'condicoes_med_preexistentes', 'medicacoes_em_uso', 'restricoes', 'temperatura'
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Por favor, preencha o campo "${field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}".`);
        return false;
      }
    }
    setError('');
    return true;
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setResultadoIA(null);

    const payload = {
      id: 0,
      ...formData,
      peso: parseFloat(formData.peso),
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}diagnostico/enviar-para-analise`, payload);
      setResultadoIA(response.data);
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      setError('Erro ao enviar para análise. Por favor, tente novamente. Detalhes: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };


  const handleReopenInstructions = () => {
    if (window.bootstrap && window.bootstrap.Modal && instrucoesModalRef.current) {
      const bsModal = new window.bootstrap.Modal(instrucoesModalRef.current);
      bsModal.show();
    } else {
      console.warn("Bootstrap Modal object not found. Make sure Bootstrap JS is loaded.");
    }
  };

  return (
    <MainPage>
    <div className="bg-light min-vh-100 py-4">
      <style>{customStyles}</style>

      {/* Modal de Instruções - Agoras direto no JSX do componente Artificial */}
      <div className="modal fade" id="instrucoesModal" tabIndex="-1" aria-labelledby="instrucoesModalLabel" aria-hidden="true" ref={instrucoesModalRef}>
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="instrucoesModalLabel">Bem-vindo ao HermesIA</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div className="modal-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <h1 className="text-center mb-4 text-primary">Análise Médica com HermesIA</h1>
        <div className="row g-4">
          {/* Formulário */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-primary text-white text-center fs-5">
                Formulário para Análise
              </div>
              <div className="card-body">
                <form onSubmit={enviarFormulario}>
                  <p className="text-muted mb-3">Preencha os campos abaixo com as informações médicas para que a HermesIA possa realizar a análise.</p>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="observacoes_medicas" className="form-label form-label-custom">Observações Médicas</label>
                      <input type="text" className="form-control" id="observacoes_medicas" name="observacoes_medicas" value={formData.observacoes_medicas} onChange={handleChange} placeholder="Ex: Sensibilidade na região lombar." required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="relatorio_pessoal" className="form-label form-label-custom">Relatório Pessoal</label>
                      <input type="text" className="form-control" id="relatorio_pessoal" name="relatorio_pessoal" value={formData.relatorio_pessoal} onChange={handleChange} placeholder="Ex: Dor ao urinar e desconforto." required />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="pressao" className="form-label form-label-custom">Pressão Arterial</label>
                      <input type="text" className="form-control" id="pressao" name="pressao" value={formData.pressao} onChange={handleChange} placeholder="Ex: 120x80" required />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="saturacao_sangue" className="form-label form-label-custom">Saturação de Oxigênio</label>
                      <input type="text" className="form-control" id="saturacao_sangue" name="saturacao_sangue" value={formData.saturacao_sangue} onChange={handleChange} placeholder="Ex: 98%" required />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="temperatura" className="form-label form-label-custom">Temperatura (°C)</label>
                      <input type="text" className="form-control" id="temperatura" name="temperatura" value={formData.temperatura} onChange={handleChange} placeholder="Ex: 37.5°C" required />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="peso" className="form-label form-label-custom">Peso (kg)</label>
                      <input type="number" step="0.1" className="form-control" id="peso" name="peso" value={formData.peso} onChange={handleChange} placeholder="Ex: 70.5" required />
                    </div>
                    <div className="col-md-8">
                      <label htmlFor="exames_realizados" className="form-label form-label-custom">Exames Realizados</label>
                      <input type="text" className="form-control" id="exames_realizados" name="exames_realizados" value={formData.exames_realizados} onChange={handleChange} placeholder="Ex: Hemograma, Raio-X de tórax" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="historico_med_familiar" className="form-label form-label-custom">Histórico Médico Familiar</label>
                      <input type="text" className="form-control" id="historico_med_familiar" name="historico_med_familiar" value={formData.historico_med_familiar} onChange={handleChange} placeholder="Ex: Mãe diabética, Pai hipertenso" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="condicoes_med_preexistentes" className="form-label form-label-custom">Condições Médicas Preexistentes</label>
                      <input type="text" className="form-control" id="condicoes_med_preexistentes" name="condicoes_med_preexistentes" value={formData.condicoes_med_preexistentes} onChange={handleChange} placeholder="Ex: Asma, Dislipidemia" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="medicacoes_em_uso" className="form-label form-label-custom">Medicações em Uso</label>
                      <input type="text" className="form-control" id="medicacoes_em_uso" name="medicacoes_em_uso" value={formData.medicacoes_em_uso} onChange={handleChange} placeholder="Ex: Ibuprofeno, Insulina" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="restricoes" className="form-label form-label-custom">Restrições ou Alergias</label>
                      <input type="text" className="form-control" id="restricoes" name="restricoes" value={formData.restricoes} onChange={handleChange} placeholder="Ex: Restrição de glúten, Alergia a penicilina" required />
                    </div>
                  </div>
                  {error && <div className="alert alert-danger mt-3">{error}</div>}
                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          {' '} Enviando para Análise...
                        </>
                      ) : (
                        'Enviar para Análise'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-success text-white text-center fs-5">
                Resultados da Análise da IA
              </div>
              <div className="card-body d-flex flex-column justify-content-between">
                {isLoading && (
                  <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p className="mt-2 text-muted">Analisando os dados, por favor aguarde...</p>
                  </div>
                )}

                {error && !isLoading && (
                  <div className="alert alert-warning text-center my-5" role="alert">
                    <p className="mb-0">Não foi possível obter os resultados.</p>
                    <small>{error}</small>
                  </div>
                )}

                {resultadoIA && !isLoading && !error ? (
                  <>
                    <h4 className="text-success mb-3">Possíveis Diagnósticos:</h4>
                    {resultadoIA.previsoes.sort((a, b) => b.probabilidade - a.probabilidade).map((previsao) => (
                      <div key={previsao.doenca} className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">{previsao.doenca}</h6>
                          <span className="badge bg-info text-dark">{Math.round(previsao.probabilidade * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          className="percent-range mt-1"
                          min="0"
                          max="100"
                          value={Math.round(previsao.probabilidade * 100)}
                          style={{
                            background: `linear-gradient(to right, #28a745 ${Math.round(previsao.probabilidade * 100)}%, #e9ecef ${Math.round(previsao.probabilidade * 100)}%)`,
                          }}
                          disabled
                        />
                      </div>
                    ))}

                    <hr />
                    <h5 className="mt-4">Explicação da Análise:</h5>
                    <p className="text-muted">{resultadoIA.explicacao}</p>

                    <h5 className="mt-4">Casos Similares Relevantes:</h5>
                    {resultadoIA.casos_similares && resultadoIA.casos_similares.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {resultadoIA.casos_similares.map((caso, index) => (
                          <li key={index} className="list-group-item">
                            <strong>Doença:</strong> {caso.doenca}<br />
                            <small><strong>Medicação Sugerida:</strong> {caso.medicacao || 'N/A'}</small><br />
                            <small><strong>Exames Comuns:</strong> {caso.examesrealizados || 'N/A'}</small>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">Nenhum caso similar encontrado em nossa base para complementar a análise.</p>
                    )}
                  </>
                ) : (
                  !isLoading && !error && (
                    <div className="text-center my-5 text-muted">
                      <i className="bi bi-robot fs-1 text-secondary"></i>
                      <p className="mt-3">Os resultados da análise da inteligência artificial aparecerão aqui.</p>
                      <p>Preencha o formulário e clique em "Enviar para Análise" para começar.</p>
                    </div>
                  )
                )}
              </div>
              <div className="card-footer text-muted text-center">
                HermesIA - Sua saúde, nossa tecnologia.
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
        </div>
      </div>
    </div>
    </MainPage>
  );
}

export default Artificial;