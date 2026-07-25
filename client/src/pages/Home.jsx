import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import ContactForm from '../components/home/ContactForm';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <Hero />
        <Features />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
