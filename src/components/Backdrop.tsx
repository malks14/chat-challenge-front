import React from 'react';
import styled from "styled-components"

interface BackdropProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const BackdropContainer = styled.div`
    
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
`

const Backdrop = (backdropProps: BackdropProps) => {
    const {onClick} = backdropProps;
  return (
    <BackdropContainer onClick={onClick}></BackdropContainer>
  );
};

export default Backdrop;
