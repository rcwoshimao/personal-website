import { useQuery } from "@tanstack/react-query";
import { DefaultApi } from "../api";

const api = new DefaultApi();

async function fetchLeaderboard() {
  const res = await api.getLeaderboard();
  return res.data;
}

export default function Leaderboard() {
  const { data, error, isLoading } = useQuery(["leaderboard"], fetchLeaderboard);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div>
      <h2>Monkeytype Leaderboard</h2>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>
            {user.username}: {user.wpm} WPM
          </li>
        ))}
      </ul>
    </div>
  );
}
