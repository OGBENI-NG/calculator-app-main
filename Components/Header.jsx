import React, {useContext} from 'react'
import { ThemeContext } from '../Hook/UseContext'

function Header() {
      const {theme, toggleTheme} = useContext(ThemeContext)

      const togglePlaceholder = theme === "theme-two" 
            ? "dot-two" 
            : theme === "theme-three" 
            ? "dot-three" 
            : ""
      
      return (
            <header className='header'>
                  <h1>calc</h1>
                  <div className='toggle-theme-wrapper'>
                        <div className={`toggle-placeholder-wrapper`}>
                              <span>theme</span>
                        </div>
                        <div className='toggle-theme-wrapper'>
                              <div className='toggle-theme-inner'>
                                    <div className='toggle-num-wrapper'>
                                          <span className={`${theme === "theme-one" && "num"}`}>1</span>
                                          <span className={`${theme === "theme-two" && "num num-two"}`}>2</span>
                                          <span className={`${theme === "theme-three" && "num num-three"}`}>3</span>
                                    </div>
                                    <div className={`toggle-placeholder ${theme}-theme`} onClick={toggleTheme}>
                                          <div className={`dot ${togglePlaceholder}`}></div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  
            </header>
      )
}
export default Header