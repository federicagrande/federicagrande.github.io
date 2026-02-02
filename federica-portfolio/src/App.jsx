import './App.css'
import FullPageSnap, { SnapSection } from './component/FullPageSnap'
import PortfolioFederica from './component/portfolioFederica'
import './component/portfolioFederica.css'


function App() {

  return (
    <div> 
    <FullPageSnap>

      <SnapSection>
      <h1> CIAO </h1>
      </SnapSection>

      <SnapSection>
      <PortfolioFederica/>
      </SnapSection>

      </FullPageSnap>
    </div>

      
     
    
          )
}

export default App
