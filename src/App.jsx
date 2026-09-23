import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import CompanySection from './components/CompanySection';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import GlobalEarthSection from './components/GlobalEarthSection';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <Services />
        <CompanySection />
        <BeforeAfter />
        <GlobalEarthSection />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
