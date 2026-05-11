
import React from "react";

export default function Pagination({ currentPage, totalPages, setSearchParams }) {

  const getDesktopPageNumbers = () => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range = [];
    const left = Math.max(2, currentPage - 2);
    const right = Math.min(totalPages - 1, currentPage + 2);

    range.push(1);
    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) range.push("...");
    range.push(totalPages);

    return range;
  };

  const getMobilePageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const range = [];
    if (currentPage <= 3) {
      range.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      range.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      range.push(1, "...", currentPage, "...", totalPages);
    }
    return range;
  };

  const updatePage = (newPage) => {
    if (newPage === "..." || newPage < 1 || newPage > totalPages) return;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage);
      return params;
    });
  };

  const renderPages = (pagesArr, hiddenClasses) => (
    <div className={`-mt-px ${hiddenClasses} justify-center text-md`}>
      {pagesArr.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex items-center border-t-2 border-transparent px-2 sm:px-4 pt-4 text-xs sm:text-sm md:text-md font-medium text-slate-500"
            >
              ...
            </span>
          );
        }

        const isActive = currentPage === page;

        return (
          <button
            key={`page-${index}-${page}`}
            onClick={() => updatePage(page)}
            className={`inline-flex items-center border-t-2 px-3 sm:px-4 pt-4 text-sm font-medium cursor-pointer transition-colors ${isActive
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:border-slate-500 hover:text-slate-200"
              }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );

  return (
    <nav className="flex items-center justify-between border-t border-slate-800 px-2 sm:px-4 py-4 w-full mt-8">
      <div className="flex w-0 flex-1 z-10">
        <button
          disabled={currentPage <= 1}
          onClick={() => updatePage(currentPage - 1)}
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-md font-medium text-slate-400 hover:border-slate-500 hover:text-slate-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer transition-colors"
        >
          <span className="mr-1 sm:mr-3" aria-hidden="true">&larr;</span>
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden inline">Prev</span>
        </button>
      </div>

      <div className="flex-shrink-0">
        {renderPages(getMobilePageNumbers(), "flex sm:hidden")}
        {renderPages(getDesktopPageNumbers(), "hidden sm:flex")}
      </div>

      <div className="flex w-0 flex-1 justify-end z-10">
        <button
          disabled={currentPage >= totalPages}
          onClick={() => updatePage(currentPage + 1)}
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-md font-medium text-slate-400 hover:border-slate-500 hover:text-slate-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden inline">Next</span>
          <span className="ml-1 sm:ml-3" aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </nav>
  );
}