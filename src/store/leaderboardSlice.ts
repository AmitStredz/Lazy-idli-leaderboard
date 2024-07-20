import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Score {
  username: string;
  time: string; // MM:SS::MSS format
}

export interface LeaderboardState {
  scores: Score[];
  latestScore: Score | null; // Track the latest score
  latestIndex: number | null; // Track the index of the latest score
}

const initialState: LeaderboardState = {
  scores: [
    { username: "Charlie", time: "00:00:15" },
    { username: "Diana", time: "00:15:00" },
    { username: "Heidi", time: "00:28:45" },
    { username: "Alice", time: "00:30:45" },
    { username: "Judy", time: "00:45:15" },
    { username: "Bob", time: "00:45:30" },
    { username: "Grace", time: "01:07:09" },
    { username: "Dasiy", time: "01:15:00" },
    { username: "Amina", time: "01:15:45" },
    { username: "Eve", time: "01:30:30" },
    { username: "Ivan", time: "01:38:20" },
    { username: "Alan", time: "01:39:45" },
    { username: "Akash", time: "01:45:15" },
    { username: "Julia", time: "01:46:15" },
    { username: "Gokul", time: "02:00:15" },
    { username: "Greeshma", time: "02:01:00" },
    { username: "Diesel", time: "02:10:00" },
    { username: "Avneesh", time: "02:23:30" },
    { username: "Amy", time: "02:30:30" },
    { username: "Frank", time: "02:45:15" },
    { username: "Bobby", time: "02:46:30" },
    { username: "Jujo", time: "02:51:15" },
    { username: "Aman", time: "02:57:45" },
    { username: "Ganesh", time: "03:00:15" },
    { username: "Akshay", time: "03:10:45" },
    { username: "Deol", time: "03:25:30" },
    { username: "Stark", time: "03:30:30" },
    { username: "Frank", time: "03:45:15" },
    { username: "Grane", time: "04:37:12" },
    { username: "Ivansy", time: "04:50:30" },
  ],
  latestScore: null,
  latestIndex: null,
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<Score>) => {
      state.scores.push(action.payload);

      // Keep track of the latest score
      state.latestScore = action.payload;

      state.scores.sort((a, b) => (a.time > b.time ? 1 : -1));

      // Update the index of the latest score after sorting
      state.latestIndex = state.scores.findIndex(
        (score) =>
          score.username === state.latestScore?.username &&
          score.time === state.latestScore?.time
      );

      // if (state.scores.length > 10) {
      //   state.scores.pop();
      // }
    },
  },
});

export const { addScore } = leaderboardSlice.actions;

// addScore({ username: "amit", time: "12:12:12" });

export const selectLatestEntry = (state: { leaderboard: LeaderboardState }) => {
  const { latestScore, latestIndex } = state.leaderboard;
  return { latestScore, latestIndex };
};
export default leaderboardSlice.reducer;
