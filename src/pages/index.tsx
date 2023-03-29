import { Inter } from "next/font/google";
import dayjs from "dayjs";
import React, { useState } from "react";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  dayjs().format();
  // 取得目前時間
  const currentTime = dayjs(); // 等同 dayjs(new Date())

  // 透過 startOf 方法取得當前時間的星期日日期
  const [currentSunday, setCurrentSunday] = useState(
    currentTime.startOf("week")
  );

  // 宣告setLastWeekDays
  const [lastWeekDays, setLastWeekDays] = useState([]);

  //  迴圈算出每週七天的星期、日期
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

  const hoursAry = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  return (
    <>
      <main>
        <h1>{currentTime.format("YYYY MMMM")}</h1>
        <h1>{currentTime.get("date")}</h1>

        <div className="space-y-4">
          <ul className="flex text-center space-x-3  h-[376px] overflow-auto border hour-scrollbar">
            {weekDays.map(({ date, weekDay, isToday }) => (
              <li
                key={date}
                className={isToday ? "text-yellow-400" : "text-[#424242]"}
              >
                <div className="border-b-2 border-b-[#424242] w-[56px] py-3 px-[19px] space-y-1 fixed bg-white">
                  <p className="text-lg">{weekDay}</p>
                  <p className="text-base">{date}</p>
                </div>
                <div className="text-sm flex flex-col my-[10px] mt-[90px]">
                  {hoursAry.map((item, i) => {
                    return (
                      <>
                        <input
                          type="button"
                          value={item}
                          key={i}
                          className="px-[10px] py-[5px]"
                        />
                      </>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between w-[464px] ">
            <button
              className="py-3 text-sm text-[#424242] w-[220px] rounded-[10px] border-[1.5px] border-[#424242] font-semibold"
              onClick={handlePreviousClick}
            >
              上一週
            </button>
            <button
              className="py-3 text-sm text-[#424242] w-[220px] rounded-[10px] border-[1.5px] border-[#424242] font-semibold"
              onClick={handleNextClick}
            >
              下一週
            </button>
            <button
              className="py-3 text-sm text-[#424242] rounded-[10px] border-[1.5px] border-[#424242] font-semibold"
              onClick={handleTodayClick}
            >
              Today
            </button>
          </div>
          <div className="mt-10">
            <Link href="./indexClassData" className="py-3 text-sm text-[#424242] px-[60px] rounded-[10px] bg-[#FFEFCD] font-semibold">本地 Data</Link>
          </div>
        </div>
      </main>
    </>
  );
}
