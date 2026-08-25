import React from "react";

const Loading = () => {
  return (
    <span className="absolute left-0 bottom-0 h-[2px] w-full overflow-hidden bg-slate-200/50 dark:bg-slate-800/50">
      <span className="block h-full w-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 route-loading-bar" />
    </span>
  );
};

export default Loading;
