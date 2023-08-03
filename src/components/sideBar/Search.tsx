import styled from 'styled-components';

interface SearchProps {
  onSearchHandler: (search: string) => Promise<void>;
  width?: string;
}
interface SearchStyleProps {
  width?: string;
}

const Search = ({ width, onSearchHandler }: SearchProps) => {
  return (
    <SearchStyle width={width}>
      <i className='fa-solid fa-magnifying-glass'></i>
      <input type='text' onChange={(event) => onSearchHandler(event?.target?.value)} />
    </SearchStyle>
  );
};

export default Search;

const SearchStyle = styled.div<SearchStyleProps>`
  height: 4vh;
  width: ${(props) => (props.width ? props?.width : '80%')};
  display: flex;
  display: flex;
  align-items: center;
  border: 1px solid #eeeeee;
  border-radius: 4px;

  &:hover {
    border-color: #fd7014;
  }

  & i {
    color: #eeeeee;
    padding: 24px 8px;
    width: 10%;
  }

  & input {
    border: none;
    background: none;
    outline: none;
    color: #eeeeee;
    width: 90%;
    padding: 0 0 0 12px;
  }

  @media (max-width: 1300px) {
    height: 6vh;
  }
`;
