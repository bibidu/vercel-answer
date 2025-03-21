import React from "react";
import Link from "next/link";
import { Settings } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white relative">
      <Link href="/settings" className="absolute top-4 right-4">
        <Settings className="w-6 h-6 text-black cursor-pointer" />
      </Link>
      
      <div className="flex flex-col items-center justify-center flex-1 w-full p-4">
        <h1 className="text-3xl font-bold mb-4 font-heading">已打卡天数</h1>
        <p className="text-6xl font-extrabold font-heading">3</p>
        <div className="bg-white shadow-md rounded-lg p-4 mt-4 w-80 border border-black">
          <div className="flex items-center">
            <svg className="w-20 h-20 mr-4" viewBox="0 0 100 100">
              <rect
                x="20"
                y="10"
                width="60"
                height="80"
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
              <line
                x1="20"
                y1="10"
                x2="20"
                y2="90"
                stroke="black"
                strokeWidth="2"
              />
              <line
                x1="80"
                y1="10"
                x2="80"
                y2="90"
                stroke="black"
                strokeWidth="2"
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                fill="black"
                fontSize="12"
              >
                CET4
              </text>
            </svg>
            <div className="flex-1">
              <h2 className="text-lg font-semibold font-heading">四级词汇书</h2>

              <div className="relative mt-2">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-black rounded-full"
                    style={{ width: "10%" }}
                  ></div>
                </div>
                <div className=" w-full text-sm text-right mt-1">3/321</div>
              </div>
            </div>
          </div>
        </div>
        <Link href="/answer" className="w-full mt-6">
          <button className="w-full fixed bottom-0 inset-x-0 bg-black text-white py-4 px-4 font-heading hover:bg-gray-800 transition duration-200">
            开始学习
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
