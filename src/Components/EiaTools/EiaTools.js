import React from "react";
import styled from "styled-components";


const EiaToolsWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background:red;
    color: black;
`;

const EiaNavbarTools = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`
 const ToolLink = styled.p`
 
 `
const EiaTools = () => {
    return (
        <EiaToolsWrapper>
         <EiaNavbarTools>
                <ToolLink> Gather Data </ToolLink>
                <ToolLink> Visualise Data </ToolLink>
         </EiaNavbarTools>
        </EiaToolsWrapper>
    );
  };
  
  export default EiaTools;
  