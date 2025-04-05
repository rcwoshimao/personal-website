import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { useEffect } from 'react';
import "./UserStats.css"; 

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
    console.log("API Response:", response.data);  // Log the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching user stats:", error.response?.data || error.message);
    throw error;
  }
}

export default function UserStats() {
  useEffect(() => {
    if (!API_KEY) {
      console.error("API key is missing!");
    } else {
      console.log("Using API Key:", API_KEY.substring(0, 4) + "****");
    }
  }, []);

  const { data, error, isLoading } = useQuery({
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
      <h2>Personal Best Times</h2>
      <h3>Updated daily</h3>
      <li>
          {data?.data?.personalBests?.time && Object.entries(data.data.personalBests.time).map(([key, times], index) => (
            <div key={index}>
              <h4>Time for {key} seconds:</h4>
              <ul className='personal-bests'>
                {times.map((time, idx) => (
                  <li key={idx}>
                    <p>WPM: {time?.wpm}</p>
                    <p>Accuracy: {time?.acc}%</p>
                    <p>Consistency: {time?.consistency}%</p>
                    <p>Difficulty: {time?.difficulty}</p>
                    <p>Language: {time?.language}</p>
                    <p>Time Stamp: {new Date(time?.timestamp).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </li>

    </div>
  );
}
