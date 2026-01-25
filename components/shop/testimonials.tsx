"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "The quality and attention to detail is unmatched. Every piece I've purchased has become a cherished part of my wardrobe.",
    author: "Alexandra Chen",
    role: "Fashion Editor",
    publication: "Vogue",
  },
  {
    id: 2,
    quote: "MAISON represents what luxury should be — thoughtful, timeless, and beautifully crafted. I recommend them to everyone.",
    author: "James Morrison",
    role: "Creative Director",
    publication: "Elle Décor",
  },
  {
    id: 3,
    quote: "Exceptional customer service paired with products that exceed expectations. A truly premium shopping experience.",
    author: "Sophie Laurent",
    role: "Style Consultant",
    publication: "Harper's Bazaar",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block">
            RECOGNITION
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            What They Say
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 text-center px-4"
                >
                  <Quote className="w-12 h-12 text-accent/20 mx-auto mb-8" />
                  <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed mb-8 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.publication}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="p-3 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    current === index ? "bg-foreground w-6" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="p-3 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
