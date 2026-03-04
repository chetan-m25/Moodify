import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/home/pages/Home";
import UploadSong from "./features/home/pages/UploadSong";
import MainLayout from "./features/shared/layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <MainLayout>
          <Home />
        </MainLayout>
      </Protected>
    ),
  },
  {
    path: "/upload",
    element: (
      <Protected>
        <MainLayout>
          <UploadSong />
        </MainLayout>
      </Protected>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
