import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: HomeRedirect,
});

function HomeRedirect() {
  useEffect(() => {
    window.location.href = "/ahlah/index.html";
  }, []);

  return null;
}