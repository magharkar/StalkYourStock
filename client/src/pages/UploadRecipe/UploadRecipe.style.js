/**
 * @author Vibhor Bhatnagar
 */

import styled from 'styled-components'

export const PageWrapper = styled.div`
`

export const Title = styled.div`
  font-size: 64px;
  font-weight: 300;
  text-align: center;
  margin-top: 51px;
`

export const MainFormContainer = styled.div`
  margin: 60px auto;
  width: 800px;
  box-shadow: 10px 10px 30px #c0c0c0;
  background-color: #c3f1a9;
  opacity: 0.9;
  position: relative;
  border-radius: 10px;
  height: 600px;
  display: grid;

  @media (max-width:768px) {
    width: 450px;
  }

  @media (max-width: 450px) {
    width: 320px;
  }
`;

export const UploadRecipeForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const FormInputFields = styled.div`
  margin-bottom: 0.5rem;
  width: 80%;

  p {
    font-size: 0.8rem;
    margin-top: 0.2rem;
    color: #f00e0e;
  }
`

export const FormLabel = styled.div`
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 6px;
  color: black;
`

export const FormInput = styled.input`
  display: block;
  border-style: solid;
  border-width: .5px;
  padding-left: 10px;
  outline: black;
  border-radius: 2px;
  height: 40px;
  width: 100%;
`

export const FormInputTextArea = styled.textarea`
  display: block;
  border-style: solid;
  border-width: .5px;
  padding-left: 10px;
  outline: black;
  border-radius: 2px;
  height: 40px;
  width: 100%;

  &::placeholder {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #928f8f;
  }
`

export const Footer = styled.div`
  bottom: 0;
`;
