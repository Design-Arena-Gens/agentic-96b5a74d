"use client";

import { useMemo, useState } from "react";
import { connectorCategories, Level, levels } from "@/data/connectors";

interface ConnectorExplorerProps {
  defaultLevel?: Level | "all";
}

export function ConnectorExplorer({ defaultLevel = "all" }: ConnectorExplorerProps) {
  const [selectedLevel, setSelectedLevel] = useState<Level | "all">(defaultLevel);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const connectors = useMemo(() => {
    return connectorCategories.flatMap((category) =>
      category.connectors
        .filter((connector) => (selectedLevel === "all" ? true : connector.level === selectedLevel))
        .map((connector) => ({
          ...connector,
          category: category.title,
          categoryId: category.id
        }))
    );
  }, [selectedLevel]);

  const filteredConnectors = useMemo(() => {
    if (selectedCategory === "all") {
      return connectors;
    }
    return connectors.filter((connector) => connector.categoryId === selectedCategory);
  }, [connectors, selectedCategory]);

  return (
    <div>
      <div className="controls">
        {[{ label: "All Levels", value: "all" as const }, ...levels.map((level) => ({ label: `Level ${level}`, value: level }))].map(
          (filter) => (
            <button
              key={filter.value}
              type="button"
              className={`pill ${selectedLevel === filter.value ? "active" : ""}`}
              onClick={() => setSelectedLevel(filter.value)}
            >
              {filter.label}
            </button>
          )
        )}
      </div>
      <div className="controls">
        {[{ id: "all", title: "All Uses" }, ...connectorCategories.map((category) => ({ id: category.id, title: category.title }))].map(
          (category) => (
            <button
              key={category.id}
              type="button"
              className={`pill ${selectedCategory === category.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.title}
            </button>
          )
        )}
      </div>
      <div className="explorer-grid">
        {filteredConnectors.map((connector) => (
          <div className="explorer-card" key={connector.id}>
            <h4>{connector.term}</h4>
            <p>
              <strong>Use:</strong> {connector.meaning}
            </p>
            <p>
              <strong>Category:</strong> {connector.category}
            </p>
            <p>
              <strong>Example:</strong> {connector.example}
            </p>
            <div className="chip">Level {connector.level}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
