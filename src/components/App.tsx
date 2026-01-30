import { useState } from "react";
import css from "../App.module.css";

import type { VoteType, Votes } from "../types/votes.ts";
import { CafeInfo } from "./CafeInfo.tsx";
import { VoteOptions } from "./VoteOptions.tsx";
import { VoteStats } from "./VoteStats.tsx";
import { Notification } from "./Notification.tsx";

const initialVotes: Votes = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function App() {
  const [votes, setVotes] = useState<Votes>(initialVotes);

  const handleVote = (type: VoteType): void => {
    setVotes(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetVotes = (): void => {
    setVotes(initialVotes);
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />

      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />

      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;