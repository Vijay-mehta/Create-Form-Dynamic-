"use client";
import React, { useState } from "react";
import Form from "@/components/Master/Form";
import * as resource from "../../../config/form";
import { useRouter } from "next/navigation";

const Page = ({ params }: any) => {
  const { slug } = React.use(params);
  const column = resource[slug];
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleChange = (newData: any) => {
    setData(newData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let apiUrl = "";
      if (slug === "category") {
        apiUrl = "http://localhost:8080/api/category";
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const result = await response.json();
      router.push("/list/category");
      console.log("Category Created:", result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!column) {
    return <div>Content not found for the slug: {slug}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className=" text-center mt-10 text-2xl  font-bold">
        {slug.charAt(0).toUpperCase() + slug.slice(1)} Form
      </h1>
      <Form
        column={column}
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Page;
