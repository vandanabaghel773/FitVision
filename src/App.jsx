import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import BodyDetection from './components/BodyDetection'
import TryOnSection from './components/TryOnSection'
import ClothingGrid from './components/ClothingGrid'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'

const Divider = () => (
  <div style={{ padding: '0 24px' }}>
    <div className="section-divider" />
  </div>
)

function App() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Divider />
      <HowItWorks />
      <Divider />
      <BodyDetection />
      <Divider />
      <TryOnSection />
      <Divider />
      <ClothingGrid />
      <Divider />
      <FeaturesSection />
      <Footer />
    </div>
  )
}

export default App
