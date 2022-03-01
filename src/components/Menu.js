import React from 'react'
import styled from 'styled-components'
import { createContext } from 'react'
import { useState } from 'react';
import TestComponent from './TestComponent';


export const MenuContext = createContext();

export default function Menu() {


    const [text, setText] = useState('This is my prop text')

    return (
        <MenuContext.Provider value = {{
            text,
            setText
        }}>
            <Style className = "my-menu">
                <h1>My menu</h1>
                <TestComponent rendom = {'gg'} />
            </Style>
        </MenuContext.Provider>
    )
}

const Style = styled.section`
    
`