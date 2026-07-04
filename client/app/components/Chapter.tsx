"use client"
import { useState, useEffect } from 'react';
import type { ChapterData } from '@/app/types/ChapterData';
import React from 'react';
import axios from 'axios';
import ViewChapter from './ViewChapter';
import { BookOpen, /*LockOpenIcon,*/EyeClosed, EyeIcon, MousePointerClick,/* PlusCircle,*/ Star } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";



export default function ChapterPage({ params }: { params: string }) {
  const [chaptersData, setChaptersData] = useState<ChapterData[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(null);
  const [currentChapter, setCurrentChapter] = useState<string>("");
  const [allItemsClicked, setAllItemsClicked] = useState<string[]>([]);
  // Tracks which kind of content should be shown: "text", "video" or "quiz"
  const [contentType, setContentType] = useState<"text" | "video" | "file">("text");
  const [contentData, setContentData] = useState<string | string[]>()
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const [activeChapter, setActiveChapter] = useState({"text": false, "file": false, "video": false});

  useEffect(() => {
      const token = localStorage.getItem("token"); // or however you store the token

      axios.get<ChapterData[]>(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/chapter/getChapter/${params}`,
        {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials:true,
      })
      .then((res) => {
        setChaptersData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);


  function onSelect(chapter: ChapterData, type: "text" | "file" | "video") {
    setSelectedChapter(chapter);
    setContentType(type);
    setCurrentChapter(chapter._id);
    setAllItemsClicked((prv) => !prv.includes(type) ? [...prv, type] : prv);
    setActiveChapter((prvActive) => {
        return {
          ...prvActive, [type]: true
        }
    });

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
    setContentData(contentData);
  }

  // useEffect(() => { chaptersData.map(el => console.log(el)) }, [chaptersData])

  const source = Array.isArray(contentData) ? contentData[0] : contentData;
  const stylePartsText = activeChapter?.text ? "text-white" : "text-[#777] hover:scale-110 hover:translate-x-2 hover:text-white"
  const stylePartsFile = activeChapter?.file ? "text-white" : "text-[#777] hover:scale-110 hover:translate-x-2 hover:text-white"
  const stylePartsVideo = activeChapter?.video ? "text-white" : "text-[#777] hover:scale-110 hover:translate-x-2 hover:text-white"
  

  return (
    <div className="grid grid-cols-3 gap-1 justify-between">
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
        onValueChange={(value) => {
          setOpenItem(value);
          setAllItemsClicked([]);
          setContentData("");
          setContentType("text");
          setActiveChapter({"text": false, "file": false, "video": false})
        }}
      >
        {chaptersData.length > 0 && chaptersData?.map((chapter) => (
          <AccordionItem key={chapter._id} value={`item-${chapter._id}`}>
            <AccordionTrigger>
              <span className="text-xl font-semibold text-white mb-2 px-4">
                {chapter.order}. {chapter.ChapterTitle}
              </span>
            </AccordionTrigger>
          <AccordionContent>
              <ul className="flex flex-col gap-4 px-4 py-2 items-start">
                <li className={`flex gap-2 items-center px-4 py-2 text-nowrap font-bold text-lg ${stylePartsText} transition`} >
                    <span className="transition">
                      {activeChapter.text ? <EyeIcon size={18}/> : <EyeClosed size={18} />}
                    </span>
                    <button onClick={() => onSelect(chapter, "text")}>
                      {chapter.textTitle}
                    </button>
                </li>
                <li className={`flex gap-2 items-center px-4 py-2 text-nowrap font-bold text-lg ${stylePartsVideo} transition`} >
                    <span className="transition">
                      {activeChapter.video ? <EyeIcon size={18}/> : <EyeClosed size={18} />}
                    </span>
                  <button onClick={() => onSelect(chapter, "video")}>
                    {chapter.videoTitle}
                  </button>
                </li>
                <li className={`flex gap-2 items-center px-4 py-2 text-nowrap font-bold text-lg ${stylePartsFile} transition`} >
                    <span className="transition">
                      {activeChapter.file ? <EyeIcon size={18}/> : <EyeClosed size={18} />}
                    </span>
                  {chapter.filedata && (
                      <button onClick={() => onSelect(chapter, "file")}>
                        {chapter.filename}
                      </button>
                    )}
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
        </Accordion>
    </div>
      <div className="col-span-2 bg-black/60 backdrop-blur-md rounded-2xl border border-red-500/30 overflow-hidden grid-cols-2">
        <div className="p-6 border-b border-red-500/30 bg-red-900/20">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-red-400" />
            Lesson Content
          </h2>
        </div>
        <div className="p-4 flex justify-center" style={{minHeight: "calc(100% - 80px)"}}>
          {selectedChapter ? (
            <ViewChapter
              ContentType={contentType}
              ContentData={`${source}`}
              chapterID={`${currentChapter}`}
              allClicked={allItemsClicked}
            />
          ) : (
            <p className="text-white flex items-center justify-center gap-4 font-bold text-2xl"> <MousePointerClick/> Select a chapter to view its content.</p>
          )}
        </div>
      </div>
    </div>
  );
}