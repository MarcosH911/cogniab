"use client";

import createCheckout from "@/actions/stripe/createCheckout";
import { Button } from "./ui/button";
import { useTransition } from "react";
import LoaderWrapper from "./LoaderWrapper";
import redirectToError from "@/actions/redirectToError";

interface CheckoutButtonProps {
  children?: React.ReactNode;
  priceId: string;
  className?: string;
}

export default function CheckoutButton({
  children,
  priceId,
  className,
}: CheckoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    startTransition(async () => {
      const { url, error } = await createCheckout({
        mode: "subscription",
        priceId,
        successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/app/success`,
        cancelUrl: window.location.href,
      });

      if (error || !url) {
        return redirectToError("Failed to create checkout session");
      }

      window.location.href = url;
    });
  };

  return (
    <Button onClick={handleCheckout} className={className}>
      <LoaderWrapper loading={isPending}>{children}</LoaderWrapper>
    </Button>
  );
}
