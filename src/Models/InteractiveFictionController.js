import React from "react";
import styled from "styled-components";
import { InteractiveFictionSceneModel } from "./InteractiveFictionSceneModel";
import { NarrativeModel } from "./NarrativeModel";
import {
  NarrativeModelType,
  InteractiveFictionDisplay
} from "../Utility/helper";

const TextWrapper = styled.div`
  background: ${props => props.bgColour};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  :hover {
    background: red;
  }
`;

export class InteractiveFictionController {
  static scenes = [
    new InteractiveFictionSceneModel(
      0,
      "Are you a living thing?",
      new NarrativeModel(0, NarrativeModelType.TEXT, "YES", null, null, 1),
      new NarrativeModel(1, NarrativeModelType.TEXT, "NO", null, null, 2)
    ),
    new InteractiveFictionSceneModel(
      1,
      "Are you an animal",
      new NarrativeModel(2, NarrativeModelType.TEXT, "YES", null, null, 0),
      new NarrativeModel(3, NarrativeModelType.TEXT, "NO", null, null, 2)
    ),
    new InteractiveFictionSceneModel(
      2,
      "Are you bigger than stone?",
      new NarrativeModel(4, NarrativeModelType.TEXT, "YAH", null, null, 0),
      new NarrativeModel(5, NarrativeModelType.TEXT, "NAY", null, null, null)
    )
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
          <TextWrapper>
            <p> IMAGE </p>
          </TextWrapper>
        );
        break;
      case NarrativeModelType.VIDEO:
        component = (
          <TextWrapper>
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
