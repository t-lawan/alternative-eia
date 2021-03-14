import React from "react";
import styled from "styled-components";
import { InteractiveFictionSceneModel } from "./InteractiveFictionSceneModel";
import { NarrativeModel } from "./NarrativeModel";
import HAM from "../Assets/Images/HAM_THE_CHIMP.jpg";
import YURI from "../Assets/Images/YURI_GAGARIN.jpg";
import PAPRIKA from "../Assets/Images/PAPRIKA.jpg";
import {
  NarrativeModelType,
  InteractiveFictionDisplay
} from "../Utility/helper";

const TextWrapper = styled.div`
  background: ${props => props.bgColour};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  :hover {
    background: red;
  }
`;
const ImageWrapper = styled.div`
  background: ${props => props.bgColour};
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  :hover {
    background: red;
  }
`;
const Image = styled.img`
  height: 80%;
  padding: 1rem;
`;

export class InteractiveFictionController {
  static scenes = [
    new InteractiveFictionSceneModel(
      0,
      "Long, long ago there lived in a famous town a woman named *** and her partner ^^^. There was a drought in their suburb and they had to give an offering to ?",
      new NarrativeModel(0, NarrativeModelType.IMAGE, YURI, null, null, 1),
      new NarrativeModel(1, NarrativeModelType.TEXT, "Yemaja", null, null, 2)
    ),

    // Crushed for YURI
    new InteractiveFictionSceneModel(
      1,
      "They crushed ...",
      new NarrativeModel(
        2,
        NarrativeModelType.TEXT,
        "Lemon Grass",
        null,
        null,
        3
      ),
      new NarrativeModel(3, NarrativeModelType.IMAGE, PAPRIKA, null, null, 2)
    ),
    // Crushed For Yemaja
    new InteractiveFictionSceneModel(
      2,
      "They drank?",
      new NarrativeModel(4, NarrativeModelType.TEXT, "Water", null, null, 4),
      new NarrativeModel(5, NarrativeModelType.TEXT, "Orijin", null, null, 3)
    ),

    // 
    new InteractiveFictionSceneModel(
      3,
      "They ate?",
      new NarrativeModel(6, NarrativeModelType.TEXT, "Leaves", null, null, 0),
      new NarrativeModel(7, NarrativeModelType.TEXT, "Roots", null, null, 2)
    ),
    //
    new InteractiveFictionSceneModel(
      4,
      "They caught?",
      new NarrativeModel(8, NarrativeModelType.TEXT, "Haddock", null, null, 0),
      new NarrativeModel(9, NarrativeModelType.TEXT, "Plastic Squid", null, null, 1)
    ),
  ];

  static getComponent = (index, screen) => {
    let scene = InteractiveFictionController.scenes[index];
    let component;
    switch (screen) {
      case InteractiveFictionDisplay.LEFT:
        component = InteractiveFictionController.getComponentBasedOnType(
          scene.left
        );
        break;
      case InteractiveFictionDisplay.RIGHT:
        component = InteractiveFictionController.getComponentBasedOnType(
          scene.right
        );
        break;
      default:
        break;
    }

    return component;
  };

  static getComponentBasedOnType = display => {
    let component;
    switch (display.type) {
      case NarrativeModelType.TEXT:
        component = (
          <TextWrapper bgColour={display.background_colour}>
            <p> {display.text} </p>
          </TextWrapper>
        );
        break;
      case NarrativeModelType.IMAGE:
        component = (
          <ImageWrapper bgColour={display.background_colour}>
            <Image src={display.text} />
          </ImageWrapper>
        );
        break;
      case NarrativeModelType.VIDEO:
        component = (
          <TextWrapper bgColour={display.background_colour}>
            <p> VIDEO </p>
          </TextWrapper>
        );
        break;
      default:
        break;
    }
    return component;
  };
}
