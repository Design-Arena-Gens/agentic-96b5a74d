"use client";

import { useMemo, useState } from "react";

type StoryConnector = {
  id: string;
  connector: string;
  description: string;
  sentence: string;
};

const storyConnectors: StoryConnector[] = [
  {
    id: "intro",
    connector: "First",
    description: "Start the story and introduce the first action.",
    sentence: "First, I explain what connectors do in strong writing."
  },
  {
    id: "addition",
    connector: "In addition",
    description: "Add a supporting detail that keeps the same direction.",
    sentence: "In addition, I show examples from real student writing."
  },
  {
    id: "contrast",
    connector: "However",
    description: "Introduce a surprising or contrasting idea.",
    sentence: "However, many learners forget to vary their connectors."
  },
  {
    id: "result",
    connector: "As a result",
    description: "Explain the effect or outcome of the previous action.",
    sentence: "As a result, their paragraphs sometimes feel repetitive."
  },
  {
    id: "purpose",
    connector: "So that",
    description: "Show the goal or intention behind an action.",
    sentence: "So that you avoid this, we practise with meaningful activities."
  }
];

export function StoryBuilder() {
  const [activeIds, setActiveIds] = useState<string[]>(["intro", "purpose"]);

  const toggleId = (id: string) => {
    setActiveIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const storyText = useMemo(() => {
    return storyConnectors
      .filter((item) => activeIds.includes(item.id))
      .map((item) => `${item.connector}, ${item.sentence.replace(`${item.connector}, `, "")}`)
      .join(" ");
  }, [activeIds]);

  return (
    <div className="practice-card">
      <h3>Story Builder</h3>
      <p className="mini-tip">Toggle connectors to see how the tone and logic of the lesson summary change.</p>
      <div className="options">
        {storyConnectors.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`option ${activeIds.includes(item.id) ? "correct" : ""}`}
            onClick={() => toggleId(item.id)}
          >
            <strong>{item.connector}</strong>
            <br />
            <span>{item.description}</span>
          </button>
        ))}
      </div>
      <div className="sentence-highlight">{storyText}</div>
    </div>
  );
}
