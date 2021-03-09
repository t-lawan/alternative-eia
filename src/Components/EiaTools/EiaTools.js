import React, { useState } from "react";
import styled from "styled-components";
import TerrainEnvironment from "../Environment/TerrainEnvironment";

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
  background: yellow;
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
  const [toolType, setToolType] = useState(EiaToolType.DATA_GATHER);

  return (
    <EiaToolsWrapper>
      <EiaSideNavbarWrapper>
        <EiaSideNavbarLink onClick={() => setToolType(EiaToolType.DATA_GATHER)}>
          {" "}
          Gather Data{" "}
        </EiaSideNavbarLink>
        <EiaSideNavbarLink
          onClick={() => setToolType(EiaToolType.VISUALISE_DATA)}
        >
          {" "}
          Visualise Data{" "}
        </EiaSideNavbarLink>
      </EiaSideNavbarWrapper>
      <ToolsWrapper>
        <ToolWrapper isSelected={toolType === EiaToolType.DATA_GATHER}>
          {/* <EiaSideNavbarText >
            {" "}
            Data Gathering Tool
          </EiaSideNavbarText> */}
          <TerrainEnvironment />
        </ToolWrapper>
        <ToolWrapper isSelected={toolType === EiaToolType.VISUALISE_DATA}>
          <EiaSideNavbarText
            
          >
            {" "}
            Data Visualisation Tool
          </EiaSideNavbarText>
        </ToolWrapper>
      </ToolsWrapper>
    </EiaToolsWrapper>
  );
};

export default EiaTools;
