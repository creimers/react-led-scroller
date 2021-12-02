import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Word from "./index";

export default {
  title: "Word",
  component: Word,
} as ComponentMeta<typeof Word>;

const Template: ComponentStory<typeof Word> = () => <Word />;

export const FirstStory = Template.bind({});
FirstStory.storyName = "default";
