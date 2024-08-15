import './App.css';
import Home from "./pages/Home";
import {AuthProvider} from "./AuthContext";
import Navbar from "./components/Navbar";


function App() {

  return (
    <div>
        <AuthProvider>
          <Navbar />
          <Home />
        </AuthProvider>
    </div>
  );
}

export default App;
