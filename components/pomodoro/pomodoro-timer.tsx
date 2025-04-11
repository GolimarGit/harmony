"use client"

import { useState } from "react"
import { usePomodoro } from "@/contexts/pomodoro-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipForward, RefreshCw, Settings } from "lucide-react"
import { PomodoroSettings } from "./pomodoro-settings"

export function PomodoroTimer() {
  const { state, timeLeft, isActive, pomodorosCompleted, startTimer, pauseTimer, resetTimer, skipToNext } =
    usePomodoro()

  const [showSettings, setShowSettings] = useState(false)

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Get state label and color
  const getStateInfo = () => {
    switch (state) {
      case "work":
        return { label: "Focus", color: "bg-rose-500 hover:bg-rose-600" }
      case "shortBreak":
        return { label: "Short Break", color: "bg-green-500 hover:bg-green-600" }
      case "longBreak":
        return { label: "Long Break", color: "bg-blue-500 hover:bg-blue-600" }
      default:
        return { label: "Ready", color: "bg-gray-500 hover:bg-gray-600" }
    }
  }

  const stateInfo = getStateInfo()

  return (
    <Card className="w-full max-w-md mx-auto border-border">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pomodoro Timer</CardTitle>
          <Badge variant="outline">{stateInfo.label}</Badge>
        </div>
        <CardDescription>Stay focused with timed work sessions and breaks</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="text-6xl font-bold my-8 font-mono">{formatTime(timeLeft)}</div>
        <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-muted-foreground">Pomodoros completed:</span>
          <Badge variant="secondary">{pomodorosCompleted}</Badge>
        </div>
        <div className="flex gap-2 mt-4">
          {!isActive ? (
            <Button onClick={startTimer} className={stateInfo.color}>
              <Play className="mr-2 h-4 w-4" />
              {state === "idle" ? "Start" : "Resume"}
            </Button>
          ) : (
            <Button onClick={pauseTimer} variant="outline">
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </Button>
          )}
          <Button onClick={resetTimer} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={skipToNext} variant="outline">
            <SkipForward className="mr-2 h-4 w-4" />
            Skip
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </CardFooter>

      <PomodoroSettings open={showSettings} onOpenChange={setShowSettings} />
    </Card>
  )
}
