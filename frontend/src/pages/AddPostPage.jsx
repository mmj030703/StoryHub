import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toaster from "../components/Toaster";

function AddPostPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [showToaster, setShowToaster] = useState(false);
  const [toasterData, setToasterData] = useState({
    text: "",
    textClass: "",
  });

  function showToast(text, textClass, duration) {
    setShowToaster(true);
    setToasterData({ text, textClass });

    setTimeout(() => {
      setShowToaster(false);
    }, duration);
  }

  function handleDataChange(e) {
    const { name, value, files } = e.target;

    let newState = {};

    if (name !== "image") {
      newState = {
        [name]: value,
      };
    } else {
      newState = {
        [name]: files[0],
      };
    }

    setFormData((prevState) => ({ ...prevState, ...newState }));
  }

  function handleSubmit(e) {
    e?.preventDefault();

    const error = validateFormData(formData);
    if (error) return;

    const data = new FormData();

    for (const [name, value] of Object.entries(formData)) {
      data.append(name, value);
    }

    addPost(data);
  }

  async function addPost(data) {
    setLoader(true);

    try {
      const res = await fetch(
        `https://storyhub-n1ne.onrender.com/api/v1/posts/add`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
          body: data,
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
      console.log(post);

      if (post?.status === "success") {
        showToast("Post Added Successfully !", "text-black", 1000);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      showToast("An error occurred ! Please try again.", "text-red-500", 1000);
    } finally {
      setLoader(false);
    }
  }

  function validateFormData(data) {
    if (!data.title || !data.description || !data.image) {
      showToast("All fields are mandatory !", "text-red-500", 1000);
      return true;
    }

    if (data.title.trim() === "") {
      showToast("Title cannot be empty !", "text-red-400", 1000);
      return true;
    }

    if (data.description.trim() === "") {
      showToast("Description cannot be empty !", "text-red-400", 1000);
      return true;
    }

    if (data.image && data.image.type.split("/")[0] !== "image") {
      showToast("Post image should be image !", "text-red-400", 1000);
      return true;
    }

    if (data.image && data.image.size > 2 * 1024 * 1024) {
      showToast("Post image size can be upto only 2mb !", "text-red-400", 1000);
      return true;
    }

    return false;
  }

  return (
    <section className="px-4 flex flex-col items-center mt-14 mb-14">
      <section className="shadow-2xl w-full min-[600px]:w-fit bg-slate-100 p-4">
        <h1 className="text-[32px] font-bold">Add Post</h1>
        <section className="w-full">
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-y-4 w-full">
            {/* title field */}
            <fieldset className="flex flex-col w-full min-[600px]:w-[500px]">
              <label className="text-[20px] font-semibold">Title</label>
              <input
                type="text"
                value={formData.title}
                name="title"
                onChange={handleDataChange}
                className="text-black text-[17px] rounded-sm px-2 py-1 outline-none mt-1 border-2 border-blue-500"
                autoComplete="off"
              />
            </fieldset>
            {/* description field */}
            <fieldset className="flex flex-col w-full min-[600px]:w-[500px]">
              <label className="text-[20px] font-semibold">Description</label>
              <textarea
                value={formData.description}
                name="description"
                onChange={handleDataChange}
                className="text-black border-2 border-blue-500 resize-none rounded-sm text-[17px] px-2 py-1 outline-none mt-1"
                rows={4}
                autoComplete="off"
              />
            </fieldset>
            {/* postImage field */}
            <fieldset className="flex flex-col w-full min-[600px]:w-[500px]">
              <label className="text-[20px] font-semibold">Post Image</label>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleDataChange}
                className="bg-white resize-none rounded-sm cursor-pointer text-[17px] px-2 py-1 outline-none mt-1"
              />
            </fieldset>
            <article className="flex justify-start gap-x-4">
              <button
                type="submit"
                name="add"
                className="w-full mt-5 flex justify-center items-center
                  font-semibold text-[1.1rem] cursor-pointer text-white bg-blue-500
                  rounded-sm py-[7px]">
                Add Post
                {loader && (
                  <span className="ml-3 animate-spin inline-block w-6 h-6 border-4 border-white border-t-slate-600 rounded-full"></span>
                )}
              </button>
            </article>
          </form>
        </section>
      </section>

      {showToaster && (
        <Toaster text={toasterData.text} textClass={toasterData.textClass} />
      )}
    </section>
  );
}

export default AddPostPage;
