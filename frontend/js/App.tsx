import * as Sentry from "@sentry/react";
import cookie from "cookie";
import { OpenAPI } from "./api";
import Home from "./pages/Home";
import {Outlet} from "react-router-dom";

OpenAPI.interceptors.request.use((request) => {
  const { csrftoken } = cookie.parse(document.cookie);
  if (request.headers && csrftoken) {
    request.headers["X-CSRFTOKEN"] = csrftoken;
  }
  return request;
});

const App = () => (

    <Outlet/>

);

export default App;
