"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";

// <Input type="text" placeholder="Search here" value={searchInput} />
// <Button onClick={(e) => void handleSearch(e)}>Search!</Button>

export default function SpeciesSearch({ input }: { input: string }) {
  const router = useRouter();

  //search bar
  // const searchBar = () => {}
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async (e: MouseEvent) => {
    e.preventDefault();
    setSearchInput(input);

    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.from("species").select().textSearch("common_name", searchInput);
    // console.log(input);
    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
    router.refresh();

    return data;

    return toast({
      title: "Searched!.",
      description: "Scoured and searched!",
    });
  };

  return (
    <>
      <Button onClick={(e) => void handleSearch(e)}>Search!</Button>
    </>
  );
}
