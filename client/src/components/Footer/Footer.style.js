/**
 * @author Vibhor Bhatnagar
 */

import styled from "styled-components";

export const Container = styled.div`
    padding: 40px 60px;
    background: #1d3124;
    margin-top: auto;
    margin-bottom: 0;
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
`

export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-gap: 25px;

    @media (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
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
        color: #fdad11;
        transition: 0.2s ease-in;
    }
`

export const Title = styled.p`
    font-size: 24px;
    color: #FDAD11;
    margin-bottom: 40px;
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