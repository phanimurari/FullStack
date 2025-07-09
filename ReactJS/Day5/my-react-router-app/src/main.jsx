import React from "react";
import { createRoot } from "react-dom/client";
import { startRouter } from "@react-router/dev";
import routes from "./routes";

startRouter({
  routes,
  target: document.getElementById("root"),
});
