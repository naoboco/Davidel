import { useCallback, useState } from 'react'
import { LangProvider } from './i18n/LangContext'
import { CarnetProvider } from './lib/CarnetContext'

import Cursor from './components/Cursor'
import Header from './components/Header'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Occasions from './components/Occasions'
import Universes from './components/Universes'
import Menu from './components/Menu'
import Events from './components/Events'
import Gallery from './components/Gallery'
import Instagram from './components/Instagram'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import MobileCTA from './components/MobileCTA'
import Carnet from './components/Carnet'
import InstallApp from './components/InstallApp'

export default function App() {
  const [filter, setFilter] = useState('tout')

  const goToMenu = useCallback((f = 'tout') => {
    setFilter(f)
    const el = document.getElementById('menu')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <LangProvider>
      <CarnetProvider>
        <Cursor />
        <Header onOrder={() => goToMenu('tout')} />
        <main>
          <Hero onOrder={() => goToMenu('tout')} />
          <TrustBar />
          <Occasions onSeeAll={goToMenu} />
          <Universes onFilter={goToMenu} />
          <Menu filter={filter} setFilter={setFilter} />
          <Events />
          <Gallery />
          <Instagram />
          <Contact />
        </main>
        <Footer />
        <FloatingActions />
        <MobileCTA onOrder={() => goToMenu('tout')} />
        <Carnet />
        <InstallApp />
      </CarnetProvider>
    </LangProvider>
  )
}
