"use client"

import Type from "mongoose";
import { BaseSyntheticEvent, useEffect, useState } from "react";
// import { quiz } from "./quiz/js";
import { FaQuestion } from "react-icons/fa";
import Button from "./Button";
import { CheckCircleIcon, CircleCheck } from "lucide-react";

export interface quiz  {
    _id: Type.ObjectId;
    title: string;
    synopsis: string;
    nbrOfQuestions: number;
    questions: question[];
    courseId: Type.ObjectId;
}

export interface question {
    _id: Type.ObjectId;
    question: string;
    questionType: string;
    answerSelectionType: string;
    answers: string[];
    correctAnswer: string;
    messageForCorrectAnswer: string;
    messageForIncorrectAnswer: string;
    explanation: string;
    point: string;
    idQuiz: Type.ObjectId[];
}


export default function Quizzes({idCourse}: {idCourse: string}) {
    const [quizNb, setNbQuiz] = useState(0);
    const [questionNb, setNbQuestion] = useState(0);
    const [quizzes, setQuizzes] = useState<quiz[]>([]);
    const [getCurrentQuiz, setGetCurrentQuiz] = useState<quiz[]>([]);
    // const listAnswers = useRef<HTMLUListElement>(null);
    const [answer, setAnswer] = useState("");
    
    useEffect(() => {
        try {
            const url = `${process.env.NEXT_PUBLIC_EXPRESS_URL}/quizzes/getQuizzes/${idCourse}`;
            fetch(url).then(async (res) => {
                return await res.json();
            }).then((res) => {
                console.log(res);
                setQuizzes(res);
            }).catch((rej) => {
                console.error(rej);
            });

        } catch (err) {
            console.error(`Errors occurred instead the fetching Quizzes : ${err}`);
        }

    }, [idCourse]);

    useEffect(() => {
        const quizList = quizzes ? quizzes.slice(quizNb, quizNb + 1) : [];
        setGetCurrentQuiz(quizList);
    }, [quizNb, quizzes]);

    useEffect(() => {
        console.log("this is the current quiz: ", quizNb);
    }, [quizNb]);

    const handleNextQuiz = () => {
        setAnswer("");
        setNbQuestion(0);
        setNbQuiz( prv =>  prv <= quizzes.length - 1 ? prv + 1 : prv);
    }

    const handleNextQuestion = () => {
        setAnswer("");
        setNbQuestion( prv =>  prv < quizzes[quizNb]?.questions.length - 1 ? prv + 1 : prv);
    }

    const handleCheck = (e: BaseSyntheticEvent) => {
        // console.log(listAnswers?.current?.style.pointerEvents.concat(" none"));
        console.log(e.target.dataset.answer === quizzes[quizNb]?.questions[questionNb]?.correctAnswer);
        setAnswer(quizzes[quizNb]?.questions[questionNb]?.correctAnswer);
        // console.log(e.target.dataset.answer);
    }

    return  <section className="w-full min-h-full bg-gray-600/10 shadow-md p-4 shadow-gray">
                {
                    getCurrentQuiz && quizzes.length  !== quizNb ? getCurrentQuiz.map((quiz: quiz) => {
                        return <div key={`${quiz["_id"]}`} className="flex flex-1 flex-col gap-4 p-8">
                            <h1 className="text-xl font-bold"><span className="uppercase"><span className="text-red-600">Quiz</span> Title: </span> {quiz.title}</h1>
                            <p className="text-md capitalize font-bold text-gray-500">{quiz.synopsis}</p>
                            <ul>
                                {
                                    quiz.questions.slice(questionNb, questionNb + 1).map((quest: question) => {
                                        return <li key={`${quest._id}`} >
                                            <p className="flex items-center gap-2 capitalize"><span>{ quest.question }</span> <FaQuestion className="inline-block"/></p>
                                            <ul className="flex flex-col gap-2 p-4" style={{pointerEvents: answer ? "none" : "all"}}>
                                                {  
                                                    quest.answers.map((ans, index) => {
                                                        return <li key={index} className="flex items-center gap-4 text-lg">
                                                                    <input type="checkbox" name="answer" className={`w-[18px] h-[18px] ${answer != ans ? "bg-red-600 accent-red-700" : "bg-green-600 accent-green-700"}`} onChange={handleCheck} data-answer={ans} id={`${index} answer`} />
                                                                    <label htmlFor={`${index} answer`}>{ans}</label>
                                                                </li>
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    })
                                }
                                <div className="flex flex-col">
                                {
                                    answer ? <span className="text-xl font-bold capitalize p-4 text-green-500">{quiz.questions[questionNb].correctAnswer}</span> : null
                                }
                                {
                                    answer ? <span className="text-md capitalize p-4 text-gray-500">{quiz.questions[questionNb].explanation}</span> : null
                                }
                                </div>
                            </ul>
                        </div>
                    }) : <span className="text-3xl text-gray-500/35 font-bold p-4 capitalize flex w-full items-center justify-center">Oops, No Quizzes Yet !</span>
                }
                
                {
                    quizzes.length  === quizNb ? null :
                        <article className="flex items-center w-fit ml-auto gap-3">
                            {
                                questionNb === quizzes[quizNb]?.questions.length - 1 ? null :
                                <Button type={"button"} w="" 
                                    className={`rounded-full p-2 text-white opacity-30 hover:opacity-100 flex items-center justify-center gap-2 [&:hover>*]:scale-105 ${answer ? "opacity-90" : ""}`}
                                    handleClick={handleNextQuestion}
                                    button="Check Answer"
                                    >
                                        <CircleCheck className="transition-all"/>
                                </Button>
                            }
                            {
                                questionNb === quizzes[quizNb]?.questions.length - 1 ? 
                                    <Button type={"button"} w="" 
                                        className="rounded-full p-2 text-white opacity-30 hover:opacity-100 gap-2 flex items-center justify-center [&:hover>*]:scale-105"
                                        handleClick={handleNextQuiz}
                                        button="Next Quiz"
                                        >
                                            <CheckCircleIcon className="transition-all text-xl"/>
                                    </Button>
                                : null
                            }
                        </article>
                }
            </section>
}