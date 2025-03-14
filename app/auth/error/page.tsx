"use client";
import ErrorCard from "@/components/auth/errorcard";
import React from "react";

const ErrorPage = ({ error }: { error: string }) => {
  return (
    <div>
      <ErrorCard />
      <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
        {error || "An unknown error occurred."}
      </p>
    </div>
  );
};

export default ErrorPage;
