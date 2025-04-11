import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <span className="text-2xl md:text-3xl font-bold text-rose-500">Harmony</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-base md:text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
              Features
            </Link>
            <Link href="#pricing" className="text-base md:text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-base md:text-lg font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" prefetch={true}>
              <Button variant="ghost" size="default" className="text-base">
                Log in
              </Button>
            </Link>
            <Link href="/signup" prefetch={true}>
              <Button size="default" className="bg-rose-500 hover:bg-rose-600 text-base">
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
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl">
                    Clarity, finally.
                  </h1>
                  <p className="max-w-[600px] text-lg md:text-xl lg:text-2xl text-muted-foreground">
                    Join 50+ million professionals who simplify work and life with the world&apos;s #1 to-do list app.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup" prefetch={true}>
                    <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-base md:text-lg">
                      Start for free
                    </Button>
                  </Link>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">Calm the chaos in a matter of minutes!</p>
              </div>
              <div className="mx-auto lg:mx-0 lg:flex lg:justify-center">
                <div className="rounded-lg border border-border bg-card p-4 shadow-lg">
                  <img
                    alt="Harmony App Interface"
                    className="aspect-video overflow-hidden rounded-lg object-cover"
                    src="/placeholder.png?height=600&width=800"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-5xl">
                  Features that simplify your life
                </h2>
                <p className="max-w-[900px] text-lg md:text-xl lg:text-2xl text-muted-foreground">
                  TaskMaster helps you organize your tasks, collaborate with others, and stay on top of your deadlines.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border p-6">
                <div className="rounded-full bg-rose-500/20 p-3">
                  <CheckCircle2 className="h-7 w-7 text-rose-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Task Management</h3>
                <p className="text-center text-base md:text-lg text-muted-foreground">
                  Create, organize, and prioritize your tasks with ease.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border p-6">
                <div className="rounded-full bg-rose-500/20 p-3">
                  <CheckCircle2 className="h-7 w-7 text-rose-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Projects & Labels</h3>
                <p className="text-center text-base md:text-lg text-muted-foreground">
                  Organize tasks into projects and use labels for better organization.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border p-6">
                <div className="rounded-full bg-rose-500/20 p-3">
                  <CheckCircle2 className="h-7 w-7 text-rose-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Due Dates & Reminders</h3>
                <p className="text-center text-base md:text-lg text-muted-foreground">
                  Never miss a deadline with due dates and reminders.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-5xl">
                  What people are saying
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-10">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border p-6">
                <p className="text-center text-base md:text-lg text-muted-foreground">
                  "Simple, straightforward, and super powerful"
                </p>
                <p className="text-base md:text-lg font-medium">The Verge</p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border p-6">
                <p className="text-center text-base md:text-lg text-muted-foreground">
                  "The best to-do list app on the market"
                </p>
                <p className="text-base md:text-lg font-medium">PC Mag</p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border p-6">
                <p className="text-center text-base md:text-lg text-muted-foreground">
                  "Nothing short of stellar"
                </p>
                <p className="text-base md:text-lg font-medium">TechRadar</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-bold text-rose-500">Harmony</span>
            </div>
            <p className="text-base text-muted-foreground">© 2025 Harmony. All rights reserved.</p>
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            <h3 className="text-base md:text-lg font-medium">Company</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-base hover:underline text-muted-foreground" prefetch={false}>
                About
              </Link>
              <Link href="#" className="text-base hover:underline text-muted-foreground" prefetch={false}>
                Careers
              </Link>
              <Link href="#" className="text-base hover:underline text-muted-foreground" prefetch={false}>
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            <h3 className="text-base md:text-lg font-medium">Help</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-base hover:underline text-muted-foreground" prefetch={false}>
                Support
              </Link>
              <Link href="#" className="text-base hover:underline text-muted-foreground" prefetch={false}>
                Terms
              </Link>
              <Link href="#" className="text-base hover:underline text-muted-foreground" prefetch={false}>
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}