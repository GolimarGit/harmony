"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"

type PomodoroState = "idle" | "work" | "shortBreak" | "longBreak"

interface PomodoroContextType {
  state: PomodoroState
  timeLeft: number
  isActive: boolean
  pomodorosCompleted: number
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  skipToNext: () => void
  settings: {
    workDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    longBreakInterval: number
  }
  updateSettings: (settings: {
    workDuration?: number
    shortBreakDuration?: number
    longBreakDuration?: number
    longBreakInterval?: number
  }) => void
}

const defaultSettings = {
  workDuration: 25 * 60, // 25 minutes in seconds
  shortBreakDuration: 5 * 60, // 5 minutes in seconds
  longBreakDuration: 15 * 60, // 15 minutes in seconds
  longBreakInterval: 4, // After 4 pomodoros, take a long break
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined)

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PomodoroState>("idle")
  const [timeLeft, setTimeLeft] = useState(defaultSettings.workDuration)
  const [isActive, setIsActive] = useState(false)
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0)
  const [settings, setSettings] = useState(defaultSettings)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3")
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Timer logic
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Timer completed
            playNotification()
            handleTimerComplete()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isActive])

  const playNotification = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing notification sound:", error)
      })
    }

    // Also show a browser notification if permission is granted
    if (Notification.permission === "granted") {
      const message = state === "work" ? "Work session completed! Take a break." : "Break time is over. Back to work!"

      new Notification("Harmony Pomodoro", {
        body: message,
        icon: "/favicon.ico",
      })
    }
  }

  const handleTimerComplete = () => {
    setIsActive(false)

    if (state === "work") {
      const newPomodorosCompleted = pomodorosCompleted + 1
      setPomodorosCompleted(newPomodorosCompleted)

      // Determine if we should take a long break or a short break
      if (newPomodorosCompleted % settings.longBreakInterval === 0) {
        setState("longBreak")
        setTimeLeft(settings.longBreakDuration)
      } else {
        setState("shortBreak")
        setTimeLeft(settings.shortBreakDuration)
      }
    } else {
      // After any break, go back to work
      setState("work")
      setTimeLeft(settings.workDuration)
    }
  }

  const startTimer = () => {
    if (state === "idle") {
      setState("work")
      setTimeLeft(settings.workDuration)
    }
    setIsActive(true)

    // Request notification permission if not already granted
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission()
    }
  }

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    if (state === "work") {
      setTimeLeft(settings.workDuration)
    } else if (state === "shortBreak") {
      setTimeLeft(settings.shortBreakDuration)
    } else if (state === "longBreak") {
      setTimeLeft(settings.longBreakDuration)
    }
  }

  const skipToNext = () => {
    setIsActive(false)
    handleTimerComplete()
  }

  const updateSettings = (newSettings: {
    workDuration?: number
    shortBreakDuration?: number
    longBreakDuration?: number
    longBreakInterval?: number
  }) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings }

      // Update timeLeft based on current state
      if (state === "work") {
        setTimeLeft(updated.workDuration)
      } else if (state === "shortBreak") {
        setTimeLeft(updated.shortBreakDuration)
      } else if (state === "longBreak") {
        setTimeLeft(updated.longBreakDuration)
      }

      return updated
    })
  }

  const value = {
    state,
    timeLeft,
    isActive,
    pomodorosCompleted,
    startTimer,
    pauseTimer,
    resetTimer,
    skipToNext,
    settings,
    updateSettings,
  }

  return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>
}

export function usePomodoro() {
  const context = useContext(PomodoroContext)
  if (context === undefined) {
    throw new Error("usePomodoro must be used within a PomodoroProvider")
  }
  return context
}
