import TempoDeAtendimento from '../components/TempoDeAtendimento';
import Footer from '../components/Footer';
import Body from '../components/Body';
import ChamadasFooter from '../components/ChamadasFooter';
import Iniciativas from '../components/Iniciativas';
import HeaderBootstrap from '../components/HeaderBootstrap';


export default function TelaAdministrativo() {
  return (
    <>
      <HeaderBootstrap />
      <TempoDeAtendimento />
      <Body />
      <ChamadasFooter />
      <Iniciativas />
      <Footer />
    </>
  );
}