"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";
import useLatest from "./useLatest";

const words = [
  { word: "Good", options: ["好的; 棒的", "坏的", "一般的"], correct: 0 },
  { word: "Bad", options: ["好的", "坏的; 糟糕的", "一般的"], correct: 1 },
  { word: "Average", options: ["好的", "坏的", "一般的; 中等的"], correct: 2 },
];

export default function LanguageQuiz() {
  const BaseTimeLeft = 15;
  const [timeLeft, setTimeLeft] = useState(BaseTimeLeft);
  const totalTime = 15;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const currentQuestionRef = useLatest(currentQuestion);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const selectedOptionsRef = useLatest(selectedOptions);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const goodRef = useRef<HTMLHeadingElement>(null);
  const [isLocked, setIsLocked] = useState(false);

  const [stopSignal, setStopSignal] = useState(false);
  useEffect(() => {
    if (timeLeft <= 0) return;
    console.log("dxz stopSignal", stopSignal);
    if (stopSignal) return;
    const timer = setTimeout(() => {
      if (
        currentQuestionRef.current <= words.length - 1 &&
        selectedOptionsRef.current.length < words.length
      ) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, stopSignal]);

  const progressPercentage = (selectedOptions.length / words.length) * 100;
  const timerPercentage = (timeLeft / totalTime) * 100;
  const handleOptionClick = (index: number) => {
    if (isLocked) return; // 如果选项已锁定，则不执行任何操作

    setSelectedOptions([...selectedOptions, index]);
    setIsLocked(true); // 锁定选项

    setStopSignal(true);
    setTimeout(() => {
      setStopSignal(false);

      if (currentQuestion < words.length - 1) {
        setTimeLeft(BaseTimeLeft);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // 撒花特效持续3秒
      }
      setIsLocked(false); // 解锁选项
    }, 500); // 0.5秒后切换到下一个单词
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOptions([]);
    setTimeLeft(totalTime);
  };

  const confettiSource = goodRef.current
    ? {
        x:
          goodRef.current.getBoundingClientRect().left +
          goodRef.current.offsetWidth / 2,
        y:
          goodRef.current.getBoundingClientRect().top +
          goodRef.current.offsetHeight / 2,
        w: 0,
        h: 0,
      }
    : undefined;

  return (
    <>
      <div className="w-full fixed top-0 left-0 px-4 py-2">
        <Progress
          value={progressPercentage}
          className="h-2 transition-all duration-500 rounded-full"
        />
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          当前进度 {selectedOptions.length}/{words.length}
        </span>
      </div>
      <div className="max-w-md mx-auto p-4 flex flex-col gap-6 mt-8">
        <Card className="p-8 flex flex-col items-center gap-6 border-0 shadow-none">
          <h2
            ref={goodRef}
            className="text-4xl font-bold font-heading tracking-tight"
          >
            {words[currentQuestion].word}
          </h2>

          <div className="relative">
            <svg className="w-14 h-14" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#eaeaea"
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * timerPercentage) / 100}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary text-base">{timeLeft}s</span>
            </div>
          </div>

          <div className="w-full space-y-3 mt-4">
            {words[currentQuestion].options.map((option, index) => (
              <OptionButton
                key={words[currentQuestion].word + index}
                label={String.fromCharCode(65 + index)}
                text={option}
                onClick={() => handleOptionClick(index)}
                isSelected={selectedOptions[currentQuestion] === index}
                isLocked={isLocked}
              />
            ))}
          </div>

          {showConfetti && (
            <Confetti
              width={width}
              height={height}
              confettiSource={confettiSource}
              numberOfPieces={500} // 增加撒花数量
              gravity={0.2} // 控制撒花的下落速度
              recycle={false} // 撒花一次后停止
            />
          )}
        </Card>
      </div>

      {selectedOptions.length === words.length && (
        <div className="mt-8">
          <h3 className="text-xl font-bold">结果</h3>
          {words.map((word, index) => (
            <div key={index} className="mt-2">
              <span>{word.word}: </span>
              <span
                className={
                  selectedOptions[index] === word.correct
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {selectedOptions[index] === word.correct ? "正确" : "错误"}
              </span>
              <div>
                <span>选项: </span>
                {word.options.map((option, i) => (
                  <span
                    key={i}
                    className={i === selectedOptions[index] ? "font-bold" : ""}
                  >
                    {String.fromCharCode(65 + i)}. {option}{" "}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <Button onClick={handleRestart} className="w-full rounded-xl mt-4">
            重新开始
          </Button>
        </div>
      )}
    </>
  );
}

function OptionButton({
  label,
  text,
  onClick,
  isSelected,
  isLocked,
}: {
  label: string;
  text: string;
  onClick: () => void;
  isSelected: boolean;
  isLocked: boolean;
}) {
  return (
    <Button
      variant="outline"
      className={`w-full justify-start h-auto py-4 px-4 font-normal text-base rounded-xl ${
        isSelected ? "bg-black text-white" : ""
      }`}
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
    >
      <span className="text-primary mr-2">{label}.</span> {text}
    </Button>
  );
}
