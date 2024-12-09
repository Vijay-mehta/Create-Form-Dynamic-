"use client";
import React, { useState, useEffect } from "react";
import * as resource from "../../../config/list";
import List from "@/components/Master/List";
import { useRouter } from "next/navigation";

const Page = ({ params }: any) => {
  const { slug } = React.use(params);
  const column = resource[slug];

  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsopen] = useState<Boolean>(false);
  const router = useRouter();
  const fetchData = async () => {
    try {
      let apiUrl = "";
      if (slug === "category") {
        apiUrl = "http://localhost:8080/api/category";
      } else if (slug === "subcategory") {
        apiUrl = "https://fakestoreapi.com/products";
      } else if (slug === "post") {
        apiUrl = "https://jsonplaceholder.typicode.com/posts";
      }else if(slug ==="albumb"){
        apiUrl="https://jsonplaceholder.typicode.com/albums"
      }

      const response = await fetch(apiUrl);
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlDelete = async (id: number) => {
    try {
      let apiUrl = `http://localhost:8080/api/category/${id}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      const result = await response.json();
      console.log("Delete Category Result:", result);

      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/form/${slug}?id=${id}`);
  };

  const handleDelete = (id: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (isConfirmed) {
      handlDelete(id);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  const handleOpenPopupe = () => {
    router.push(`/form/${slug}`);
  };
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!column) {
    return <div>Content not found for the slug: {slug}</div>;
  }

  return (
    <div>
      <div className=" flex  justify-between  mx-8 p-3">
        <h1 className=" text-2xl font-bold">
          {slug.charAt(0).toUpperCase() + slug.slice(1)} List
        </h1>
        <button
          onClick={handleOpenPopupe}
          className=" bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add {slug.charAt(0).toUpperCase() + slug.slice(1)}
          
        </button>

       
      </div>

      <List
        columns={column}
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Page;
