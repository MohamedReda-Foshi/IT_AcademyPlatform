"use client"
import { useState } from 'react';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "What is JSX?",
      options: [
        { text: "A JavaScript library", score: 0 },
        { text: "A syntax extension for JavaScript", score: 2 },
        { text: "A CSS framework", score: 0 },
        { text: "A database query language", score: 0 }
      ]
    },
    {
      question: "Which hook is used for managing state in functional components?",
      options: [
        { text: "useEffect", score: 0 },
        { text: "useState", score: 2 },
        { text: "useContext", score: 0 },
        { text: "useReducer", score: 1 }
      ]
    },
    {
      question: "What is the Virtual DOM?",
      options: [
        { text: "A copy of the real DOM kept in memory", score: 2 },
        { text: "A new HTML standard", score: 0 },
        { text: "A CSS technique", score: 0 },
        { text: "A JavaScript framework", score: 0 }
      ]
    },
    {
      question: "How do you pass data from parent to child component?",
      options: [
        { text: "Using state", score: 0 },
        { text: "Using props", score: 2 },
        { text: "Using context", score: 1 },
        { text: "Using refs", score: 0 }
      ]
    },
    {
      question: "What is the purpose of useEffect hook?",
      options: [
        { text: "To manage component state", score: 0 },
        { text: "To handle side effects", score: 2 },
        { text: "To create components", score: 0 },
        { text: "To style components", score: 0 }
      ]
    },
    {
      question: "What is React's key prop used for?",
      options: [
        { text: "Styling elements", score: 0 },
        { text: "Identifying elements in lists for efficient re-rendering", score: 2 },
        { text: "Passing data between components", score: 0 },
        { text: "Creating unique component instances", score: 1 }
      ]
    },
    {
      question: "Which method is called after a component is mounted?",
      options: [
        { text: "componentWillMount", score: 0 },
        { text: "componentDidMount", score: 2 },
        { text: "componentWillUpdate", score: 0 },
        { text: "componentDidUpdate", score: 1 }
      ]
    },
    {
      question: "What is the correct way to update state in React?",
      options: [
        { text: "this.state.count = 5", score: 0 },
        { text: "setState({count: 5})", score: 2 },
        { text: "state.count = 5", score: 0 },
        { text: "updateState({count: 5})", score: 0 }
      ]
    }
  ];

  const results = [
    {
      title: "React Beginner 🌱",
      description: "You're just starting your React journey! Focus on understanding components, JSX, and basic hooks. Practice building simple applications to strengthen your foundation.",
      minScore: 0,
      maxScore: 5
    },
    {
      title: "React Intermediate 🚀",
      description: "You have a solid understanding of React fundamentals! You know the core concepts and can build functional applications. Time to dive deeper into advanced patterns and optimization.",
      minScore: 6,
      maxScore: 11
    },
    {
      title: "React Expert 👑",
      description: "Excellent! You have mastery over React concepts and best practices. You can build complex applications, understand performance optimization, and are ready to mentor others!",
      minScore: 12,
      maxScore: 16
    }
  ];

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    return results.find(result => totalScore >= result.minScore && totalScore <= result.maxScore) || results[0];
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    backgroundColor: '#2d2d2d',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 8px 32px rgba(255, 0, 0, 0.2)',
    border: '2px solid #ff0000'
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    margin: '12px 0',
    padding: '18px 24px',
    backgroundColor: '#333333',
    color: '#ffffff',
    border: '2px solid #ff0000',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '16px',
    transition: 'all 0.3s ease'
  };

  const buttonHoverStyle = {
    backgroundColor: '#ff0000',
    color: '#ffffff',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 16px rgba(255, 0, 0, 0.4)'
  };

  const progressBarStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: '#333333',
    borderRadius: '4px',
    marginBottom: '20px',
    overflow: 'hidden'
  };

  const progressFillStyle = {
    height: '100%',
    backgroundColor: '#ff0000',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
    width: `${progress}%`
  };

  if (showResult) {
    const result = getResult();
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              marginBottom: '10px', 
              color: '#ff0000',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              React Knowledge Quiz
            </h1>
            <div style={progressBarStyle}>
              <div style={progressFillStyle}></div>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '30px',
            backgroundColor: '#1a1a1a',
            borderRadius: '10px',
            border: '2px solid #ff0000'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '15px', 
              color: '#ff0000' 
            }}>
              {result.title}
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              lineHeight: '1.6', 
              marginBottom: '20px',
              color: '#ffffff'
            }}>
              {result.description}
            </p>
            <p style={{ 
              fontSize: '1.1rem', 
              marginBottom: '30px', 
              color: '#ff0000',
              fontWeight: 'bold'
            }}>
              Your Score: {totalScore} out of {questions.length * 2}
            </p>
            
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={restart}
                style={{
                  padding: '15px 30px',
                  backgroundColor: '#ff0000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#cc0000';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#ff0000';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Retake Quiz
              </button>
              <button
                onClick={() => {
                  const text = `I scored ${totalScore}/${questions.length * 2} on the React Knowledge Quiz and got "${result.title}"!`;
                  if (navigator.share) {
                    navigator.share({ title: 'React Knowledge Quiz', text });
                  } else {
                    navigator.clipboard.writeText(text);
                    alert('Result copied to clipboard!');
                  }
                }}
                style={{
                  padding: '15px 30px',
                  backgroundColor: '#333333',
                  color: '#ffffff',
                  border: '2px solid #ff0000',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#ff0000';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#333333';
                }}
              >
                Share Result
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '10px', 
            color: '#ff0000',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            React Knowledge Quiz
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '20px', 
            color: '#cccccc' 
          }}>
            Test your React skills with this comprehensive quiz!
          </p>
          <div style={progressBarStyle}>
            <div style={progressFillStyle}></div>
          </div>
          <p style={{ 
            fontSize: '14px', 
            color: '#ff0000',
            fontWeight: 'bold'
          }}>
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '25px', 
            textAlign: 'center',
            color: '#ffffff',
            lineHeight: '1.4'
          }}>
            {questions[currentQuestion].question}
          </h2>
          
          <div>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.score)}
                style={buttonStyle}
                onMouseOver={(e) => {
                  Object.assign(e.target.style, buttonHoverStyle);
                }}
                onMouseOut={(e) => {
                  Object.assign(e.target.style, buttonStyle);
                }}
              >
                {String.fromCharCode(65 + index)}. {option.text}
              </button>
            ))}
          </div>
        </div>

        <div style={{ 
          textAlign: 'center', 
          fontSize: '14px', 
          color: '#888888',
          borderTop: '1px solid #444444',
          paddingTop: '20px'
        }}>
          <p>💡 Choose the best answer for each question</p>
        </div>
      </div>
    </div>
  );
}

export default Quiz;