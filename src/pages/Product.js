import React from 'react'
import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'

function Product() {



  const[product, setProduct] = useState([]);

  const params = useParams()
  
  const fetchData = async () => {
    try{
      const response = await fetch('https://codexplained.se/electronics.php?id=' + params.slug);
      const data = await response.json();

      setProduct(data);

    }catch(error){
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div>
      <h1>Product</h1>
      <span>{product?.id}</span>
    </div>
  )
}

export default Product