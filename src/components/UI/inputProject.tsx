import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface InputProjectProps {
  name?: string;
  label?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: any;
  placeholder?: string;
  required?: boolean;
  type: string;
  errMessage?: string;
}

export default function InputProject({
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  type,
  errMessage,
}: InputProjectProps) {
  return type !== 'file' ? (
    <InputStyle>
      <input
        name={name}
        id={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
      <label htmlFor={name}>{label}</label>
      {errMessage !== '' && <span tabIndex={0}>{errMessage}</span>}
    </InputStyle>
  ) : (
    <InputStyle>
      <input type={type} id={name} onChange={onChange} />
      <label htmlFor={name}>{label}</label>
    </InputStyle>
  );
}

const InputStyle = styled.div`
  width: 55%;
  position: relative;
  margin: 24px 0;

  & input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    font: inherit;
    color: #3e3e3e;
    font-weight: bold;
    background-color: transparent;
    outline: 2px solid #fff;
    color: #eeeeee;
  }
  & label {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(10px, 10px);
    transition: transform 0.25s;
    font-weight: bold;
  }

  & input:focus + label,
  & input:valid + label {
    transform: translate(10px, -14px) scale(0.8);
    color: #eeeeee;
    padding-inline: 5px;
    background: #222831;
    font-weight: bold;
  }

  & input[type='number'] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type='number'] {
      -moz-appearance: textfield; /* Firefox */
    }
  }
  & input[type='date'] {
    appearance: none;
    -webkit-appearance: none;
    background-color: transparent;
    border: none;
    padding: 8px;
    font-size: 16px;
    color: #3e3e3e;
    font-weight: bold;
    outline: none;
    outline: 2px solid #fff;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    &::-webkit-calendar-picker-indicator {
      opacity: 0.5;
      cursor: pointer;
    }
  }
  font-family: 'Noto Sans Mono', monospace;
  & input[type='file']::file-selector-button {
    border-radius: 4px;
    padding: 0 16px;
    // height: 25px;
    cursor: pointer;
    // background-color: white;
    border: 1px solid #3e3e3e;
    margin-right: 16px;
    transition: background-color 200ms;
  }
  & input[type='file']::file-selector-button:hover {
    background-color: #f3f4f6;
  }

  & span {
    color: red;
    margin: 0;
    padding: 0;
    font-size: 0.7em;
  }
`;
