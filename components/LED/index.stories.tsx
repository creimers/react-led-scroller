import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import LED from "./index";

export default {
  title: "LED",
  component: LED,
} as ComponentMeta<typeof LED>;

const Template: ComponentStory<typeof LED> = (args) => <LED {...args} />;

export const FirstStory = Template.bind({});
FirstStory.storyName = "default";
