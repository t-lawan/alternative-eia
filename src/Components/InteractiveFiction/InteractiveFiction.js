import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { GlobalStyle } from "../Global/global.styles";
import { InteractiveFictionController } from "../../Models/InteractiveFictionController";
import { InteractiveFictionDisplay } from "../../Utility/helper";

export const InteractiveFictionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  height: 100vh;
  
`;

const QuestionWrapper = styled.div`
    width: 100vw;
    height: 10vh;
    background: transparent;
    position: fixed;
    text-align: center;
`;

const Question = styled.h1`

`

const LeftSection = styled.div`
  /* border: 2rem solid red; */
`;

const RightSection = styled.div`
  /* border: 2rem solid yellow; */
`;

const InteractiveFiction = props => {
  const [sceneNumber, setSceneNumber] = useState(0);

  let onSelectDisplay = display => {
    if (display == InteractiveFictionDisplay.LEFT) {
      let nextScene =
        InteractiveFictionController.scenes[sceneNumber].left.link_to_scene;
      if (nextScene !== null) {
        setSceneNumber(nextScene);
      }
    }

    if (display == InteractiveFictionDisplay.RIGHT) {
      let nextScene =
        InteractiveFictionController.scenes[sceneNumber].right.link_to_scene;
      if (nextScene !== null) {
        setSceneNumber(nextScene);
      }
    }
  };

  return (
    <React.Fragment>
      <QuestionWrapper>
        <Question> {InteractiveFictionController.scenes[sceneNumber].general_text}</Question>
      </QuestionWrapper>
      <InteractiveFictionWrapper>
        <LeftSection
          onClick={() => onSelectDisplay(InteractiveFictionDisplay.LEFT)}
        >
          {InteractiveFictionController.getComponent(
            sceneNumber,
            InteractiveFictionDisplay.LEFT
          )}
        </LeftSection>
        <RightSection
          onClick={() => onSelectDisplay(InteractiveFictionDisplay.RIGHT)}
        >
          {InteractiveFictionController.getComponent(
            sceneNumber,
            InteractiveFictionDisplay.RIGHT
          )}
        </RightSection>
      </InteractiveFictionWrapper>
    </React.Fragment>
  );
};

export default InteractiveFiction;
