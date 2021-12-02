import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Ticker from "./index";

export default {
  title: "Ticker",
  component: Ticker,
} as ComponentMeta<typeof Ticker>;

const Template: ComponentStory<typeof Ticker> = () => <Ticker />;

export const FirstStory = Template.bind({});
FirstStory.storyName = "default";
