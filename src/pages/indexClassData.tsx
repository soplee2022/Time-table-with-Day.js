import React, { useEffect, useState } from "react";
import { weekData } from "./data";
import Link from "next/link";

export default function Home() {
  // 計算週數
  const [weekNum, setWeekNum] = useState(0);
  const [nextWeek, setNextWeek] = useState(weekData[0].weekDataAry);
  useEffect(() => {
    setNextWeek(weekData[weekNum].weekDataAry);
  }, [weekNum]);

  // 點擊按鈕時，取得下週所有時段
  const getNextWeek = () => {
    setWeekNum((prev) => {
      return prev + 1;
    });
  };

  // 點擊按鈕時，取得上週所有時段
  const getPreviousWeek = () => {
    if (weekNum > 0) {
      setWeekNum((prev) => {
        return prev - 1;
      });
    }
  };

  return (
    <>
      <main className="bg-[#FFFCF6]">
        <h1 className=" text-4xl py-3 px-[19px] space-y-1 bg-[#FFFCF6]">
          模擬接 API
        </h1>

        <div className="space-y-4">
          <ul className="flex text-center space-x-3  h-[376px] overflow-auto border hour-scrollbar">
            {nextWeek.map((item, i) => (
              <li key={i}>
                <div className="border-b-2 border-b-[#424242] w-[56px] py-3 px-[19px] space-y-1 fixed bg-[#FFFCF6]">
                  <p className="text-lg">{item.weekDay}</p>
                  <p className="text-base">{item.date}</p>
                </div>
                <div className="text-sm flex flex-col my-[10px] mt-[90px]">
                  {item.hours.map((item, i) => {
                    return (
                      <>
                        <input
                          type="button"
                          value={item.time}
                          key={i}
                          className={`px-[10px] py-[5px] ${
                            item.available ? "text-[#424242]" : "text-[#D0D0D0]"
                          }`}
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
              onClick={getPreviousWeek}
            >
              上一週
            </button>
            <button
              className="py-3 text-sm text-[#424242] w-[220px] rounded-[10px] border-[1.5px] border-[#424242] font-semibold"
              onClick={getNextWeek}
            >
              下一週
            </button>
          </div>
          <div className="mt-10">
            <Link
              href="./"
              className="py-3 text-sm text-[#424242] px-[60px] rounded-[10px] bg-[#FFEFCD] font-semibold"
            >
              前端 Day.js
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
