"use client";
import React, { useEffect, useState } from "react";
import Form from "@/components/Master/Form";
import * as resource from "../../../config/form";
import { useRouter,useSearchParams  } from "next/navigation";

const Page = ({ params }: any) => {
  const { slug } = React.use(params);
  const column = resource[slug];
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [edit,setEdit] =useState<any>([])
  const router = useRouter();
  const searchParams = useSearchParams()
 
  const search = searchParams.get('id')
console.log("edit",edit)

  const fetchData = async () => {
    try {
      let apiUrl = "";
     
        apiUrl = `http://localhost:8080/api/category/${search}`;
      

      const response = await fetch(apiUrl);
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (err: any) {
      setError(err.message);
    }
  };
  useEffect(()=>{
    
    fetchData()
    
  },[])
  // const { id } = query;
  // console.log("ee",query)
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
   <>
    <button
          onClick={() => router.push(`/list/${slug}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md   ml-10 mt-3"
        >
          Back
        </button>
      <div className=" flex  justify-center  ">
     
        <h1 className=" text-2xl font-bold">
          {slug.charAt(0).toUpperCase() + slug.slice(1)} Form
        </h1>
   
    




      <Form
        column={column}
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
    </>
  );
};

export default Page;
