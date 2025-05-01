import { LoaderIcon } from "lucide-react";
import React from "react";
import { UseThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = UseThemeStore();
  return (
    <div className="min-h-screen flex items-center justify-center" data-theme={theme}>
      <LoaderIcon className="animate-spin size-10 text-primary" />
    </div>
  );
};

export default PageLoader;
