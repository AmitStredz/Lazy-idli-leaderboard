import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addScore } from "../store/leaderboardSlice";
import { IoClose } from "react-icons/io5";

interface AddScorePopupProps {
  onclose: () => void;
}

const AddScorePopup: React.FC<AddScorePopupProps> = ({ onclose }) => {
  const [username, setUsername] = useState("");
  const [time, setTime] = useState("");
  const dispatch = useDispatch();
  const [timeError, setTimeError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  const handleSubmit = () => {
    
    if (!username.trim()) {
      setNameError("Enter valid username...");
      return;
    }
    if (!isValidTimeFormat(time)) {
      setNameError("");
      setTimeError("Enter valid time...");
      return;
    }

    dispatch(addScore({ username, time }));
    setUsername("");
    setTime("");
    onclose();
  };

  // `^([0-9]{2}):([0-9]{2}):([0-9]{2})$`

  const isValidTimeFormat = (time: string): boolean => {
    const timePattern = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
    return timePattern.test(time);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setTimeError("");
    setNameError("");

    const { value } = e.target;
    const cleanValue = value.replace(/[^0-9]/g, ""); // Remove all non-numeric characters

    console.log("Cleanvalue: ", cleanValue);
    if (cleanValue.length < 2) {
      setTime(cleanValue);
    } else if (cleanValue.length == 2) {
      setTime(`${cleanValue}:`);
    } else if (cleanValue.length == 4) {
      setTime(`${cleanValue.slice(0, 2)}:${cleanValue.slice(2)}:`);
    } else if (cleanValue.length == 6) {
      setTime(
        `${cleanValue.slice(0, 2)}:${cleanValue.slice(2, 4)}:${cleanValue.slice(
          4,
          6
        )}`
      );
    } else {
      setTime(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-5 bg-black bg-opacity-50 "
      data-aos="fade-in"
    >
      <div
        className="flex flex-col gap-2 p-4 rounded-lg shadow-lg bg-white bg-opacity-70 w-96"
        data-aos="zoom-in"
      >
        <div className="flex justify-between">
          <h2 className="text-2xl">Add Score</h2>
          <IoClose
            className="cursor-pointer text-2xl hover:scale-105"
            onClick={onclose}
          />
        </div>
        <div className="w-full">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="p-2 w-full outline-none border-2 border-slate-500"
        />
        {nameError ? (
            <span className="text-red-500 text-[14px] font-semibold">
              {nameError}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="MM:SS::MSS"
            value={time}
            onChange={handleTimeChange}
            maxLength={8}
            className="p-2 w-full outline-none border-2 border-slate-500"
            onKeyDown={handleKeyDown}
          />
          {timeError ? (
            <span className="text-red-500 text-[14px] font-semibold">
              {timeError}
            </span>
          ) : (
            ""
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="text-white p-2 px-10 bg-black bg-opacity-70  rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddScorePopup;
