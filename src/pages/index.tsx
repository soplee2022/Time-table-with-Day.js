import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import dayjs from "dayjs";
import React, { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  dayjs().format();
  // 取得目前時間
  const now = dayjs(); // 等同 dayjs(new Date())
  // console.log(now);
  // console.log(now.format("YYYY-MM-DD HH:mm"));

  // 取得當前時間
  const currentTime = dayjs();

    // 透過 startOf 方法取得當前時間的星期日日期
    const [currentSunday, setCurrentSunday] = useState(
      currentTime.startOf("week")
    );
  
    // 宣告setLastWeekDays
    const [lastWeekDays, setLastWeekDays] = useState([]);
  

    const weekDayText = ["日", "一", "二", "三", "四", "五", "六"];
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = currentSunday.add(i, "day");
      const date = day.format("DD");
      const weekDayIndex = day.day();
      const weekDay = weekDayText[weekDayIndex];
      const isToday = currentTime.isSame(day, "day");
      weekDays.push({
        date,
        weekDay,
        isToday,
      });
    }
  
    // 點擊按鈕時，取得下週當天的日期
    const handleNextClick = () => {
      const nextWeek = currentSunday.add(7, "day");
      setCurrentSunday(nextWeek);
    };
  
    // 點擊按鈕時，取得上週當天的日期
    const handlePreviousClick = () => {
      const previousWeek = currentSunday.subtract(7, "day");
      setCurrentSunday(previousWeek);
  
      // 利用迴圈，推算出上週所有的日期
      const previousWeekDays = [];
      for (let i = 0; i < 7; i++) {
        const day = previousWeek.add(i, "day");
        const date = day.format("YYYY-MM-DD");
        const weekDay = day.format("dddd");
        const isToday = currentTime.isSame(day, "day");
        previousWeekDays.push({
          date,
          weekDay,
          isToday,
        });
      }
      setLastWeekDays(previousWeekDays);
    };
  
    // 點擊 Today 按鈕，將日曆回到本週
    const handleTodayClick = () => {
      const today = dayjs().startOf("week");
      setCurrentSunday(today);
    };
  

  return (
    <>
      <main>
        <h1>{now.format("YYYY-MM-DD HH:mm")}</h1>
        <div className="space-y-4">
          <ul className="flex text-center space-x-3">
            {weekDays.map(({ date, weekDay, isToday }) => (
              <li
                key={date}
                className={isToday ? "text-yellow-400" : "text-[#424242]"}
              >
                <div className="border-b-2 border-b-[#424242] w-[56px] py-3 px-[19px] space-y-1">
                  <p className="text-lg">{weekDay}</p>
                  <p className="text-base">{date}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="space-x-5">
            <button
              className="bg-gray-500 p-3 text-base text-white"
              onClick={handlePreviousClick}
            >
              Previous Week
            </button>

            <button
              className="bg-gray-500 p-3 text-base text-white"
              onClick={handleTodayClick}
            >
              Today
            </button>
            <button
              className="bg-gray-500 p-3 text-base text-white"
              onClick={handleNextClick}
            >
              Next Week
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
