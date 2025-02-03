import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PostView({ post, showToast }) {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const { title, description, imageSrc, createdAt, _id } = post;

  function giveFormattedDate(dateString) {
    const date = new Date(dateString);
    const months = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };

    return `${date.getDate()} ${
      months[date.getMonth()]
    }, ${date.getFullYear()}`;
  }

  async function handleDelete(e) {
    try {
      setLoader(true);

      const res = await fetch(
        `https://storyhub-n1ne.onrender.com/api/v1/posts/delete/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (!res) {
        showToast(
          "An error occurred ! Please try again.",
          "text-red-500",
          1000
        );
        return;
      }

      const post = await res.json();

      if (post?.status === "success") {
        showToast("Post Deleted !", "text-black", 1000);

        setTimeout(() => {
          navigate(`/`);
        }, 1000);
      }
    } catch (error) {
      showToast("An error occurred ! Please try again.", "text-red-500", 1000);
    } finally {
      setLoader(false);
    }
  }

  return (
    <article className="rounded-md shadow-2xl min-w-[650px]:min-w-[600px]">
      <article className="flex gap-x-3 flex-col min-[650px]:flex-row">
        <figure>
          <img
            src={imageSrc}
            alt="Post"
            className="w-full h-[450px] rounded-t-md min-w-[650px]:rounded-s-md"
          />
        </figure>
        <article className="px-2 pt-2 pb-3 flex-1">
          <h2 className="text-2xl font-semibold py-1 max-w-[400px]">{title}</h2>
          <article className="mt-3 bg-slate-300 px-2 rounded-md space-y-1 pt-1 pb-2">
            <p className="text-[15px] mt-1 font-semibold">
              {giveFormattedDate(createdAt)}
            </p>
            <p className="max-w-[400px]">{description}</p>
          </article>

          <article className="mt-3 flex gap-x-3">
            <Link
              to={`/posts/update?id=${_id}&title=${title}&description=${description}`}>
              <button className="bg-blue-600 text-white px-3 py-1 font-semibold rounded-sm cursor-pointer">
                Update
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center bg-blue-600 text-white px-3 py-1 font-semibold rounded-sm cursor-pointer">
              Delete
              {loader && (
                <span className="ml-3 animate-spin inline-block w-4 h-4 border-4 border-white border-t-slate-600 rounded-full"></span>
              )}
            </button>
          </article>
        </article>
      </article>
    </article>
  );
}

export default PostView;
