// client gets our data with GraphQL
import { gql } from "@apollo/client";
import client from "client";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import { mapMainMenuItems } from "utils/mapMainMenuItems";

export const getPageStaticProps = async (context) => {
  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";

  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            blocks
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            ctaDestination {
              ... on Page {
                uri
              }
            }
            ctaLabel
            menuItems {
              items {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
              menuItem {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });
  // cleanAndTransformBlocks is defined in utils and it's purpose is to assign ids to every block
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
  return {
    props: {
      callToActionLabel: data.acfOptionsMainMenu.mainMenu.ctaLabel,
      callToActionDestination:
        data.acfOptionsMainMenu.mainMenu.ctaDestination.uri,
      mainMenuItems: mapMainMenuItems(
        data.acfOptionsMainMenu.mainMenu.menuItems
      ),
      blocks,
    },
  };
};
