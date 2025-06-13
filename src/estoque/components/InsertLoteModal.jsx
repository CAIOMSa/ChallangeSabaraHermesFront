import React, { useState } from 'react';
import axios from 'axios';


function InsertLoteModal() {
  const [formData, setFormData] = useState({
    id: 0,
    id_produto: '',
    quantidade: '',
    distribuidor: '',
    data_recebimento: '',
    data_validade: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  try{
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const LotePayload = {
      id: 0,
      id_produto: parseInt(formData.id_produto),
      quantidade: parseInt(formData.quantidade),
      distribuidor: formData.distribuidor,
      data_recebimento: formattedDate,
      data_validade: formData.data_validade
    };

    const response = await axios.post(`${import.meta.env.VITE_API_URL}produtos/lote`, LotePayload);
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
        <input className="form-control mb-2" placeholder="id_produto" value={formData.id_produto} onChange={(e) => handleChange('id_produto', e.target.value)} />
        <input className="form-control mb-2" placeholder="quantidade" value={formData.quantidade} onChange={(e) => handleChange('quantidade', e.target.value)} />
        <input className="form-control mb-2" placeholder="distribuidor" value={formData.distribuidor} onChange={(e) => handleChange('distribuidor', e.target.value)} />
        <input type="date" className="form-control mb-2" value={formData.data_validade} onChange={(e) => handleChange('data_validade', e.target.value)} />
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

export default InsertLoteModal;
