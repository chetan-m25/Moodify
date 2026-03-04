import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import "./features/shared/styles/global.scss";
import { AuthProvider } from "./features/auth/context/auth.context";
import { SongContextProvider } from "./features/home/context/song.context";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />
      </SongContextProvider>
    </AuthProvider>
  );
};

export default App;
