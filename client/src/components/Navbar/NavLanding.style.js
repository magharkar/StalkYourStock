/**
 * @author Vibhor Bhatnagar
 */

import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'

export const Nav = styled.div`
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background: #1d3124;

    & .btn_container {
        overflow: auto;
        float: right;

        @media (max-width: 768px) {
            display: none;
        }
    }
`

export const MenuIcon = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;

    span {
        height: 2px;
        width: 25px;
        background: #FFFFFF;
        margin-bottom: 4px;
        border-radius: 5px;
    }

    @media (max-width: 768px) {
        display: flex;
    }
`

export const Menu = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: right;
    position: relative;
    margin: 0 auto;

    & .btn_container {
        display: none;
        overflow: auto;
        float: right;

        @media (max-width: 768px) {
            display: flex;
            justify-content: space-between;
            padding-bottom: 20px;
            align-items: right;
        }
    }

    @media (max-width: 768px) {
        overflow: hidden;
        margin-top: -20px;
        align-items: center;
        flex-direction: column;
        width: 100%;
        max-height: ${({isClicked}) => (isClicked ? "300px" : "0")};
        transition: max-height 0.2s ease-in;
    }
`

export const NavLinks = styled(Link)`
    display: flex;
    justify-content: center;
    position: relative;
    padding: 1rem 2rem;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    color: #FFFFFF;
    transition: all 0.2s ease-in;
    font-size: 18px;

    &:hover {
        color: #fdad11;
    }
`
export const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 190px;
    justify-content: space-between;
`

export const Logo = styled.a`
    padding: 1rem 0;
    color: #FDAD11;
    text-decoration: none;
    font-weight: 800;
    font-size: 1.7rem;

    span {
        font-weight: 600;
        font-size: 1.5rem;
    }
`