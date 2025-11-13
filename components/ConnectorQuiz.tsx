"use client";

import { FormEvent, useMemo, useState } from "react";

type QuizQuestion = {
  id: number;
  question: string;
  answer: string;
  explanation: string;
  connectorType: string;
};

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Write a connector showing contrast: \"It was raining; ___, we enjoyed the picnic.\"",
    answer: "however",
    explanation: "Use \"however\" to contrast unexpected positive experience with rain.",
    connectorType: "Contrast"
  },
  {
    id: 2,
    question: "Add a result connector: \"She revised the lesson carefully; ___ she passed the test.\"",
    answer: "therefore",
    explanation: "A result connector such as \"therefore\" links her preparation to success.",
    connectorType: "Result"
  },
  {
    id: 3,
    question: "Purpose connector needed: \"I prepared flashcards ___ remember the connectors.\"",
    answer: "to",
    explanation: "\"To\" + verb is the most direct way to show purpose in this sentence.",
    connectorType: "Purpose"
  }
];

const normalise = (value: string) => value.trim().toLowerCase();

export function ConnectorQuiz() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const current = useMemo(() => questions[index], [index]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isCorrect = normalise(input) === current.answer;
    setAttempts((prev) => prev + 1);
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback(`✅ Perfect! "${current.answer}" is the ideal ${current.connectorType.toLowerCase()} connector here.`);
    } else {
      setFeedback(`❌ Try again. Tip: ${current.explanation}`);
    }
  };

  const goNext = () => {
    setIndex((prev) => (prev + 1) % questions.length);
    setInput("");
    setFeedback(null);
  };

  return (
    <div className="quiz-container">
      <div className="score-board">
        <span className="chip">{current.connectorType}</span>
        <span>
          Score: {score}/{questions.length}
        </span>
        <span>Attempts: {attempts}</span>
      </div>
      <p className="quiz-question">{current.question}</p>
      <form onSubmit={handleSubmit} className="quiz-actions">
        <input
          type="text"
          className="quiz-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type the connector…"
        />
        <button type="submit" className="primary-cta">
          Check
        </button>
        <button type="button" className="ghost-cta" onClick={goNext}>
          Next question
        </button>
      </form>
      {feedback ? <p>{feedback}</p> : <p className="mini-tip">Need a hint? Think about the relationship between the ideas.</p>}
    </div>
  );
}
