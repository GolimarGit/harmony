import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <span className="text-xl font-bold text-rose-500">Harmony</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" prefetch={true}>
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup" prefetch={true}>
              <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                Start for free
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Clarity, finally.
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join 50+ million professionals who simplify work and life with the world&apos;s #1 to-do list app.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup" prefetch={true}>
                    <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                      Start for free
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-gray-500">Calm the chaos in a matter of minutes!</p>
              </div>
              <div className="mx-auto lg:mx-0 lg:flex lg:justify-center">
                <div className="rounded-lg border bg-white p-4 shadow-lg">
                  <img
                    alt="Harmony App Interface"
                    className="aspect-video overflow-hidden rounded-lg object-cover"
                    src="/placeholder.svg?height=600&width=800"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Features that simplify your life
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  TaskMaster helps you organize your tasks, collaborate with others, and stay on top of your deadlines.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-rose-100 p-2">
                  <CheckCircle2 className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold">Task Management</h3>
                <p className="text-center text-gray-500">Create, organize, and prioritize your tasks with ease.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-rose-100 p-2">
                  <CheckCircle2 className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold">Projects & Labels</h3>
                <p className="text-center text-gray-500">
                  Organize tasks into projects and use labels for better organization.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-rose-100 p-2">
                  <CheckCircle2 className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold">Due Dates & Reminders</h3>
                <p className="text-center text-gray-500">Never miss a deadline with due dates and reminders.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What people are saying</h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <p className="text-center text-gray-500">"Simple, straightforward, and super powerful"</p>
                <p className="font-medium">The Verge</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <p className="text-center text-gray-500">"The best to-do list app on the market"</p>
                <p className="font-medium">PC Mag</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <p className="text-center text-gray-500">"Nothing short of stellar"</p>
                <p className="font-medium">TechRadar</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-rose-500">Harmony</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 Harmony. All rights reserved.</p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="text-sm font-medium">Company</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm hover:underline" prefetch={false}>
                About
              </Link>
              <Link href="#" className="text-sm hover:underline" prefetch={false}>
                Careers
              </Link>
              <Link href="#" className="text-sm hover:underline" prefetch={false}>
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="text-sm font-medium">Help</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm hover:underline" prefetch={false}>
                Support
              </Link>
              <Link href="#" className="text-sm hover:underline" prefetch={false}>
                Terms
              </Link>
              <Link href="#" className="text-sm hover:underline" prefetch={false}>
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
