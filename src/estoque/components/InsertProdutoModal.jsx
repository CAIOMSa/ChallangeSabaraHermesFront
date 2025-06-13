import React, { useState } from 'react';
import axios from 'axios';


function InsertProdutoModal() {
  const [formData, setFormData] = useState({
    id: 0,
    nome: '',
    descricao: '',
    fabricante: '',
    quantidade: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  try{
    const ProdutosPayload = {
      id: 0,
      nome: formData.nome,
      descricao: formData.descricao,
      fabricante: formData.fabricante,
      quantidade: parseInt(formData.quantidade),
    };

    const response = await axios.post(`${import.meta.env.VITE_API_URL}produtos`, ProdutosPayload);
    console.log(response)
  }catch(error){
    alert('erro ao cadastrar',error)
  }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Novo lote</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input className="form-control mb-2" placeholder="nome" value={formData.nome} onChange={(e) => handleChange('nome', e.target.value)} />
        <input className="form-control mb-2" placeholder="descricao" value={formData.descricao} onChange={(e) => handleChange('descricao', e.target.value)} />
        <input className="form-control mb-2" placeholder="fabricante" value={formData.fabricante} onChange={(e) => handleChange('fabricante', e.target.value)} />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary" onClick={handleSubmit}>Registrar</button>
      </div>
    </div>
  </div>
</div>
  );
}

export default InsertProdutoModal;
