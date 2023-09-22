import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext()

export default function UseContext({children}) {
      const [theme, setTheme] = useState(storeThemeToLocalStorage)

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
      return (
            <ThemeContext.Provider value={{theme, toggleTheme}}>
                  <div>{children}</div>
            </ThemeContext.Provider>
      )
}
export {ThemeContext}