import React from 'react'
import { useEffect, useState } from "react"
import styled from 'styled-components'
import { useContext } from 'react'
import { AppContext } from '../App'



export default function Cart() {

  const {open, setOpen, sum, cartObjects} = useContext(AppContext)
  
  


  return (
    <Style className= {`cart ${open && 'open'}`}>
      

      {cartObjects?.map(o => (

        
        <>
          <p>{o.id}</p>
          <p>Price: {o.price}</p>
          <p>Quantity: {o.quantity} </p>
        </>

      ))}

      <h2>Sum: {sum} </h2>
    </Style>
  )
}

const Style = styled.section`
  position: fixed;
  width: 500px;
  height: 100%;
  right: 0;
  top: 0;
  background: red;
  transform: translateX(100%);
  transition: 500ms;


  &.open {
    transform: translateX(0);
  }
`