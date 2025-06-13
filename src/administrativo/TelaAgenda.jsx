import HeaderBootstrap from '../components/HeaderBootstrap';
import TempoDeAtendimento from '../components/TempoDeAtendimento';
import AgendaMedica from '../components/AgendaMedica';
import ChamadasFooter from '../components/ChamadasFooter';
import Iniciativas from '../components/Iniciativas';
import Footer from '../components/Footer';

export default function TelaAgenda() {
  return (
    <>
      <HeaderBootstrap/>
      <TempoDeAtendimento />
      <AgendaMedica />
      <ChamadasFooter />
      <Iniciativas />
      <Footer />
    </>
  );
}
