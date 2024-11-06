import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./components/Root";
import Login from "./components/Login (unused)";
import Movies from "./components/Movies/Movies";
import AllMovies from "./components/Movies/AllMovies";
import AddMovie from "./components/Movies/AddMovie";
import EditMovie from "./components/Movies/EditMovie";
import Subscriptions from "./components/Movies/Subscriptions";
import AllMembers from "./components/Members/AllMembers";
import AddMember from "./components/Members/AddMember";
import EditMember from "./components/Members/EditMember";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
      path: "addMovie",
      element: <AddMovie /> 
      },
      {path: "editMovie",
      element: <EditMovie />}
       ,
      {
        path: "subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "allmembers",
        element: <AllMembers />,
      },
      {
        path: "addmember",
        element: <AddMember />,
      },
      {
        path: "editmember",
        element: <EditMember />,
      },
      {
        path: "movies",
        element: <Movies />,
        children: [
          {
            path: "allMovies",
            element: <AllMovies />,
          },
          // {
          //   path: "addMovie",
          //   element: <AddMovie />,
          // },
          // {
          //   path: "editMovie",
          //   element: <EditMovie />,
          // },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
