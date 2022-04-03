/**
 * @author Mugdha Agharkar
 */

import styled from "styled-components";

export const Container = styled.div`
    padding: 40px 60px;
    background: #1565c0;
    margin-top: auto;
    margin-bottom: 0;
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    //max-width: 1000px;
    margin: 0 auto;
`

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    color: #FFF;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 60px;
`

export const Link = styled.a`
    color: #fff;
    margin-bottom: 20px;
    font-size: 18px;
    text-decoration: none;

    &:hover {
        color: #FFFFFF;
        transition: 0.2s ease-in;
    }
`

export const Title = styled.div`
    font-size: 24px;
    color: #FFFFFF;
    //margin-bottom: 40px;
    font-weight: bold;
`

export const Text = styled.div`
    font-size: 30px;
    color: #fdad11;
    margin-left: 0 auto;
    margin-top: 90px;

    @media (max-width:1114px) {
        margin-left: 62px;
    }
`

export const SubText = styled.div`
    font-size: 10px;
    color: #fff;
    margin-left: -254px;
    margin-top: 125px;

    @media (max-width:1114px) {
        margin-left: 62px;
    }
`