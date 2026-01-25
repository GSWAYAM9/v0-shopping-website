"use client"

import { ArrowRight } from "lucide-react"

const collections = [
  {
    id: 1,
    title: "Timeless Accessories",
    description: "Elevate your everyday with our curated selection of luxury accessories.",
    image: "/products/product-1.jpg",
    count: 24,
  },
  {
    id: 2,
    title: "Designer Eyewear",
    description: "Discover frames that blend sophistication with modern style.",
    image: "/products/product-2.jpg",
    count: 18,
  },
  {
    id: 3,
    title: "Home & Living",
    description: "Transform your space with artisan-crafted décor pieces.",
    image: "/products/product-7.jpg",
    count: 32,
  },
]

export function Collections() {
  return (
    <section id="collections" className="py-20 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block">
            EXPLORE
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            Our Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Thoughtfully curated collections that reflect the essence of modern luxury and timeless sophistication.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <a
              key={collection.id}
              href={`#collection-${collection.id}`}
              className={`group relative overflow-hidden bg-background ${
                index === 0 ? "md:row-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "aspect-[3/4]" : "aspect-square"}`}>
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <span className="text-xs tracking-wider text-card/80 mb-2">
                    {collection.count} PRODUCTS
                  </span>
                  <h3 className="font-serif text-xl lg:text-2xl text-card mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-card/80 mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 text-card text-sm font-medium tracking-wide group-hover:gap-4 transition-all duration-300">
                    SHOP NOW
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
