"use client"

import { useState } from "react"
import { ProductCard, type Product } from "./product-card"
import { ChevronDown, Grid3X3, LayoutGrid } from "lucide-react"

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onQuickView: (product: Product) => void
}

const categories = ["All", "Accessories", "Fashion", "Home", "Footwear"]
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Selling"]

export function ProductGrid({ products, onAddToCart, onQuickView }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Featured")
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3)
  const [showSort, setShowSort] = useState(false)

  const filteredProducts = products.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.price - b.price
      case "Price: High to Low":
        return b.price - a.price
      case "Newest":
        return b.id - a.id
      default:
        return 0
    }
  })

  return (
    <section id="shop" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block">
            CURATED SELECTION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            Shop Our Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Each piece in our collection is carefully selected for its exceptional quality, 
            timeless design, and impeccable craftsmanship.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-border">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort & Grid Options */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground text-sm font-medium tracking-wide hover:bg-secondary/80 transition-colors"
              >
                {sortBy}
                <ChevronDown className={`w-4 h-4 transition-transform ${showSort ? "rotate-180" : ""}`} />
              </button>
              {showSort && (
                <div className="absolute top-full right-0 mt-2 bg-card border border-border shadow-lg z-20 min-w-[200px]">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option)
                        setShowSort(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors ${
                        sortBy === option ? "text-accent font-medium" : "text-foreground"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid Toggle */}
            <div className="hidden md:flex items-center gap-1 bg-secondary p-1">
              <button
                onClick={() => setGridCols(2)}
                className={`p-2 transition-colors ${gridCols === 2 ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="2 columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 transition-colors ${gridCols === 3 ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="3 columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 transition-colors ${gridCols === 4 ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="4 columns"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="4" height="4" />
                  <rect x="10" y="3" width="4" height="4" />
                  <rect x="17" y="3" width="4" height="4" />
                  <rect x="3" y="10" width="4" height="4" />
                  <rect x="10" y="10" width="4" height="4" />
                  <rect x="17" y="10" width="4" height="4" />
                  <rect x="3" y="17" width="4" height="4" />
                  <rect x="10" y="17" width="4" height="4" />
                  <rect x="17" y="17" width="4" height="4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-8">
          Showing {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
        </p>

        {/* Product Grid */}
        <div
          className={`grid gap-6 lg:gap-8 ${
            gridCols === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : gridCols === 3
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-2 border border-primary text-primary px-10 py-4 text-sm font-medium tracking-wide hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            LOAD MORE PRODUCTS
          </button>
        </div>
      </div>
    </section>
  )
}
