import * as React from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import InteractiveFiction from "../Components/InteractiveFiction/InteractiveFiction";


const StoriesWrapper = styled.div`
`;

const Stories = () => {
    return (
      <Layout>
        <StoriesWrapper>
            <InteractiveFiction />
        </StoriesWrapper>
      </Layout>
    );
  };
  
  export default Stories;
  