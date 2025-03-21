"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Switch } from "@radix-ui/react-switch";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Input } from "@/components/ui/input";
import { AlignJustify } from "lucide-react";

// 定义设置项的接口
export interface SettingsData {
  colorTheme: string;
  showTimer: boolean;
  timerDuration: number;
  autoSwitch: boolean;
  showProgress: boolean;
  respondInRealTime: boolean;
}

// 默认设置
export const defaultSettings: SettingsData = {
  colorTheme: "dark",
  showTimer: false,
  timerDuration: 15,
  autoSwitch: false,
  showProgress: false,
  respondInRealTime: false,
};

const CustomSwitch = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => {
  return (
    <div className="relative">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={`w-12 h-6 ${
          checked ? "bg-black" : "bg-white"
        } border border-gray-300 bg-gray-300 data-[state=checked]:bg-black rounded-full relative inline-flex items-center`}
      >
        <span
          className={`block w-4 h-4 bg-white rounded-full absolute transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </Switch>
    </div>
  );
};

const SettingsPage = () => {
  // 状态管理
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // 从缓存加载设置
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem("settings");
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings(parsedSettings);
        }
      } catch (error) {
        console.error("Failed to load settings from localStorage:", error);
      }
      setSettingsLoaded(true);
    };

    loadSettings();
  }, []);

  // 更新设置并保存到缓存
  const updateSettings = (newSettings: Partial<SettingsData>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    try {
      localStorage.setItem("settings", JSON.stringify(updatedSettings));
    } catch (error) {
      console.error("Failed to save settings to localStorage:", error);
    }
  };

  // 处理倒计时时间输入
  const handleTimerDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      updateSettings({ timerDuration: Math.min(value, 15) });
    } else if (e.target.value === "") {
      // 允许清空输入框，但不更新状态
      e.target.value = "";
    } else {
      // 如果输入无效或为0，恢复到之前的值
      e.target.value = settings.timerDuration.toString();
    }
  };

  // 获取主题颜色的显示名称
  const getColorThemeName = (theme: string) => {
    switch (theme) {
      case "dark":
        return "黑色";
      case "light":
        return "白色";
      default:
        return theme;
    }
  };

  // 如果设置尚未加载，显示加载状态
  if (!settingsLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">加载中...</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-8">设置</h1>

      {/* 当前设置的摘要 */}
      {/* <div className="mb-6 p-3 bg-gray-50 rounded-md text-sm">
        <h3 className="font-semibold mb-2">当前设置</h3>
        <p>主题: {getColorThemeName(settings.colorTheme)}</p>
        <p>倒计时: {settings.showTimer ? "开启" : "关闭"}</p>
        {settings.showTimer && (
          <>
            <p>倒计时时间: {settings.timerDuration}秒</p>
            <p>自动切换: {settings.autoSwitch ? "开启" : "关闭"}</p>
          </>
        )}
        <p>显示进度: {settings.showProgress ? "开启" : "关闭"}</p>
        <p>显示正确结果: {settings.respondInRealTime ? "开启" : "关闭"}</p>
      </div> */}

      {/* 基础设置部分 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">基础</h2>

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="text-sm">主题配色</label>
          </div>

          <div className="ml-4 mt-2 p-3 bg-gray-100 rounded-md">
            <RadioGroup.Root
              value={settings.colorTheme}
              onValueChange={(value) => {
                updateSettings({ colorTheme: value });
              }}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-16 h-8 bg-black rounded-md"></div>
                <RadioGroup.Item
                  value="dark"
                  id="dark"
                  className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center bg-white"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      settings.colorTheme === "dark"
                        ? "bg-black"
                        : "bg-gray-300"
                    }`}
                  />
                </RadioGroup.Item>
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="w-16 h-8 bg-white border border-gray-300 rounded-md"></div>
                <RadioGroup.Item
                  value="light"
                  id="light"
                  className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center bg-white"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      settings.colorTheme === "light"
                        ? "bg-black"
                        : "bg-gray-300"
                    }`}
                  />
                </RadioGroup.Item>
              </div> */}
            </RadioGroup.Root>
          </div>
        </div>
      </div>

      {/* 答题设置部分 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">答题</h2>

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="text-sm">倒计时</label>
          </div>

          {/* 子选项容器 - 只在showTimer为true时显示 */}

          <div className="ml-4 mt-2 p-3 bg-gray-100 rounded-md">
            <div className="flex justify-between items-center">
              <label className="text-sm">展示</label>
              <CustomSwitch
                checked={settings.showTimer}
                onCheckedChange={(checked) =>
                  updateSettings({
                    showTimer: checked,
                    ...(checked
                      ? {
                          timerDuration: defaultSettings.timerDuration,
                          autoSwitch: defaultSettings.autoSwitch,
                        }
                      : {
                          autoSwitch: false,
                          timerDuration: 0,
                        }),
                  })
                }
              />
            </div>

            {settings.showTimer && (
              <>
                <div className="my-3 flex justify-between items-center">
                  <label className="text-sm">倒计时时间</label>
                  <Input
                    type="number"
                    value={settings.timerDuration}
                    onChange={handleTimerDurationChange}
                    className="w-16 h-8 border border-gray-300 focus:border-transparent focus:ring-0  focus:outline-none text-center"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm">归零后自动切下一题</label>
                  <CustomSwitch
                    checked={settings.autoSwitch}
                    onCheckedChange={(checked) =>
                      updateSettings({ autoSwitch: checked })
                    }
                  />
                </div>
              </>
            )}
          </div>
          <div className="w-full mt-1 mb-4 flex justify-center">
            <AlignJustify className="text-gray-300  w-4 h-4" />
          </div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-sm">展示进度条</label>
          <CustomSwitch
            checked={settings.showProgress}
            onCheckedChange={(checked) =>
              updateSettings({ showProgress: checked })
            }
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-sm">实时展示题目结果</label>
          <CustomSwitch
            checked={settings.respondInRealTime}
            onCheckedChange={(checked) =>
              updateSettings({ respondInRealTime: checked })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
