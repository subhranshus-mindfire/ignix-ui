import React from "react";

export default function MDXLayout({ children }) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert bg-white text-black dark:bg-gray-900 dark:text-white p-4">                  
      {children}
    </div>
  );
}
