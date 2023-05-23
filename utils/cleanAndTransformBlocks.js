import { v4 as uuid } from "uuid";

export const cleanAndTransformBlocks = (blocksJSON) => {
  // first we take our GraphQL query result object, stringify it and parse back to JSON to be able to modify it; it's because we're working with Apollo and with memory cache
  const blocks = JSON.parse(JSON.stringify(blocksJSON));

  // Now we assign the id to every block
  const assignIds = (b) => {
    b.forEach((block) => {
      block.id = uuid();
      if (block.innerBlocks.length) {
        // we're using a recursive function here, meaning that a function will run itself
        assignIds(block.innerBlocks);
      }
    });
  };

  assignIds(blocks);

  return blocks;
};
