import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

export default function Header() {

  return (
    <Style className = "header">
      <Link to="/" className='test'><h1>Hemsidans namn</h1></Link>
      <div className='cart-icon'>
        <p>Cart</p>
      </div>
    </Style>
  )
}

const Style = styled.section`
  display:flex;
  justify-content: space-between;
  height: 100px;
  align-items: center;
  padding: 0 2rem;
`