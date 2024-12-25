"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    //Check user authentication
    const token = localStorage.getItem("token");

    if (!token) {
    //Redirect user to login if not authenticated
router.push("/login")
    } 
  }, [router]);



  return(
        <div>
            Your profile account

        </div>



  );
};

export default DashboardPage;
