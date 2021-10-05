import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import contentClasses from "./../styles/postContent.module.css";
import headerClasses from "./../styles/postHeader.module.css";

function PostContent({ post: { slug, image, title, content } }) {
  const imagePath = `/images/posts/${slug}/${image}`;

  const customRenderers = {
    p: (paragraph) => {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <Image
            src={`/images/posts/${slug}/${image.properties.src}`}
            width={600}
            height={300}
            className={contentClasses.image}
            alt={image.properties.alt}
          />
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code: (code) => {
      return (
        <SyntaxHighlighter language={code.language}>
          {code.value}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={contentClasses.content}>
      <div className={headerClasses.header}>
        <h1>{title}</h1>
        <Image src={imagePath} height={250} width={300} alt="" />
      </div>
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
