import ReactDOM from 'react-dom';

import styled from 'styled-components';

interface BackdropProps {
  onClose: () => void;
}

function Backdrop({ onClose }: BackdropProps) {
  return <BackdropStyle onClick={onClose}></BackdropStyle>;
}


interface ModelOverlayProps {
  children: JSX.Element;
}
function ModelOverlay({ children }: ModelOverlayProps) {
  return <ModalStyle>{children}</ModalStyle>;
}

interface ModalProps {
  children: JSX.Element;
  onClose: () => void;
}
export default function Modal({ children, onClose }: ModalProps) {
  const portalElement = document.getElementById('overlays');
  if (!portalElement) return null;
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModelOverlay>{children}</ModelOverlay>, portalElement)}
    </>
  );
}

const BackdropStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalStyle = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  background-color: #222831;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;

  @media (min-width: 768px) {
    width: 35vw;
    left: calc(50% - 20rem);
  }

  @media (max-width: 1300px) {
    top: 15vh;
    width: 45vw;
    left: 65vh;
    min-height: 67vh;
  }
`;
