import Footer from '../components/Footer';
import ChamadasFooter from '../components/ChamadasFooter';
import Iniciativas from '../components/Iniciativas';
import CadastroPacienteSabara from '../components/Cadastros';
import HeaderBootstrap from '../components/HeaderBootstrap';

export default function TelaCadastro() {
  return (
    <>
      <HeaderBootstrap />
      <CadastroPacienteSabara />
      <ChamadasFooter />
      <Iniciativas />
      <Footer />
    </>
  );
}