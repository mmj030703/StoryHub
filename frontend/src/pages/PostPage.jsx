import { useEffect, useState } from "react";
import PostView from "../components/PostView";
import { useParams } from "react-router-dom";
import Toaster from "../components/Toaster.jsx";
import ShimmerItem from "../components/ShimmerItem.jsx";

function PostPage() {
  const [post, setPost] = useState();
  const { postId } = useParams("postId");
  const [showToaster, setShowToaster] = useState(false);
  const [toasterData, setToasterData] = useState({
    text: "",
    textClass: "",
  });

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

  function showToast(text, textClass, duration) {
    setShowToaster(true);
    setToasterData({ text, textClass });

    setTimeout(() => {
      setShowToaster(false);
    }, duration);
  }

  return (
    <section className="px-4 flex justify-center mt-10 mb-10">
      {post && <PostView post={post} showToast={showToast} />}
      {showToaster && (
        <Toaster text={toasterData.text} textClass={toasterData.textClass} />
      )}
      {!post && (
        <ShimmerItem
          classes={"bg-slate-400 h-[450px] w-full min-[700px]:w-[650px]"}
        />
      )}
    </section>
  );
}

export default PostPage;
