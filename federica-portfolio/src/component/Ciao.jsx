import './Ciao.css'
import FOTO_CIAO from '../assets/FOTO_CIAO.png';


function Ciao() {

    return (
        <div className='suRigo sezione'>
            <>
            <div style={{padding:"0px 40px"}}>
                <div className='suRigo'>
                    <h1 style={{ fontSize: "96px" }} className='softAccentColor'>01</h1>
                    <h1 style={{ paddingLeft: "35px", fontSize: "96px" }} className='primaryColor'>CIAO!</h1>
                </div>
                
                <p className='secondaryColor'>Ciao, sono Federica — UX/UI Designer con una visione trasversale e un approccio "problem-solving" orientato ai risultati efficaci e all'esperienza.
                </p>
                <p style={{ marginTop: "30px" }} className='secondaryColor'>Vivo a Milano da quasi quattro anni, ma vengo da un piccolo paese immerso nella natura nel Sud Italia: un contesto che ha sempre alimentato la mia creatività, inizialmente espressa in forme diverse dal design.</p>
                <p style={{ marginTop: "30px" }} className='secondaryColor'>Dal 2022 ho intrapreso un percorso autodidatta nella UX/UI, progettando interfacce a stretto contatto con team marketing e sviluppo. Oggi continuo a crescere studiando anche frontend (HTML, CSS, JavaScript, React), con curiosità, impegno e forte attitudine al lavoro di squadra.</p>
            </div>
            <img
                src={FOTO_CIAO}
                alt="Federica Grande"
                className="fotoProfilo"
            />
            </>
        </div>

    )
}

export default Ciao