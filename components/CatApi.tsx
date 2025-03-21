"use client";
import React from "react";
import apiClient from "@/libs/api";
import { useState } from "react";

export default function CatApi() {
  // https://meowfacts.herokuapp.com/
  //{"data":["All cats have three sets of long hairs that are sensitive to pressure - whiskers, eyebrows,and the hairs between their paw pads."]}
  const [fact, setFact] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getFact = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.get("https://meowfacts.herokuapp.com/");
      const fact = data.data[0];
      setFact(data.data);
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <>
      <p></p>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={getFact}
      >
        Get Fact
      </button>

      <h4>{isLoading ? "Loading..." : fact}</h4>
    </>
  );
}
