import { ConnectorCategory } from "@/data/connectors";

interface ConnectorCategoryCardProps {
  category: ConnectorCategory;
}

export function ConnectorCategoryCard({ category }: ConnectorCategoryCardProps) {
  return (
    <article className="category-card">
      <header>
        <h3>{category.title}</h3>
        <p>{category.description}</p>
      </header>
      <ul>
        {category.connectors.map((connector) => (
          <li key={connector.id}>
            <div className="connector-term">
              <span>{connector.term}</span>
              <small>{connector.level}</small>
            </div>
            <p className="connector-meaning">{connector.meaning}</p>
            <p className="connector-example">
              <strong>Example:</strong> {connector.example}
            </p>
            {connector.tip ? <p className="connector-tip">Tip: {connector.tip}</p> : null}
          </li>
        ))}
      </ul>
    </article>
  );
}
