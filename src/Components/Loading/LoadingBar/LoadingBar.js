import * as React from "react";
import styled from "styled-components";

const LoadingBarWrapper = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: center; 
  align-items: center;
  /* z-index: 100; */
  width: 100%;
  height: 0.3rem;
  display: ${props => (props.show ? "flex" : "none")};


`;
const LoadingWrapper = styled.div`
  width: 100%;
  height: 0.3rem;
  background: orange;
`;
const LoadingProgressWrapper = styled.div`
  bottom: 0;
  width: ${props => props.percent};
  /* height: 100%; */
  height: 0.3rem;

  background: green;
`;
const LoadingBar = (props) => {
  let percent = 0;
  if (props.loaded && props.total) {
    percent = Math.round((props.loaded / props.total) * 100);
  }
  return (
    <LoadingBarWrapper show={props.show}>
      <LoadingWrapper>
        <LoadingProgressWrapper percent={`${percent}%`} />
      </LoadingWrapper>
    </LoadingBarWrapper>
  );
};

export default LoadingBar;
