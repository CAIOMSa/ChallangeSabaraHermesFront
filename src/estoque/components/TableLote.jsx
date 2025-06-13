import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net";

function TableLote() {
  const [dados, setDados] = useState([]);
  const tableRef = useRef(null);
  const dtInstance = useRef(null); // Referência ao DataTable

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}produtos/lote`)
      .then((res) => res.json())
      .then((data) => {
        setDados(data);
      });
  }, []);

  useEffect(() => {
    if (dados.length > 0) {
      if (dtInstance.current) {
        dtInstance.current.destroy();
        $(tableRef.current).empty();
      }

      dtInstance.current = $(tableRef.current).DataTable({
        data: dados,
        columns: [
          {
            title: "Produto",
            data: "produto.nome",
            defaultContent: "Sem nome"
          },
          {
            title: "Quantidade (lote)",
            data: "quantidade",
            defaultContent: 0
          },
          {
            title: "Quantidade total",
            data: "produto.quantidade",
            defaultContent: 0
          },
          {
            title: "Distribuidor",
            data: "distribuidor",
            defaultContent: "Desconhecido"
          },
          {
            title: "Data Recebimento",
            data: "data_recebimento",
            defaultContent: "Sem data",
            render: function (data) {
                return data ? data.split('T')[0] : "Sem data";
              }
          },
          {
            title: "Validade",
            data: "data_validade",
            defaultContent: "Sem data",
            render: function (data) {
                return data ? data.split('T')[0] : "Sem data";
              }
          }
        ],
        language: {
          "sEmptyTable": "Nenhum dado disponível na tabela",
          "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
          "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
          "sInfoFiltered": "(filtrado de _MAX_ registros no total)",
          "sLengthMenu": "Mostrar _MENU_ registros",
          "sLoadingRecords": "Carregando...",
          "sProcessing": "Processando...",
          "sSearch": "Buscar:",
          "sZeroRecords": "Nenhum registro encontrado",
          "oPaginate": {
            "sFirst": "Primeiro",
            "sLast": "Último",
            "sNext": "Próximo",
            "sPrevious": "Anterior"
          },
          "oAria": {
            "sSortAscending": ": ativar para ordenar a coluna de forma ascendente",
            "sSortDescending": ": ativar para ordenar a coluna de forma descendente"
          }
        }
      });
    }
  }, [dados]);

  const filtrar = (tipo) => {
    const hoje = new Date();

    if (tipo === "vencendo") {
      const em30Dias = dados.filter((lote) => {
        const validade = new Date(lote.data_validade);
        return (validade - hoje) / (1000 * 60 * 60 * 24) <= 30;
      });
      atualizarTabela(em30Dias);
    } else if (tipo === "vencido") {
      const vencidos = dados.filter((lote) => {
        const validade = new Date(lote.data_validade);
        return validade < hoje;
      });
      atualizarTabela(vencidos);
    } else {
      atualizarTabela(dados);
    }
  };

  const atualizarTabela = (novosDados) => {
    const table = dtInstance.current;
    table.clear();
    table.rows.add(novosDados);
    table.draw();
  };

  return (
      <div className="flex min-h-screen bg-white">

        <div className="flex-1 p-6  mt-20">
          <h1 className="text-xl font-bold mb-4">Lotes</h1>
          <div className="grid grid-cols-5 gap-4">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Registrar novo lote
            </button>
          </div>

          <div className="grid grid-cols-5 gap-4  mt-10">
            <button onClick={() => filtrar("todos")} className="bg-gray-300 px-3 py-1 rounded">
              TODOS
            </button>
            <button onClick={() => filtrar("vencendo")} className="bg-yellow-300 px-3 py-1 rounded">
              VENCE EM 30 DIAS
            </button>
            <button onClick={() => filtrar("vencido")} className="bg-red-400 px-3 py-1 rounded">
              VENCIDOS
            </button>
          </div>

          <div className="overflow-x-auto mt-20">
            <table ref={tableRef} className="display w-full"></table>
          </div>
        </div>
      </div>
  );
}

export default TableLote;
