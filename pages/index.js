import Head from "next/head";
import Hero from "./../components/Hero";
import FeaturedPost from "./../components/FeaturedPost";
import { getFeaturedPost } from "../utils/postUtils";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Yeasin&rsquo;s Blog</title>
        <meta
          name="description"
          content="I blog About Web
        Development & UI/UX"
        />
      </Head>
      <Hero />
      <FeaturedPost posts={posts} />
    </>
  );
}

export async function getStaticProps() {
  const featuredPost = await getFeaturedPost();
  return {
    props: {
      posts: featuredPost,
    },
    revalidate: 60 * 60 * 12,
  };
}
