import Image from "next/image";
import Link from "next/link";
import classes from "./../styles/postItem.module.css";

function PostItem({ post }) {
  const { title, image, excerpt, date, slug } = post;

  const formattedDate = new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <li className={classes.post}>
      <Link href={`/posts/${slug}`}>
        <a>
          <div className={classes.image}>
            <Image
              src={imagePath}
              width={300}
              height={200}
              layout="responsive"
              alt=""
            />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default PostItem;
