import { CaseSection } from './containers/cases/index.jsx'
import { Chat } from './containers/chat/index.jsx'
import { Contact } from './containers/contact/index.jsx'
import { Footer } from './containers/footer/index.jsx'
import { HeroSection } from './containers/hero-section/index.jsx'
import { Video } from './containers/video-section/index.jsx'

function App() {
  return (
    <div>
      <HeroSection />
      <CaseSection />
      <Video />
      <Contact />
      <Footer />
      <Chat />
    </div>
  )
}

export default App
