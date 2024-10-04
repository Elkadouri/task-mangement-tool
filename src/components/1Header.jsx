import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { modeContext } from '../App';


export default function Header() {

    const [mode , setMode] = [useContext(modeContext)[0], useContext(modeContext)[1]];

    function toggleMode(){
        mode === 'light' ? setMode('') : setMode('light');     
    }

  return (
    <header>
        <h3 className='logo'>{localStorage.getItem('keyInfo') ? JSON.parse(localStorage.getItem('keyInfo')).username : 'tm'}</h3>
        <span className={`toggle-mode-btn ${mode === 'light' ? 'toggle-light' : 'toggle-dark'}`}
          onClick={() => toggleMode()}
        >
            {
                mode === 'light' 
                ? 
                <FontAwesomeIcon icon={faSun} />
                :
                <FontAwesomeIcon icon={faMoon} />
            }
            
        </span>
    </header>
  )
}