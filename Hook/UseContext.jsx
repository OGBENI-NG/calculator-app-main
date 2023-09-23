import React, { createContext, useState, useEffect } from "react";


const ThemeContext = createContext()

export default function UseContext({children}) {
      const [theme, setTheme] = useState(storeThemeToLocalStorage)
      const[openHistory, setOpenHistory] = useState(false)

      //using localStorage to store the theme
      function storeThemeToLocalStorage() {
            const storeTheme = localStorage.getItem("theme")
            return storeTheme ? storeTheme : "theme-one"
      }

      useEffect(() => {
            localStorage.setItem("theme", theme)
      },[theme])

      function toggleTheme() {
            if( theme === "theme-one" ) {
                  setTheme("theme-two")
            } else if (theme === "theme-two") {
                  setTheme("theme-three") 
            } else {
                  setTheme("theme-one")
            }
      }
      function toggle() {
            setOpenHistory(prevToggle => !prevToggle)
      }
      return (
            <ThemeContext.Provider value={{theme, toggleTheme, toggle, openHistory}}>
                  <div>{children}</div>
            </ThemeContext.Provider>
      )
}
export {ThemeContext}