import * as Sentry from "@sentry/browser";
import cookie from "cookie";
import React from "react";
import "../sass/style.scss";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { OpenAPI } from "api";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import About from "pages/About";
import Blog from "pages/Blog";
import Home from "pages/Home";
import Login from "pages/Login";
import Profile from "pages/Profile";
import Logout from "pages/Logout";
import Posts_Manage from "pages/Posts_Manage";
import SignUp from "pages/SignUp";

OpenAPI.interceptors.request.use((request) => {
  const cookies = cookie.parse(document.cookie);
  const { csrftoken } = cookies;
  let user;
  if (request.headers && csrftoken) {
    request.headers["X-CSRFTOKEN"] = csrftoken;
    user = localStorage.getItem("token");
    if (user) {
      request.headers.Authorization = `${user}`;
    }
  } else {
    console.warn("CSRF Token not found or request headers are undefined");
  }
  return request;
});

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

const AppWrapper = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/";
  const isLogoutRoute = location.pathname === "/logout";
  const isSignUpRoute = location.pathname === "/signup";

  return (
    <>
      {!isLoginRoute && !isLogoutRoute && !isSignUpRoute && <Navbar />}
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Logout />} path="/logout" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<Home />} path="home" />
        <Route element={<Posts_Manage />} path="posts_manage" />
        <Route element={<Profile />} path="profile/:userSlug" />
        <Route element={<About />} path="about" />
        <Route element={<Blog />} path="blog" />
      </Routes>
      <Footer />
    </>
  );
};

const root = createRoot(document.getElementById("react-app") as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <AppWrapper />
    </Router>
  </React.StrictMode>,
);
