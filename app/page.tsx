import styles from "./page.module.css";
import { connectorCategories } from "@/data/connectors";
import { ConnectorCategoryCard } from "@/components/ConnectorCategoryCard";
import { ConnectorExplorer } from "@/components/ConnectorExplorer";
import { PracticeArena } from "@/components/PracticeArena";
import { ConnectorQuiz } from "@/components/ConnectorQuiz";
import { StoryBuilder } from "@/components/StoryBuilder";

export default function Page() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>Master English Connectors</h1>
        <p>
          Connectors link your ideas and make your English sound natural. Work through friendly explanations, explore smart
          examples, and lock it in with targeted practice. Treat this as your personal tutor guiding you in Bangla-friendly English.
        </p>
        <div className={styles["cta-row"]}>
          <a href="#explore" className="primary-cta">
            Explore connectors
          </a>
          <a href="#practice" className="ghost-cta">
            Start practising
          </a>
        </div>
      </section>

      <section id="categories" className={styles.section}>
        <header>
          <h2>Connector Families</h2>
          <p>
            Learn the big groups. Imagine you are telling a story in English while thinking in Bangla. These categories help you
            choose the perfect word to guide your listener.
          </p>
        </header>
        <div className={`${styles["category-grid"]}`}>
          {connectorCategories.map((category) => (
            <ConnectorCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section id="explore" className={styles.section}>
        <header>
          <h2>Connector Explorer</h2>
          <p>
            Filter by level or purpose. Notice how the same idea can be expressed with different connectors, depending on the tone
            or exam level you need.
          </p>
        </header>
        <ConnectorExplorer defaultLevel="all" />
      </section>

      <section id="practice" className={styles.section}>
        <header>
          <h2>Check Your Instinct</h2>
          <p>
            Try quick questions. Read the Bangla-friendly hints to understand why some connectors fit better than others. Don’t rush
            — focus on meaning first.
          </p>
        </header>
        <PracticeArena />
      </section>

      <section className={styles.section}>
        <header>
          <h2>Your Connector Voice</h2>
          <p>
            Connector choices change the tone. Toggle the options to feel how the message becomes richer or more logical instantly.
          </p>
        </header>
        <StoryBuilder />
      </section>

      <section className={styles.section}>
        <header>
          <h2>Mini Writing Challenge</h2>
          <p>
            Type the connector yourself. This low-pressure quiz checks spelling and meaning, so you can use the right connector in
            exams, emails, or conversations.
          </p>
        </header>
        <ConnectorQuiz />
      </section>
    </main>
  );
}
