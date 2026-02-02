import './App.css'
import Ciao from './component/Ciao'
import FullPageSnap, { SnapSection } from './component/FullPageSnap'
import PortfolioFederica from './component/portfolioFederica'
import './component/portfolioFederica.css'


function App() {

  return (
    <div> 
    <FullPageSnap>

      <SnapSection>
       <Ciao />
      </SnapSection>

      <SnapSection>
      <p> SALVE </p>
      </SnapSection>



      </FullPageSnap>
    </div>

      
     
    
          )
}

export default App
