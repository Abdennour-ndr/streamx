import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl">
              Your Ultimate Streaming Experience
            </h1>
            <p className="mb-8 max-w-2xl text-xl text-gray-300">
              StreamX brings together movies, series, live streaming, and creator content in one platform. Experience entertainment like never before.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">View Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Why Choose StreamX?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">4K & HDR Content</h3>
              <p className="text-muted-foreground">
                Enjoy your favorite content in stunning 4K resolution with HDR support for the best viewing experience.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">Live Streaming</h3>
              <p className="text-muted-foreground">
                Watch live events and interact with creators in real-time with ultra-low latency streaming.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">Creator Platform</h3>
              <p className="text-muted-foreground">
                Join our creator community and monetize your content with multiple revenue streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Featured Content</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {/* Content cards will be added here */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold">Ready to Start Streaming?</h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Join millions of users enjoying StreamX today.
          </p>
          <Button size="lg" asChild>
            <Link href="/sign-up">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </main>
  )
} 