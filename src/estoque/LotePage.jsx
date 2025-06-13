
import MainPage from "../main/MainPage";
import TableLote from "./components/TableLote";
import InsertLoteModal from "./components/InsertLoteModal";
function LotePage() {

  return (
    <MainPage>
      <TableLote/>
      <InsertLoteModal/>
    </MainPage>
  );
}

export default LotePage;
