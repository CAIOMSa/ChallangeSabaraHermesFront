import React, { useState } from 'react';
import axios from 'axios';

function CadastroPacienteSabara() {
  const [formData, setFormData] = useState({
    nome_completo: '',
    data_nascimento: '',
    cpf: '',
    rg: '',
    contato: '',
    endereco: {
      cep: '',
      rua: '',
      complemento: ''
    },
    convenio: '',
    tipo_de_relacao: '',
    pessoa_emergencia_nome: '',
    pessoa_emergencia_data_nascimento: '',
    pessoa_emergencia_cpf: "",
    pessoa_emergencia_rg: "",
    pessoa_emergencia_telefone: ""
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEnderecoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      endereco: { ...prev.endereco, [field]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. POST para /pessoas
      const pessoaPayload = {
        id: 0,
        nome_completo: formData.nome_completo,
        data_nascimento: new Date(formData.data_nascimento).toISOString(),
        cpf: formData.cpf,
        rg: formData.rg,
        contatos: [
          {
            id: 0,
            tipo: 'telefone',
            detalhe: formData.contato
          }
        ],
        endereco: {
          id: 0,
          cep: formData.endereco.cep,
          rua: formData.endereco.rua,
          complemento: formData.endereco.complemento
        },
        convenio: [parseInt(formData.convenio)]
      };

      const pessoaEmergencialPayload = {
        id: 0,
        nome_completo: formData.pessoa_emergencia_nome,
        data_nascimento: new Date(formData.pessoa_emergencia_data_nascimento).toISOString(),
        cpf: formData.pessoa_emergencia_cpf,
        rg: formData.pessoa_emergencia_rg,
        contatos: [
          {
            id: 0,
            tipo: 'telefone',
            detalhe: formData.pessoa_emergencia_telefone
          }
        ],
        endereco: {
          id: 0,
          cep: formData.endereco.cep,
          rua: formData.endereco.rua,
          complemento: formData.endereco.complemento
        },
        convenio: [parseInt(formData.convenio)]
      };

      const pessoaResponse = await axios.post(`${import.meta.env.VITE_API_URL}/pessoas`, pessoaPayload);
      const idPessoa = pessoaResponse.data.id;
      const pessoaEmergencialResponse = await axios.post(`${import.meta.env.VITE_API_URL}/pessoas`, pessoaEmergencialPayload);
      const idPessoaEmergencial = pessoaEmergencialResponse.data.id;
      const pessoaEmergenciaPayload = {
        id: 0,
        id_pessoa: idPessoa,
        id_pessoa_emergencia: idPessoaEmergencial,
        tipo_de_relacao: formData.tipo_de_relacao,
        active: true
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/pessoas/pessoa-emergencial`, pessoaEmergenciaPayload);

      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar. Verifique os campos.');
    }
  };

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <h2>Cadastro de Paciente Sabará</h2>

      <input className="form-control mb-2" placeholder="Nome Completo" value={formData.nome_completo} onChange={(e) => handleChange('nome_completo', e.target.value)} />
      <input type="date" className="form-control mb-2" value={formData.data_nascimento} onChange={(e) => handleChange('data_nascimento', e.target.value)} />
      <input className="form-control mb-2" placeholder="CPF" value={formData.cpf} onChange={(e) => handleChange('cpf', e.target.value)} />
      <input className="form-control mb-2" placeholder="RG" value={formData.rg} onChange={(e) => handleChange('rg', e.target.value)} />
      <input className="form-control mb-2" placeholder="Telefone" value={formData.contato} onChange={(e) => handleChange('contato', e.target.value)} />

      <h5>Endereço</h5>
      <input className="form-control mb-2" placeholder="CEP" value={formData.endereco.cep} onChange={(e) => handleEnderecoChange('cep', e.target.value)} />
      <input className="form-control mb-2" placeholder="Rua" value={formData.endereco.rua} onChange={(e) => handleEnderecoChange('rua', e.target.value)} />
      <input className="form-control mb-2" placeholder="Complemento" value={formData.endereco.complemento} onChange={(e) => handleEnderecoChange('complemento', e.target.value)} />

      <input className="form-control mb-2" placeholder="ID Convênio" value={formData.convenio} onChange={(e) => handleChange('convenio', e.target.value)} />

      <h5>Responsável de Emergência</h5>
      <input className="form-control mb-2" placeholder="Tipo de Relação" value={formData.tipo_de_relacao} onChange={(e) => handleChange('tipo_de_relacao', e.target.value)} />
      <input className="form-control mb-2" placeholder="Nome Completo" value={formData.nome_completo} onChange={(e) => handleChange('nome_completo', e.target.value)} />
      <input type="date" className="form-control mb-2" value={formData.data_nascimento} onChange={(e) => handleChange('data_nascimento', e.target.value)} />
      <input className="form-control mb-2" placeholder="CPF" value={formData.cpf} onChange={(e) => handleChange('cpf', e.target.value)} />
      <input className="form-control mb-2" placeholder="RG" value={formData.rg} onChange={(e) => handleChange('rg', e.target.value)} />
      <input className="form-control mb-2" placeholder="Telefone" value={formData.contato} onChange={(e) => handleChange('contato', e.target.value)} />
      <button className="btn btn-primary mt-3" type="submit">Cadastrar</button>
    </form>
  );
}

export default CadastroPacienteSabara;
