import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";

const PostPage = lazy(() => import("./pages/PostPage.jsx"));
const AddPostPage = lazy(() => import("./pages/AddPostPage.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/posts/:postId",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <PostPage />
          </Suspense>
        ),
      },
      {
        path: "/posts/add-post",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <AddPostPage />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>
  </StrictMode>
);
