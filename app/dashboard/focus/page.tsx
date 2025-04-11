import { PomodoroTimer } from "@/components/pomodoro/pomodoro-timer"

export default function FocusPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Focus Mode</h1>
        <p className="text-gray-500">Use the Pomodoro Technique to stay focused and productive</p>
      </div>
      <div className="mt-8">
        <PomodoroTimer />
      </div>
      <div className="mt-8 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">How to Use the Pomodoro Technique</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Choose a task you want to work on</li>
          <li>Start the timer and focus on the task for 25 minutes</li>
          <li>When the timer rings, take a short 5-minute break</li>
          <li>After four pomodoros, take a longer break (15-30 minutes)</li>
          <li>Repeat the process</li>
        </ol>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-medium mb-2">Benefits of the Pomodoro Technique</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Improves focus and concentration</li>
            <li>Reduces mental fatigue</li>
            <li>Increases productivity and efficiency</li>
            <li>Helps maintain a healthy work-life balance</li>
            <li>Makes large tasks more manageable</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
