"use client"

import { useState, useEffect, useRef } from "react"
import { X, Search, TrendingUp } from "lucide-react"
import type { Product } from "./product-card"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  products: Product[]
  onProductClick: (product: Product) => void
}

const trendingSearches = ["Leather Bags", "Cashmere", "Watches", "Italian Shoes"]

export function SearchModal({ isOpen, onClose, products, onProductClick }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    if (!isOpen) {
      setQuery("")
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const searchResults = query.length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Panel */}
      <div
        className={`absolute top-0 left-0 right-0 bg-background transition-transform duration-500 ease-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-4xl mx-auto p-6">
          {/* Search Input */}
          <div className="flex items-center gap-4 border-b border-border pb-4">
            <Search className="w-6 h-6 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 bg-transparent text-xl md:text-2xl font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="py-8 max-h-[60vh] overflow-y-auto">
            {query.length > 1 ? (
              searchResults.length > 0 ? (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-6 tracking-wide">
                    RESULTS ({searchResults.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {searchResults.slice(0, 8).map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          onProductClick(product)
                          onClose()
                        }}
                        className="text-left group"
                      >
                        <div className="aspect-square bg-muted mb-3 overflow-hidden">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="font-medium text-foreground text-sm group-hover:text-accent transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          ${product.price.toLocaleString()}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found for "{query}"</p>
                </div>
              )
            ) : (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-6 tracking-wide flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  TRENDING SEARCHES
                </h3>
                <div className="flex flex-wrap gap-3">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-5 py-2.5 bg-secondary text-secondary-foreground text-sm font-medium tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
