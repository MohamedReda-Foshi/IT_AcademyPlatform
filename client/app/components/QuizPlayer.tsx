"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  points: number
}

interface Quiz {
  _id: string
  title: string
  chapterId: string
  lessonId: string
  questions: QuizQuestion[]
  passingScore: number
}

interface QuizResult {
  question: string
  options: string[]
  correctAnswer: number
  userAnswer: number | undefined
  isCorrect: boolean
  points: number
}

interface QuizResultResponse {
  quizId: string
  title: string
  score: number
  earnedPoints: number
  totalPoints: number
  passingScore: number
  passed: boolean
  results: QuizResult[]
}

export default function QuizPlayer({ chapterId }: { chapterId: string }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [answers, setAnswers] = useState<(number | undefined)[]>([])
  const [result, setResult] = useState<QuizResultResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios.get(`/quiz/byChapter/${chapterId}`, {
      withCredentials: true,
    })
      .then((res) => {
        setQuiz(res.data)
        setAnswers(new Array(res.data.questions.length).fill(undefined))
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load quiz")
        setLoading(false)
      })
  }, [chapterId])

  function selectAnswer(questionIndex: number, optionIndex: number) {
    if (result) return
    const newAnswers = [...answers]
    newAnswers[questionIndex] = optionIndex
    setAnswers(newAnswers)
  }

  async function submitQuiz() {
    if (!quiz) return
    const unanswered = answers.filter(a => a === undefined).length
    if (unanswered > 0) {
      if (!confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) return
    }
    setSubmitting(true)
    try {
      const res = await axios.post(`/quiz/submit/${quiz._id}`, { answers }, {
        withCredentials: true,
      })
      setResult(res.data)
    } catch {
      alert("Failed to submit quiz")
    } finally {
      setSubmitting(false)
    }
  }

  function retryQuiz() {
    setResult(null)
    setAnswers(new Array(quiz!.questions.length).fill(undefined))
  }

  if (loading) return <div className="text-white p-4">Loading quiz...</div>
  if (error) return <div className="text-red-400 p-4">{error}</div>
  if (!quiz) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">{quiz.title}</h3>
        {result && (
          <button onClick={retryQuiz} className="flex items-center gap-2 text-red-400 hover:text-red-300">
            <RotateCcw className="w-4 h-4" /> Retry
          </button>
        )}
      </div>

      {!result && (
        <div className="text-sm text-gray-400">
          {answers.filter(a => a !== undefined).length} / {quiz.questions.length} answered
        </div>
      )}

      {result && (
        <div className={`p-4 rounded-xl border ${result.passed ? 'bg-green-900/30 border-green-500/50' : 'bg-red-900/30 border-red-500/50'}`}>
          <div className="flex items-center gap-3">
            <Trophy className={`w-8 h-8 ${result.passed ? 'text-green-400' : 'text-red-400'}`} />
            <div>
              <p className="text-lg font-bold text-white">
                Score: {result.score}% ({result.earnedPoints}/{result.totalPoints} points)
              </p>
              <p className={`text-sm ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                {result.passed ? 'Passed!' : `Failed (need ${result.passingScore}%)`}
              </p>
            </div>
          </div>
        </div>
      )}

      {quiz.questions.map((q, qi) => (
        <div key={qi} className="bg-gray-800/50 rounded-xl border border-gray-700 p-5">
          <p className="text-white font-medium mb-4">
            <span className="text-red-400 mr-2">Q{qi + 1}.</span>
            {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              let optionClass = "bg-gray-700/50 border-gray-600 hover:bg-gray-600/50"
              if (result) {
                if (oi === q.correctAnswer) optionClass = "bg-green-900/50 border-green-500"
                else if (oi === result.results[qi].userAnswer && !result.results[qi].isCorrect)
                  optionClass = "bg-red-900/50 border-red-500"
                else optionClass = "bg-gray-700/30 border-gray-700 opacity-50"
              } else if (answers[qi] === oi) {
                optionClass = "bg-red-900/50 border-red-500"
              }
              return (
                <button
                  key={oi}
                  onClick={() => selectAnswer(qi, oi)}
                  disabled={!!result}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition ${optionClass}`}
                >
                  <span className="text-gray-300 mr-3">{String.fromCharCode(65 + oi)}.</span>
                  <span className="text-white">{opt}</span>
                  {result && oi === q.correctAnswer && (
                    <CheckCircle className="inline w-4 h-4 text-green-400 ml-2" />
                  )}
                  {result && oi === result.results[qi].userAnswer && !result.results[qi].isCorrect && (
                    <XCircle className="inline w-4 h-4 text-red-400 ml-2" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {!result && (
        <button
          onClick={submitQuiz}
          disabled={submitting}
          className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl transition"
        >
          {submitting ? "Submitting..." : "Submit Quiz"}
        </button>
      )}
    </div>
  )
}
