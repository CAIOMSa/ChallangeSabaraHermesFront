import Footer from "../components/Footer"
import HeaderBootstrap from "../components/HeaderBootstrap"

const MainPage = ({ children }) => {
    return (
      <div>
        <HeaderBootstrap/>
        <main>
          {children}
        </main>
        <Footer/>
      </div>
    );
  };

export default MainPage;
