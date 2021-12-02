import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import LetterEditor from "./index";

export default {
  title: "LetterEditor",
  component: LetterEditor,
} as ComponentMeta<typeof LetterEditor>;

const Template: ComponentStory<typeof LetterEditor> = (args) => (
  <LetterEditor {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.storyName = "default";
