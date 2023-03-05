import { createBrowserRouter } from "react-router-dom";
import { AnimalInfo } from "./AnimalInfo";
import { Animals } from "./animals";
import App from "./App";
import HomePage from "./HomePage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
      {
        path: "/animals",
        element: <Animals />,
      },
      {
        path: "/animal/:id",
        element: <AnimalInfo />,
      },
    ],
  },
]);
