import { BrowserRouter as Router , Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect } from 'react'

// import Home component
import Home from "./components/Home";
// import About component
import Questionnaire from "./components/Questionnaire";
// import ContactUs component
import About from "./components/About";
  
function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" element={<Home/>} />
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/questionnaire" element={<Questionnaire/>} />
            
          {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
          <Route path="/about" element={<About/>} />
            
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          <Route path="/#" element={<Navigate to="/"/>}/>
        </Routes>
      </Router>
    </>
  );
}
  
export default App;
