import { Link } from "react-router-dom";

function PostItem({ post }) {
  const { _id, title, description, imageSrc } = post;

  return (
    <Link to={`/posts/${_id}`}>
      <article
        className="rounded-md shadow-2xl cursor-pointer"
        title="Click to view">
        <figure>
          <img
            src={imageSrc}
            alt="Post"
            className="w-full h-96 rounded-x-md rounded-t-md"
          />
        </figure>
        <article className="p-2">
          <h2 className="text-lg font-semibold" title={title}>
            {title.length > 30 ? title.slice(0, 30) + "..." : title}
          </h2>
        </article>
      </article>
    </Link>
  );
}

export default PostItem;
