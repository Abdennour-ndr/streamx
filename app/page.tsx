'use client'

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const { toast } = useToast()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">StreamX</h1>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="outline" onClick={() => toast({
              title: "Coming Soon",
              description: "Sign up feature will be available soon!",
            })}>
              Sign Up
            </Button>
            <Button onClick={() => toast({
              title: "Coming Soon",
              description: "Login feature will be available soon!",
            })}>
              Login
            </Button>
          </div>
        </div>
      </header>

      <main className="container pt-32">
        <section className="flex flex-col items-center justify-center gap-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Watch Movies & TV Shows
            <br />
            <span className="text-primary">Anytime, Anywhere</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            StreamX offers unlimited access to thousands of movies and TV shows. 
            Watch on your favorite devices with stunning 4K quality.
          </p>
          <div className="flex gap-4">
            <Button size="lg" onClick={() => toast({
              title: "Coming Soon",
              description: "Start your free trial today!",
            })}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => toast({
              title: "Coming Soon",
              description: "Learn more about our plans!",
            })}>
              Learn More
            </Button>
          </div>
        </section>

        <section className="mt-32 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="text-xl font-semibold">4K Quality</h3>
            <p className="mt-2 text-muted-foreground">
              Enjoy crystal clear 4K streaming on all your devices.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="text-xl font-semibold">No Ads</h3>
            <p className="mt-2 text-muted-foreground">
              Watch your favorite content without any interruptions.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="text-xl font-semibold">Download & Go</h3>
            <p className="mt-2 text-muted-foreground">
              Download movies and shows to watch offline.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="text-xl font-semibold">Multiple Devices</h3>
            <p className="mt-2 text-muted-foreground">
              Watch on your phone, tablet, laptop, or TV.
            </p>
          </div>
        </section>

        <section className="mt-32">
          <h2 className="text-center text-3xl font-bold">Choose Your Plan</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
              <h3 className="text-xl font-semibold">Basic</h3>
              <p className="mt-2 text-3xl font-bold">$9.99<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              <ul className="mt-4 space-y-2">
                <li>HD Quality</li>
                <li>1 Screen</li>
                <li>Limited Downloads</li>
              </ul>
              <Button className="mt-6 w-full" onClick={() => toast({
                title: "Coming Soon",
                description: "Basic plan will be available soon!",
              })}>Get Started</Button>
            </div>
            <div className="rounded-lg border-2 border-primary bg-card p-8 text-card-foreground shadow-sm">
              <h3 className="text-xl font-semibold">Premium</h3>
              <p className="mt-2 text-3xl font-bold">$14.99<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              <ul className="mt-4 space-y-2">
                <li>4K Quality</li>
                <li>4 Screens</li>
                <li>Unlimited Downloads</li>
              </ul>
              <Button className="mt-6 w-full" onClick={() => toast({
                title: "Coming Soon",
                description: "Premium plan will be available soon!",
              })}>Get Started</Button>
            </div>
            <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
              <h3 className="text-xl font-semibold">Family</h3>
              <p className="mt-2 text-3xl font-bold">$19.99<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              <ul className="mt-4 space-y-2">
                <li>4K Quality</li>
                <li>6 Screens</li>
                <li>Unlimited Downloads</li>
              </ul>
              <Button className="mt-6 w-full" onClick={() => toast({
                title: "Coming Soon",
                description: "Family plan will be available soon!",
              })}>Get Started</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-32 border-t">
        <div className="container py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold">StreamX</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your ultimate streaming destination.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Support</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li>Help Center</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Connect</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li>Twitter</li>
                <li>Facebook</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2024 StreamX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
} 