import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="px-4 py-2 flex justify-between">
      <Link to={"/"}>
        <h1 className="text-3xl font-bold">StoryHub.</h1>
      </Link>
      <Link to={"/posts/add-post"}>
        <button className="bg-blue-600 text-white px-3 py-1 font-semibold rounded-sm cursor-pointer">
          Add Post
        </button>
      </Link>
    </header>
  );
}

export default Header;
