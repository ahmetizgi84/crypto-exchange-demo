import { createContext, useState, useEffect } from 'react';


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    const theme = localStorage.getItem('woynex-theme') || 'light'
    let body = document.getElementById('root-body')
    body.className = theme
    setTheme(theme)
  }, [])


  const initialState = {
    theme,
    setTheme
  }




  return (
    <ThemeContext.Provider value={initialState}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
