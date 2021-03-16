import React, { useState } from "react";
import styled from "styled-components";
import TerrainEnvironment from "../Environment/TerrainEnvironment";
import TestEnvironment from "../Environment/TestEnvironment";

const EiaToolsWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: red;
  color: black;
`;

const EiaSideNavbarLink = styled.p``;

const EiaSideNavbarText = styled.p``;
const EiaSideNavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  padding: 1rem;
  width: 10%;
  height: 100%;
`;

const ToolsWrapper = styled.section`
  height: 100vh;
  text-align: center;
`;
const ToolWrapper = styled.div`
  display: ${props => (props.isSelected ? "inherit" : "none")};
`;
const EiaToolType = {
  DATA_GATHER: "DATA_GATHER",
  VISUALISE_DATA: "VISUALISE_DATA"
};

const EiaTools = () => {
  const [toolType, setToolType] = useState(EiaToolType.VISUALISE_DATA);

  return (
    <EiaToolsWrapper>
      <ToolsWrapper>
        <ToolWrapper isSelected={toolType === EiaToolType.DATA_GATHER}>
          {/* <EiaSideNavbarText >
            {" "}
            Data Gathering Tool
          </EiaSideNavbarText> */}
          <TestEnvironment />
        </ToolWrapper>
        <ToolWrapper isSelected={toolType === EiaToolType.VISUALISE_DATA}>
          <EiaSideNavbarText
            
          >
            {" "}
            <TerrainEnvironment />
          </EiaSideNavbarText>
        </ToolWrapper>
      </ToolsWrapper>
    </EiaToolsWrapper>
  );
};

export default EiaTools;
