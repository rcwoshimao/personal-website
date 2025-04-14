import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { useEffect } from 'react';
import "./MonkeyTypeStats.css"; 

const API_KEY = import.meta.env.VITE_MONKEYTYPE_API_KEY;
const uid = "rc_woshimao"; 
const url = `https://api.monkeytype.com/users/${uid}/profile`;
const headers = {
  Authorization: `ApeKey ${API_KEY}`,  // Using APIKey scheme
  "Content-Type": "application/json",
};

async function fetchUserStats() {
  try {
    const response = await axios.get(url, { headers });
    return response.data;

  } catch (error) {
    console.error("Error fetching user stats:", error.response?.data || error.message);
    throw error;
  }
}

function getOrdinalSuffix(n) {
  const s = ["th", "st", "nd", "rd"],
        v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function MonkeyTypeStats() {
  useEffect(() => {
    if (!API_KEY) {
      console.error("API key is missing!");
    } else {
      console.log("Using API Key:", API_KEY.substring(0, 4) + "****");
    }
  }, []);

  const { data, error, isLoading, dataUpdatedAt} = useQuery({
    queryKey: ["userStats"], 
    queryFn: fetchUserStats, 
    enabled: !!API_KEY,
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isLoading) {
      console.log("Query is loading...");
    }
    if (error) {
      console.error("Query error:", error);
    }
    if (data) {
      console.log("Query data:", data);
    }
  }, [data, error, isLoading]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error?.message || "Unknown error"}</p>;

  return (
    <div>
    <h3>All Time English Leaderboard</h3>
    <div className="leaderboard-grid">
      {data?.data?.allTimeLbs?.time &&
        Object.entries(data.data.allTimeLbs.time).map(([mode, entries], i) => (
          <div className="leaderboard-box" key={i}>
            <div className="leaderboard-title">{mode} secs</div>
            {Object.entries(entries).map(([category, info], j) => (
              <div className="leaderboard-entry" key={j}>
                <div className="leaderboard-percent">
                  Top 
                  <br/>
                  <span className='leaderboard-persent-number'> {((info.rank / info.count) * 100).toFixed(2)}% </span>
                </div>
                <div className="leaderboard-rank">{getOrdinalSuffix(info.rank)}</div>
              </div>
            ))}
          </div>
        ))}
    </div>

    <h2>Personal Best Times</h2>
      
    <div className="personal-bests-grid">
      <div className="best-box">
        {data?.data?.personalBests?.time &&
          Object.entries(data.data.personalBests.time).map(([key, times], index) => {
            const englishTimes = times.filter(time => time?.language === "english");
            if (englishTimes.length === 0) return null;
  
            const best = englishTimes[0]; // just show the top one
  
            return (
              <div className="best-entry" key={`time-${index}`}>
                <div className="best-title">{key}s</div>
                <div className="best-middle">WPM {best.wpm}</div>
                <div className="best-bottom">Acc {best.acc}% </div>
              </div>
            );
          })}
        </div>
        <div className="best-box">
        {data?.data?.personalBests?.words &&
          Object.entries(data.data.personalBests.words).map(([key, words], index) => {
            const englishWords = words.filter(words => words?.language === "english");
            if (englishWords.length === 0) return null;
  
            const best = englishWords[0];
  
            return (
              <div className="best-entry" key={`words-${index}`}>
                <div className="best-title">{key}w</div>
                <div className="best-middle"> WPM {best.wpm}</div>
                <div className="best-bottom">Acc {best.acc}%</div>
              </div>
            );
          })}
        </div>
  </div>

  {dataUpdatedAt && (
  <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
    Data last fetched: {new Date(dataUpdatedAt).toLocaleDateString()}
  </p>
)}

    </div>
  );
}
