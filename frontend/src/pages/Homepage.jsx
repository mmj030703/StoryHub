import { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import Shimmer from "../components/Shimmer";

function Homepage() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const res = await fetch(
      "https://storyhub-n1ne.onrender.com/api/v1/posts/all-posts"
    );
    const postsRes = await res.json();

    setPosts(postsRes.data);
  }

  if (!posts) {
    return <Shimmer itemsLength={5} classes={"bg-slate-400 h-[380px]"} />;
  }

  return (
    <section
      className={`
        px-4 mt-6 mb-6 gap-x-4 gap-y-5 ${
          posts && posts.length > 3
            ? "grid max-[550px]:place-items-center grid-cols-[repeat(auto-fit,minmax(1fr,1fr))] min-[550px]:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
            : "grid max-[550px]:place-items-center min-[550px]:grid-cols-[repeat(auto-fit,minmax(250px,300px))]"
        }
      `}>
      {posts &&
        posts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
    </section>
  );
}

export default Homepage;
