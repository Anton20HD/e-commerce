"use client";

import React,{useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import styles from '@/app/success/page.module.scss';

const Success = () => {
    const router = useRouter();

    useEffect(() => {
        const fetchSessionAndStoreOrder = async () => {
            const sessionId = new URLSearchParams(window.location.search).get("session_id");

            if(!sessionId) {
                return router.push("/checkout");
            }

            const response = await fetch(`/api/stripe-session?session_id=${sessionId}`);
            const session = await response.json();
            
            const cart = JSON.parse(session.metadata.cart || "[]");

            // store guest order in ls if no user is logged in
            if(!session.customer_email) {
                localStorage.setItem("guestOrder", JSON.stringify(cart));
            }

    }

    fetchSessionAndStoreOrder();
            }, []);


  return (
    <div>Success</div>
  )
}

export default Success;
