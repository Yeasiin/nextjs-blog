import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "posts");

export async function getPostFiles() {
  return await fs.readdir(postDirectory);
}

export async function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // remove file extension for slug
  const filePath = path.join(postDirectory, postSlug + ".md");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export async function getAllPosts() {
  const postFiles = await getPostFiles();

  const allAwaitedPost = postFiles.map((postFile) => getPostData(postFile));
  const allPosts = await Promise.all(allAwaitedPost);
  const sortedPost = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );
  return sortedPost;
}

export async function getFeaturedPost() {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.isFeatured);
}
