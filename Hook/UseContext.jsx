import React, { createContext, useState } from "react";

const ThemeContext = createContext()

export default function UseContext({children}) {
      const [theme, setTheme] = useState("theme-one")

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