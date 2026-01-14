// import Quiz from 'react-quiz-component';

export const quiz = {
  quizTitle: "JavaScript Fundamentals Quiz",
  quizSynopsis: "Test your knowledge of core JavaScript concepts, syntax, and behaviors.",
  nrOfQuestions: "5",
  questions: [
    {
      question: "Which of the following is a primitive data type in JavaScript?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "Object",
        "Array",
        "Function",
        "Boolean"
      ],
      correctAnswer: "4",
      messageForCorrectAnswer: "Correct. Boolean is a primitive type.",
      messageForIncorrectAnswer: "Wrong. Object, Array, and Function are all non-primitive.",
      explanation: "JavaScript's primitive types include String, Number, Boolean, Null, Undefined, Symbol, and BigInt.",
      point: "10"
    },
    {
      question: "What will `typeof NaN` return?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "'NaN'",
        "'undefined'",
        "'number'",
        "'object'"
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct. It's weird but true.",
      messageForIncorrectAnswer: "Incorrect. JavaScript treats NaN as a number.",
      explanation: "`NaN` stands for Not-A-Number but its type is `number`.",
      point: "10"
    },
    {
      question: "Which method converts a JSON string into a JavaScript object?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "JSON.parse()",
        "JSON.stringify()",
        "JSON.toObject()",
        "JSON.convert()"
      ],
      correctAnswer: "1",
      messageForCorrectAnswer: "Correct.",
      messageForIncorrectAnswer: "Nope. The correct method is JSON.parse().",
      explanation: "`JSON.parse()` takes a string and returns a JavaScript object.",
      point: "10"
    },
    {
      question: "Which of the following will NOT return true?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "0 == false",
        "null == undefined",
        "'5' == 5",
        "NaN == NaN"
      ],
      correctAnswer: "4",
      messageForCorrectAnswer: "Exactly. NaN is never equal to itself.",
      messageForIncorrectAnswer: "Wrong. Only NaN != NaN.",
      explanation: "NaN is the only value in JavaScript that is not equal to itself.",
      point: "10"
    },
    {
      question: "Which of these features were introduced in ES6?",
      questionType: "text",
      answerSelectionType: "multiple",
      answers: [
        "Arrow functions",
        "let and const",
        "Promises",
        "document.write"
      ],
      correctAnswer: [1, 2, 3],
      messageForCorrectAnswer: "Correct. All except document.write are ES6+ features.",
      messageForIncorrectAnswer: "Incorrect. `document.write` is old and not part of ES6.",
      explanation: "Arrow functions, `let`/`const`, and Promises came in ES6. `document.write` has existed since early JS.",
      point: "20"
    }
  ]
};



