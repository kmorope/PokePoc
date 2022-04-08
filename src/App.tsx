import { GlobalProvider } from "context/GlobalContext";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "context/AuthContext";
import MainRouter from "routers/MainRouter";
import "./App.scss";

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <AuthProvider>
          <MainRouter />
        </AuthProvider>
      </Router>
    </GlobalProvider>
  );
};

export default App;
