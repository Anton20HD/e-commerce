"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import styles from "@/app/search/page.module.scss";
import noResultsImage from "@/app/assets/search-no-results.png";
import Link from "next/link";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className={styles.searchPageContainer}>
      <img src={noResultsImage.src} alt="" />
      <div className={styles.contentWrapper}>
        <h1 className={styles.searchPageTitle}>No Results Found</h1>
        <div className={styles.searchPageContent}>
          <p className={styles.noResultsText}>
            Sorry, we couldn't find any results for "
            <span className={styles.searchQueryWord}>{query}</span>".
          </p>
          <p className={styles.noResultsText}>
            Please try searching with a different term.
          </p>
          <div className={styles.buttonContent}>
            <Link href="/">
              <button className={styles.searchPageButton}>
                Go to HomePage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
