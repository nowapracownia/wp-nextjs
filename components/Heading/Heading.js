// to check which props to destructure, we can check the block (or innet block) with console log

import React from "react";
import { getFontSizeForHeading, getTextAlign } from "utils/fonts";

// what we do here: we are creating a new react element, first argument is the tag name, second is props; inside we use dangerouslySetInnerHTML to inject the content into the tag
export const Heading = ({ content, level = 2, textAlign }) => {
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: content },
    className: `font-heading max-w-5xl mx-auto my-5 ${getFontSizeForHeading(
      level
    )} ${getTextAlign(textAlign)}`,
  });
  return tag;
};
