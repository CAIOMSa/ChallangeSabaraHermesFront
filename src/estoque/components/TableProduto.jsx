import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net";

function TableProduto() {
  const [dados, setDados] = useState([]);
  const tableRef = useRef(null);
  const dtInstance = useRef(null); // Referência ao DataTable

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}produtos`)
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
            title: "COD",
            data: "id",
            defaultContent: "Sem nome",
            width: "60px"
          },
          {
            title: "Produto",
            data: "nome",
            defaultContent: "Sem nome"
          },
          {
            title: "Fabricante",
            data: "fabricante",
            defaultContent: "Desconhecido"
          },
          {
            title: "Descrição",
            data: "descricao",
            defaultContent: "Sem Descrição"
          },
          {
            title: "Quantidade",
            data: "quantidade",
            defaultContent: 0
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


  return (
      <div className="flex min-h-screen bg-white">

        <div className="flex-1 p-6  mt-20">
          <h1 className="text-xl font-bold mb-4">Produtos</h1>
          <div className="grid grid-cols-5 gap-4">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Registrar novo produto
            </button>
          </div>

          <div className="overflow-x-auto mt-20">
            <table ref={tableRef} className="display w-full"></table>
          </div>
        </div>
      </div>
  );
}

export default TableProduto;
