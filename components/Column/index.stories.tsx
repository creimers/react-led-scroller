import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Column from "./index";

export default {
  title: "Column",
  component: Column,
} as ComponentMeta<typeof Column>;

const Template: ComponentStory<typeof Column> = (args) => <Column {...args} />;

export const FirstStory = Template.bind({});
FirstStory.storyName = "default";
