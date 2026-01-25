"use client"

import React from "react"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <span className="text-sm tracking-[0.3em] text-primary-foreground/70 mb-4 block">
          STAY CONNECTED
        </span>
        <h2 className="font-serif text-3xl md:text-5xl mb-6">
          Join Our World
        </h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed mb-10">
          Subscribe to receive exclusive access to new arrivals, private sales, and curated style inspirations.
        </p>

        {subscribed ? (
          <div className="flex items-center justify-center gap-3 text-lg">
            <Check className="w-6 h-6" />
            <span>Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 bg-transparent border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-8 py-4 text-sm font-medium tracking-wide hover:bg-primary-foreground/90 transition-colors"
            >
              SUBSCRIBE
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-xs text-primary-foreground/50 mt-6">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      </div>
    </section>
  )
}
