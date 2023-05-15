import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { Provider as AuthProvider } from './context/AuthContext';
import { ApiProvider } from './context/ApiContext';
import Router from './pages/Router';


function App() {

  /**
   * @IMPORTANT
   * ApiProvider must be a child of AuthProvider
   * ApiProvider must be a child of DataProvider
   * 
   */

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <ApiProvider>
              <Router />
            </ApiProvider>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App


