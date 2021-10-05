import Head from "next/head";
import PostContent from "../../components/PostContent";
import { getPostData, getPostFiles } from "./../../utils/postUtils";

export default function SinglePostPage({ post }) {
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { postSlug } = params;
  const post = await getPostData(postSlug);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const postFileName = await getPostFiles();

  const paths = postFileName.map((filename) => {
    filename = filename.replace(/\.md$/, "");
    return { params: { postSlug: filename } };
  });

  return {
    paths,
    fallback: false,
  };
}
