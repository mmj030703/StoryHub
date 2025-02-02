import { useEffect, useState } from "react";
import PostView from "../components/PostView";
import { useParams } from "react-router-dom";

function PostPage() {
  const [post, setPost] = useState();
  const { postId } = useParams("postId");

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    const res = await fetch(
      `https://storyhub-n1ne.onrender.com/api/v1/posts/post/${postId}`
    );
    const postRes = await res.json();

    setPost(postRes.data);
  }

  return (
    <section className="flex flex-col items-center mt-10 mb-10">
      {post && <PostView post={post} />}
    </section>
  );
}

export default PostPage;
