import TableProduto from "./components/TableProduto"
import MainPage from "../main/MainPage";
import InsertProdutoModal from "./components/InsertProdutoModal";

function ProdutoPage() {

  return (
    <MainPage>
      <TableProduto/>
      <InsertProdutoModal/>
    </MainPage>
  );
}

export default ProdutoPage;
