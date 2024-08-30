"use client"
import { getAllArticle, selectArticle, selectArticleStatus } from "@/lib/features/article/articleSlice";
import { Dispatch, Selector } from "@/lib/features/hooks";
import { ArticleData } from "@/lib/InterfaceData";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const dispatch = Dispatch();
  const articleData: ArticleData []= Selector(selectArticle) || [];
  const status: string = Selector(selectArticleStatus);


  useEffect(() => {
    if (status === 'idle') dispatch(getAllArticle())
  }, [dispatch, status]);
  
  console.log(status,articleData);
  
  if (articleData.length === 0) return <p>No articles available.</p>;;


  return (
    <>
      {}
    </>
  );

}
