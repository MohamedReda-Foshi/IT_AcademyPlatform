// app/Courses/[courseId]/Chapters/page.tsx
"use client"
import { useState, useEffect } from 'react';
import type { ChapterData } from '@/app/types/ChapterData';
import React from 'react';
import axios from 'axios';
import ViewChapter from './ViewChapter';
import { BookOpen, Star } from 'lucide-react';
//import Quiz from 'react-quiz-component';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Button from './Button';



export default function ChapterPage({ params }: { params: Promise<{ courseId: string }> }) {


  const [chaptersData, setChaptersData] = useState<ChapterData[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(
    null
  );

  // Tracks which kind of content should be shown: "text", "video" or "quiz"
  const [contentType, setContentType] = useState<"text" | "video" | "file">("text");
  const [contentData, setContentData] = useState<string | string[] >()
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  useEffect(() => {
      const token = localStorage.getItem("token"); // or however you store the token
    axios
      .get<ChapterData[]>(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/chapter/getChapter/${params}`,
         {
        headers: {
          'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json',
        },
        withCredentials:true,
      }
    )
    
    
      .then((res) => {
        setChaptersData(res.data);
        console.log("chaptersData",res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [params]);


  function onSelect(
    chapter: ChapterData,
    type: "text" | "file" | "video",

  ) {
    setSelectedChapter(chapter);
    setContentType(type);


    let contentData;
    switch (type) {
      case "text":
        contentData = chapter.text;
        break;
      case "file":
        contentData = chapter.filedata;
        break;
      case "video":
        contentData = chapter.videoUrl;
        break;
    }
    setContentData(contentData)
    console.log(`Selected chapter ${chapter} with type: ${type}`);
    console.log(`Selected chapter ${chapter.text || chapter.id} with type: ${type} and content:`, contentData);
  }


  return (
    <div className=' grid grid-cols-3 gap-1 justify-between '>
      <div className="col-span-1">
      <div className="p-6 border-b border-red-500/30 bg-red-900/20">
        <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
          <Star className="text-red-400" />
          Chapter Learning Outcomes
        </h2>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={openItem}
        onValueChange={(value) => setOpenItem(value)}
      >
        {chaptersData.map((chapter) => (
          <AccordionItem key={chapter.id} value={`item-${chapter.id}`}>
            <AccordionTrigger>
              <span className="text-xl font-semibold text-white mb-2 px-2">
                {chapter.order}. {chapter.ChapterTitle}
              </span>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4 px-4 py-2">
              <button
                className="px-4 py-2 font-bold text-lg hover:bg-red-200 rounded-md transition"
                onClick={() => onSelect(chapter, "text")}
              >
                {chapter.textTitle}
              </button>

              <button
                className="px-4 py-2 font-bold text-lg hover:bg-red-200 rounded-md transition"
                onClick={() => onSelect(chapter, "video")}
              >
                {chapter.videoTitle}
              </button>

              {chapter.filedata && (
                <button
                  className="px-4 py-2 font-bold text-lg hover:bg-red-200 rounded-md transition"
                  onClick={() => onSelect(chapter, "file")}
                >
                  {chapter.filename}
                </button>
              )}
            </AccordionContent>
          </AccordionItem>
        ))} 
        <Link href={`/Quiz`}>
          <Button button='Start Quiz'/>
        </Link>
      </Accordion>
      {/*<Quiz/>*/}
    </div>




      <div className="col-span-2 bg-black/60 backdrop-blur-md rounded-2xl border border-red-500/30 overflow-hidden grid-cols-2">
        <div className="p-6 border-b border-red-500/30 bg-red-900/20">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-red-400" />
            Lesson Content
          </h2>
        </div>

        <div className="p-4">
          {selectedChapter ? (
            <ViewChapter
              ContentType={contentType}
              ContentData={contentData}
            />
          ) : (
            <p className="text-white">Select a chapter to view its content.</p>
          )}
        </div>
      </div>
    </div>
  );
}