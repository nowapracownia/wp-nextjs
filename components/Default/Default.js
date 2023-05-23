import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const Default = ({ content = "" }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }}
    />
  );
};
