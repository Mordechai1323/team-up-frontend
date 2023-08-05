import styled from 'styled-components';

interface LoadingProps {
  width?: string;
  height?: string;
}

const Loading = ({ width, height }: LoadingProps) => {
  // const gifSrc = ' https://plaidphotography.com/images/edmontonskylineloading.gif';
  const gifSrc = ' https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif';

  return (
    <LoadingStyle width={width} height={height}>
      <img src={gifSrc} alt='Loading gif' />
    </LoadingStyle>
  );
};

export default Loading;

const LoadingStyle = styled.div<LoadingProps>`
  width: ${(props) => (props?.width ? props?.width : '75vw')};
  height: ${(props) => (props?.height ? props?.height : '95vh')};
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 50%;
    height: 50%;
  }
`;
