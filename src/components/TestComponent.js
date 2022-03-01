import React from 'react'
import styled from 'styled-components'
import { useContext } from 'react'
import { MenuContext } from './Menu'
import { AppContext } from '../App'
import { useEffect } from 'react'

export default function TestComponent({...props}) {


    const {text, setText} = useContext(MenuContext)

    const {sum} = useContext(AppContext)

    

    useEffect(() => {
      console.log(props)
    }, [])
    

    return (
        <Style className='test'>
            <div>{text}</div>
            {sum == undefined &&
                <p>No Sum</p>
            }

            {sum && sum}
        </Style>
    )
}

const Style = styled.section`

`