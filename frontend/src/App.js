import Home from "./pages/Home";
import Languages from './pages/Languages';
import Register from "./pages/Register";
import Language_management from "./pages/LanguageManagement";
import About from './pages/About';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import UpdateStudents from "./pages/UpdateStudents";
import UpdateLanguage from "./pages/UpdateLanguages";


import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'; 

function App() {
 
  return (
    <div className="App">
        
      <Router>
        <NavBar/>
            <Routes>
                <Route path ="/" excat Component={Home}/>
                <Route path ="/languages" excat Component={Languages}/>
                <Route path ="/register" excat Component={Register}/>
                <Route path ="/language-management" excat Component={Language_management}/>
                <Route path ="/about" excat Component={About}/>            

                <Route path="/update-register/:id" element={<UpdateStudents/>}/>
                <Route path="/update-languages/:id" element={<UpdateLanguage/>}/>

            </Routes>
            <Footer/>
        </Router>
    </div>
  );
}

export default App;
