import React, { Component } from 'react';
import './App.css';

//  Components
import WithValidationPersonForm from './components/PersonDetails/PersonForm';
import Header from './components/Header/Header';



function App() {
   return (
      <div className="container">
         <Header />
         <div className="App">
            <h2>Personal Details</h2>
            <WithValidationPersonForm />
         </div>
      </div>
   );
}

export default App;
