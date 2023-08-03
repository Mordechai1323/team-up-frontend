import { FormEvent, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface FormProps {
  onSubmit: (event: FormEvent) => void;
}

export default function Form({ children, onSubmit }: PropsWithChildren<FormProps>) {
  return <FormStyle onSubmit={onSubmit}>{children}</FormStyle>;
}

const FormStyle = styled.form`
  width: 100%;
  min-height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;

  & .login-center {
    margin-right: 15vw;
    width: 70%;
    max-width: 350px;
    min-height: 500px;
    background-color: #393e46;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;

    & .footer-container {
      width: 80%;
      min-height: 64px;
      display: flex;
      justify-content: space-around;

      & button {
        border: none;
        background: none;
        font-weight: bold;
        font-size: 0.8em;
        height: 100%;
        color: #eeeeee;
      }
      & a {
        text-decoration: none;
        font-weight: bold;
        font-size: 0.8em;
        color: #eeeeee;
        height: 100%;
      }
    }
  }

  @media (min-width: 1300px) {
    min-height: 850px;
    & .login-center {
      max-width: 400px;
      min-height: 590px;
      & .header-container {
        height: 88px;
      }
    }
  }
`;
