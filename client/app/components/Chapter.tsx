"use client"
import { useState, useEffect } from 'react';
import type { ChapterData } from '@/app/types/ChapterData';
import React from 'react';
import axios from 'axios';
import ViewChapter from './ViewChapter';
import QuizPlayer from './QuizPlayer';
import { BookOpen, Star, ClipboardCheck } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ChapterPage({ lessonId }: { lessonId: string }) {

  const [chaptersData, setChaptersData] = useState<ChapterData[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(
    null
  );

  const [contentType, setContentType] = useState<"text" | "video" | "file" | "quiz">("text");
  const [contentData, setContentData] = useState<string | string[] | undefined>()
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizChapterId, setQuizChapterId] = useState<string | null>(null)
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  useEffect(() => {
    axios
      .get<ChapterData[]>(`/chapter/getChapter/${lessonId}`,
         {
        headers: {
           'Content-Type': 'application/json',
        },
        withCredentials:true,
      }
      )

      .then((res) => {
        setChaptersData(res.data);

      })
      .catch((error) => {
        console.log(error);
      })
  }, [lessonId]);


  function onSelect(
    chapter: ChapterData,
    type: "text" | "file" | "video",

  ) {
    setSelectedChapter(chapter);
    setContentType(type);
    setShowQuiz(false);


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

  function onQuiz(chapter: ChapterData) {
    setSelectedChapter(chapter);
    setContentType("quiz");
    setShowQuiz(true);
    setQuizChapterId(chapter._id);
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
          <AccordionItem key={chapter._id} value={`item-${chapter._id}`}>
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

              <button
                className="px-4 py-2 font-bold text-lg hover:bg-red-200 rounded-md transition flex items-center gap-2"
                onClick={() => onQuiz(chapter)}
              >
                <ClipboardCheck className="w-5 h-5" />
                Quiz
              </button>
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

        <div className="p-4">
          {selectedChapter && showQuiz && quizChapterId ? (
            <QuizPlayer chapterId={quizChapterId} />
          ) : selectedChapter ? (
            <ViewChapter
              ContentType={contentType === "quiz" ? null : contentType}
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
