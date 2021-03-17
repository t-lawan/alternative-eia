import styled, { createGlobalStyle } from "styled-components";
import NHaasGroteskDSPro from "../../Assets/Fonts/NHaasGroteskDSPro-55Rg.ttf";
import AvaraBoldItalic from "../../Assets/Fonts/Avara-BoldItalic.woff";
import AvaraBold from "../../Assets/Fonts/Avara-Bold.woff";
export const size = {
  mobileS: "320px",
  mobileM: "420px",
  mobileL: "520px",
  mobileSL: "568px",
  mobileXL: "736px",
  tablet: "768px",
  tabletL: "1023px",
  laptop: "1024px",
  laptopM: "1124px",
  laptopL: "1400px",
  desktopS: "1600px",
  desktopM: "1900px",
  desktop: "2260px"
};

export const Colours = {
  purple: "#a841f4",
  yellow: "#E4EE3F",
  grey: "#CCD6D7",
  dark_grey: "	#707070",
  green: "hsl(115, 100%, 42%)",
  environment_background: "#BABAB8"
};

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: AvaraBold;
    src: url(${AvaraBoldItalic});
    font-weight: bold;
    font-style: italic;
}
@font-face {
    font-family: AvaraBold;
    src: url(${AvaraBold});
    font-weight: bold;
}

  * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    ::-webkit-scrollbar {
    width: 10px;
    @media (max-width: ${size.tablet}) {
      width: 7px;
    }
overflow-y: hidden;

  }
  ::-webkit-scrollbar-thumb {
    background: ${Colours.dark_grey};
  }
    }

html, body {
  margin: 0;
  font-family:AvaraBold;
  cursor: crosshair;
  background: ${Colours.grey};
  width: 100%;
  -webkit-font-smoothing: antialiased;
}
h1,h2,h3,h4,h5,h6 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    font-weight: 100;
    color: ${Colours.dark_grey};
    }
  a {
    text-decoration: underline;
    color: black;
    font-weight: 100 !important;
  }
  h1 {
  margin-bottom: 1.45rem;
  font-size: 2.5rem;
  line-height: 1.1;
  @media (max-width: ${size.tabletL}) {
    font-size: 2rem;

  }
}
h2 {
  margin-bottom: 1.45rem;
  font-size: 1.62671rem;
  line-height: 1.1;
}
h3 {
  margin-bottom: 1.45rem;
  font-size: 1.38316rem;
  line-height: 1.1;
}
h4 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  line-height: 1.1;
  word-break: break-all; 
}
h5 {
  margin-bottom: 1.45rem;
  font-size: 0.85028rem;
  line-height: 1.1;
}
h6 {
  margin-bottom: 1.45rem;
  font-size: 0.78405rem;
}
img {
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  margin-bottom: 1.45rem;
}
p, li, a, span{
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0.5rem;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  ${"" /* font-size: 1.5rem  !important; */}
  line-height: 1.3;
  font-weight: 100 !important;
  @media (max-width: ${size.tabletL}) {
    font-size: 1rem  !important;

  }
}

p {
  line-height: 1.35;
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
  
}


`;

export const TwoColumnSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  /* grid-column-gap: 1rem; */
  height: 100vh;
`;
