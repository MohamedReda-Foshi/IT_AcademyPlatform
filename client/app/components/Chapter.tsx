// app/Courses/[courseId]/Chapters/page.tsx
"use client"
import { useState, useEffect } from 'react';
import type { ChapterData } from '@/app/types/ChapterData';
import React from 'react';
import axios from 'axios';
import ViewChapter from './ViewChapter';
import { BookOpen, Star } from 'lucide-react';

export default function ChapterPage({ params }: { params: Promise<{ courseId: string }> }) {


  const [chaptersData, setChaptersData] = useState<ChapterData[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(
    null
  );

  // Tracks which kind of content should be shown: "text", "video" or "quiz"
    const [contentType, setContentType] = useState<"text" | "video" | "file">("text");
    const [contentData,setContentData]= useState()

  useEffect(() => {
    axios
      .get<ChapterData[]>(`http://localhost:8001/course/getChapter/${params}`)

      .then((res) => {
        setChaptersData(res.data);

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
  <div className=' grid grid-cols-3 gap-16 justify-between '>
    <div className='grid-cols-1'>
        <div className="p-6 border-b border-red-500/30 bg-red-900/20">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                <Star className=" text-red-400" />
                Chapter Learning Outcomes
                
              </h2>
            </div>

        {chaptersData.map((chapter: ChapterData) => (
          <div
            key={chapter.id}
            className="border border-red-500 hover:border-red-300 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-lg p-4 mb-4 cursor-pointer px-60 "
          >
            
            <h3 className="text-xl font-semibold text-white mb-2">
              {chapter.ChapterTitle}
            </h3>
            <p className="text-white mb-1 text-base">
              <span className="">Order:</span>
            </p>

              <button className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md transition"
               onClick={() => onSelect(chapter, "text")}>
                {chapter.text}
              </button>


              <button className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md transition"
               onClick={() => onSelect(chapter, "video")}>
                {chapter.videoTitle}
              </button>
              
              <button className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md transition"
               onClick={() => chapter.filedata ? onSelect(chapter, "file") : null}>
                {chapter.filename}
              </button>
             




            <p className="text-white text-base">
              <span className="">Description:</span>{' '}
              {chapter.ChapterDescription}
            </p>
          </div>
        ))}
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