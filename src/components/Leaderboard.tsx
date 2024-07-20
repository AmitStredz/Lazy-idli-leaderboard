import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectLatestEntry } from "../store/leaderboardSlice";
import AddScorePopup from "./AddScorePopup";

import { RootState } from "../store/store";
import { IoTrophy } from "react-icons/io5";

import bgImg from "../assets/bgImg.png";

const Leaderboard: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { latestScore, latestIndex } = useSelector(selectLatestEntry);

  const scores = useSelector((state: RootState) => state.leaderboard.scores);
  const latestEntryRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (latestEntryRef.current) {
      latestEntryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [latestIndex]);

  console.log("Scores: ", scores);

  return (
    <div
      className="leaderboard-container relative flex flex-col gap-2 max-h-[37rem] w-full p-2 sm:px-8 overflow-auto no-scrollbar"
      style={{
        backgroundImage: `url(${bgImg})`,
        height: "100%",
      }}
    >
      <div className="flex items-center p-1 px-3 text-[20px] sm:text-[28px] bg-black bg-opacity-70 font-semibold text-[#FF9E0D]">
        <IoTrophy className="w-5" />

        <div className="flex justify-between px-12 w-full font-mono">
          <span>Name</span>
          <span>Time</span>
        </div>
      </div>

      <ul className="flex flex-col gap-2 text-[16px] sm:text-[20px] font-bold">
        {scores.map((score, index) => (
          <li
            key={index}
            ref={index == latestIndex? latestEntryRef : null}
            className={`flex justify-between items-center rounded-br-full ${
              index == 0
                ? "bg-gradient-to-r from-[#BA9133] via-[#ECDE93] to-[#BA9133] text-black"
                : index == 1
                ? "bg-gradient-to-r from-[#9F9F9F] via-[#DDDDDD] to-[#9F9F9F] text-black"
                : index == 2
                ? "bg-gradient-to-r from-[#874522] via-[#DF9A79] to-[#874522] text-white"
                : index == latestIndex
                ? "bg-black bg-opacity-70 shadow-custom-white border-2 border-white text-white"
                : "bg-black bg-opacity-70 text-white"
            }`}
          >
            <div className="flex items-center p-[3px] w-full ">
              <span
                className={` p-2 px-4 Z rounded-br-2xl ${
                  index == 0
                    ? "text-[#FF9E0D] bg-black bg-opacity-80"
                    : index == 1
                    ? "text-[#9F9F9F] bg-black bg-opacity-80"
                    : index == 2
                    ? "text-[#DF9A79] bg-black bg-opacity-80"
                    : "text-black bg-white"
                }`}
              >
                {index + 1}
              </span>

              <div className="flex justify-between items-center px-4 sm:px-8 w-full h-full">
                <span>{score.username}</span>
                <div className="flex items-center gap-1 sm:gap-5">
                  <span className="text-[14px] sm:text-[20px]">
                    {index == 0
                      ? "₹50000"
                      : index == 1
                      ? "₹5000"
                      : index == 2
                      ? "₹500"
                      : ""}
                  </span>
                  <span>{score.time}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="sticky flex flex-col gap-2 justify-between bottom-0 p-4 px-8 -mx-8 backdrop-blur-md">
        <div className="flex justify-between">
          {latestIndex ? (
            <h1 className="text-white text-[16px] sm:text-[18px] font-semibold">
              RECENT ENTRY
            </h1>
          ) : (
            <>
              <span className="text-white text-[18px] font-semibold">
                No recent entries
              </span>
            </>
          )}
          <button
            onClick={() => setShowPopup(true)}
            className=" p-1 px-3 text-white font-bold bg-black bg-opacity-60 shadow-sm shadow-white rounded hover:scale-[1.02] transition-transform"
          >
            Add Score
          </button>
        </div>
        {latestIndex ? (
          <div>
            <div className="flex justify-between items-center bg-black bg-opacity-70  rounded-br-full  shadow-md shadow-blue-400">
              <span className="p-2 px-4 Z rounded-br-2xl text-black font-extrabold bg-white">
                {latestIndex + 1}
              </span>
              <div className="flex justify-between text-white text-[16px] sm:text-[20px]  font-bold px-8 w-full h-full">
                <span>{latestScore?.username}</span>

                <span>{latestScore?.time}</span>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {showPopup && <AddScorePopup onclose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Leaderboard;
