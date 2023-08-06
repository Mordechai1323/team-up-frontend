import { ChangeEvent } from 'react';   
import { styled } from 'styled-components';


interface InputProps {
  label?: string;
  icon?: string;
  input: {
    id?: string;
    type?: string;
    value?: string;
    name?: string;
    placeholder?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  errMessage?: string;
}

export default function Input({ label, input, icon, errMessage }: InputProps) {
  return (
    <InputStyle>
      <label htmlFor={input.id}>{label}</label>
      <div className='input-container'>
        <i className={icon}></i>
        <input {...input} />
      </div>
      {errMessage && (
        <span tabIndex={0} className='err-container'>
          {errMessage}
        </span>
      )}
    </InputStyle>
  );
}

const InputStyle = styled.div`
  margin-top: 18px;
  width: 55%;
  color: #eeeeee;

  & label {
    font-size: 1.4em;
    margin: 0;
    font-weight: bold;
  }

  & .input-container {
    display: flex;
    align-items: center;

    & input {
      width: 100%;
      height: 2.5vh;
      font-size: 1em;
      border: none;
      outline: none;
      margin-left: 8px;
      padding-left: 4px;
      background: #393e46;
      border-radius: 4px;
      font-weight: bold;
      color: #eeeeee;
    }
  }

  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & .err-container {
    color: red;
    font-weight: bold;
    font-size: 0.85em;
  }
`;
