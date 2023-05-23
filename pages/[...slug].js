import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/BlockRenderer";
import { getPageStaticProps } from "utils/getPageStaticProps";
import { Page } from "components/Page";

export default Page;

// getStaticProps is necessary
export const getStaticProps = getPageStaticProps;

// the below function is something Next.js expects to exist
export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query AllPagesQuery {
        pages {
          nodes {
            uri
          }
        }
      }
    `,
  });

  return {
    paths: data.pages.nodes
      .filter((page) => page.uri !== "/")
      .map((page) => ({
        params: {
          slug: page.uri.substring(1, page.uri.length - 1).split("/"), // trimming first and last slash and create an array by remaining slashes, so for example '/buying/all-properties/' will give us ['buying', 'all-properties']
        },
      })),
    // fallback is necessary
    fallback: "blocking",
  };
};
