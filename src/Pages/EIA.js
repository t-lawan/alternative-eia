import * as React from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import EiaTools from "../Components/EiaTools/EiaTools";


const EIAWrapper = styled.div`
`;

const EIA = () => {
    return (
      <Layout>
        <EIAWrapper>
            <EiaTools />
        </EIAWrapper>
      </Layout>
    );
  };
  
  export default EIA;
  