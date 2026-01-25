"use client"

import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="Luxury lifestyle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <span className="inline-block text-sm tracking-[0.3em] text-card-foreground/80 mb-6 font-medium">
          NEW COLLECTION 2026
        </span>
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-card leading-tight mb-8 text-balance">
          Timeless Elegance Meets Modern Design
        </h2>
        <p className="text-lg md:text-xl text-card/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Discover our curated collection of luxury goods, crafted with exceptional attention to detail and timeless aesthetics.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#shop"
            className="group inline-flex items-center gap-3 bg-card text-card-foreground px-8 py-4 text-sm font-medium tracking-wide hover:bg-card/90 transition-all duration-300"
          >
            EXPLORE COLLECTION
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-3 border border-card text-card px-8 py-4 text-sm font-medium tracking-wide hover:bg-card hover:text-card-foreground transition-all duration-300"
          >
            OUR STORY
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-card/80">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-card/50" />
        </div>
      </div>
    </section>
  )
}
