import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styled from 'styled-components'
import ProductCard from "../components/ProductCard";
import { useDevices } from "../util/Utils";
import Cart from "../components/Cart";

export default function Products() {

const[products, setproducts] = useState([]);


const [mobile] = useDevices()

const fetchData = async () => {
  try{
    const response = await fetch('https://codexplained.se/electronics.php');
    const data = await response.json();

  setproducts(data);
  }catch(error){
    console.log(error)
  }
}

useEffect(() => {
  fetchData();
}, []);

  return (
    <>
        <div className="title contained">
          <h1>Products</h1>
        </div>
        
          <ProductGrid className = "products contained">
            {
              products?.map(product => (
                <ProductCard product = {product} key = {JSON.stringify(product)} />
              )
              )
            }
          </ProductGrid>
    </>
  )
}


const ProductGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  
  .tablet & {
    grid-template-columns: repeat(2, 1fr);
  }

  .mobile & {
    grid-template-columns: 1fr;
  }

  
`