import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Skill from "../pages/skill/Skill";
import Blog from "../pages/blog/Blog";
import AddProject from "../pages/project/AddProject";
import LoginPage from "../pages/login/Login";
import AddExperience from "../pages/experience/AddExperience";
import PrivateRoute from "../PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <div />,
      },
      {
        path: "/skill",
        element: <Skill />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/project",
        element: <AddProject />,
      },
      {
        path: "/experience",
        element: <AddExperience />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
