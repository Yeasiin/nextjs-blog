import Head from "next/head";
import PostsGrid from "../../components/PostsGrid";
import { getAllPosts } from "./../../utils/postUtils";
import classes from "./../../styles/allPosts.module.css";

export default function AllPostPage({ posts }) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="All Post Section " />
      </Head>
      <section className={classes.posts}>
        <h1>All Posts</h1>
        <PostsGrid posts={posts} />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
    revalidate: 60 * 60 * 12,
  };
}
