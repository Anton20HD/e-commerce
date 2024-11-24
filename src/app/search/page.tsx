"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div>
      <h1>No Results Found</h1>
      <p>
        Sorry, we couldn't find any results for "<strong>{query}</strong>"
      </p>
      <p>Please try searching with a different term.</p>
    </div>
  );
};

export default SearchPage;
