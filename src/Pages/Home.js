import * as React from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";


const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  height: 100vh;
  mix-blend-mode: exclusion;
`;

const HomeTitle = styled.h2`

`

const Home = () => {
    return (
      <Layout>
        <HomeWrapper>
            <HomeTitle> Bat Spells </HomeTitle>
        </HomeWrapper>
      </Layout>
    );
  };
  
  export default Home;
  