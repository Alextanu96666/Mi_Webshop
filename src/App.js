import logo from './logo.svg';
import './App.css';
import { render } from "react-dom";
import './styles/style.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { useEffect } from 'react';

import CompJS from './util/Utils';

import React, {createContext}  from 'react';
import Footer from './components/Footer';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import Products from './pages/Products';
import Cart from './components/Cart';
import { useState } from 'react';
import Menu from './components/Menu';



export const AppContext = createContext();




function App() {

  useEffect(() => {
  
    CompJS.init();  //FUSK
  
  }, [])


  const [cartObjects, setCartObjects] = useState([])
  const [open, setOpen] = useState(false)
  const [sum, setSum] = useState(undefined)
  const [productQuantity, setProductQuantity] = useState([])

  return (

    <AppContext.Provider value = {{
      cartObjects,
      setCartObjects,
      open,
      setOpen,
      sum,
      setSum,
      productQuantity,
      setProductQuantity
    }}>
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Header />
      
          <Routes>
          <Route path="/" element={<Products/>}></Route>
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>

        <Cart />

        <Footer/>
      </BrowserRouter>
      </div>
      </AppContext.Provider>

  



      

  );
}

export default App;
