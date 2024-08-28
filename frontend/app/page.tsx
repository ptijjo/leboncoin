"use client"
import { whoConnect } from "@/lib/queryFunction/queryFunction";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token") as string;
    setToken(storedToken);
  }, [token]);


  const { status, data: userData, error } = useQuery({
    queryKey: ['userData'],
    queryFn: async (): Promise<{
      userId: string;
      userPhoto: string;
      userEmail: string;
      userPseudo: string;
      userRole: string
    }> => {
      if (token) {
        return await whoConnect(token);
      }
      throw new Error("Token not available"); null
    },
    enabled: !!token,
  });

  if (status === 'pending') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    // return <span>Error: {error.message}</span>
    return
  }

  if (status === 'success') {
    return (
      <>
      </>
    );
  }
}
