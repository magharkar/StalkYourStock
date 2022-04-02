/**
 * @author Vibhor Bhatnagar
 */

import styled from 'styled-components'
import uploadRecipeImg from '../../assets/pictures/uploadRecipeBg.png'

export const PageWrapper = styled.div`
    background-image: url(${uploadRecipeImg});
`

export const Row = styled.div`
    display: flex;
    @media (max-width: 950px) {
        flex-direction: column;
    }
`

export const Column = styled.div`
    flex: 50%;
    display: flex;
    padding: 10px;
    height: 650px;
    color: #000;
    align-items: center;
    justify-content: center;
`

export const Card = styled.div`
    width: 450px;
    height: 230px;
    text-align: center;
    justify-content: center;
    border-style: solid;
    border-radius: 10px;
    background-color: #C3F1A9;
`

