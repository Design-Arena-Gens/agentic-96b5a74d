"use client";

import { useMemo, useState } from "react";

type PracticeItem = {
  id: number;
  prompt: string;
  sentence: string;
  options: string[];
  answer: string;
  hint: string;
};

const practiceItems: PracticeItem[] = [
  {
    id: 1,
    prompt: "Choose a connector that adds supporting information.",
    sentence: "She improved her speaking skills; ___, she practised listening every day.",
    options: ["however", "moreover", "therefore"],
    answer: "moreover",
    hint: "Addition connectors join ideas that agree with each other."
  },
  {
    id: 2,
    prompt: "Pick the connector that shows a contrasting idea.",
    sentence: "The exercise looked easy; ___, many students made mistakes.",
    options: ["as a result", "however", "in addition"],
    answer: "however",
    hint: "You need something that signals an unexpected outcome."
  },
  {
    id: 3,
    prompt: "Look for a connector that introduces a reason.",
    sentence: "___ the instructions were confusing, the task took longer.",
    options: ["Since", "Meanwhile", "Unless"],
    answer: "Since",
    hint: "Cause connectors often answer the question 'why?'."
  },
  {
    id: 4,
    prompt: "This connector should show a consequence.",
    sentence: "He used precise connectors in his essay, ___ the lecturer praised his coherence.",
    options: ["so", "on the other hand", "although"],
    answer: "so",
    hint: "Think about the result of his action."
  },
  {
    id: 5,
    prompt: "Choose a connector that sets the purpose.",
    sentence: "We revise these examples ___ remember them for the test.",
    options: ["so that", "but", "eventually"],
    answer: "so that",
    hint: "Purpose connectors explain the goal of the action."
  }
];

export function PracticeArena() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentItem = useMemo(() => practiceItems[currentIndex], [currentIndex]);

  const handleSelect = (option: string) => {
    if (answered) {
      return;
    }
    setSelectedAnswer(option);
    setAnswered(true);
    if (option === currentItem.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const goNext = () => {
    setSelectedAnswer(null);
    setAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % practiceItems.length);
  };

  return (
    <div className="practice-card">
      <div className="progress">
        Question {currentIndex + 1} of {practiceItems.length} — Score: {score}
      </div>
      <div>
        <p className="practice-question">{currentItem.prompt}</p>
        <p className="sentence-highlight">{currentItem.sentence.replace("___", "_____")}</p>
      </div>
      <div className="options">
        {currentItem.options.map((option) => {
          const isCorrect = answered && option === currentItem.answer;
          const isIncorrect = answered && option === selectedAnswer && option !== currentItem.answer;
          return (
            <button
              key={option}
              type="button"
              className={`option ${isCorrect ? "correct" : ""} ${isIncorrect ? "incorrect" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="feedback">
        <span>
          {answered ? (
            selectedAnswer === currentItem.answer ? (
              <strong>Great! You chose the right connector.</strong>
            ) : (
              <>
                <strong>Not quite.</strong> The best choice is <strong>{currentItem.answer}</strong>.
              </>
            )
          ) : (
            <span className="mini-tip">Tap an option to check your intuition.</span>
          )}
        </span>
        <button type="button" className="pill" onClick={goNext}>
          Next sentence
        </button>
      </div>
      {answered && selectedAnswer !== currentItem.answer ? <p className="mini-tip">Hint: {currentItem.hint}</p> : null}
    </div>
  );
}
