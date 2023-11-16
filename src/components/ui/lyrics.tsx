"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const Lyrics = () => {
  let getLyrics = async () => {
    try {
      const response = await fetch("api/lyrics");
      const data = await response.json();

      // Assuming the structure of the response, you can access the lyrics
      const lyrics = data.lyrics;
      console.log(lyrics);

      return lyrics;
    } catch (error) {
      console.error("Error fetching song lyrics:", error);
      return null;
    }
  };
  return <Button onClick={() => getLyrics()}>Lyrics API</Button>;
};

export default Lyrics;
