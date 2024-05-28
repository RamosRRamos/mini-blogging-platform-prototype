import * as Sentry from "@sentry/browser";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import App from "./App";
import "../sass/style.scss";
import Navbar_Project from "components/Navbar_Project";
import Footer from "components/Footer";
import Blog from "pages/Blog";
import About from "pages/About";
import Home from "pages/Home";

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

const root = createRoot(document.getElementById("react-app") as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Navbar_Project />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);
