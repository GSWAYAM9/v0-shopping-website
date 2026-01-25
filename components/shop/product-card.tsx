"use client"

import { useState } from "react"
import { Heart, ShoppingBag, Eye } from "lucide-react"

export interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  rating: number
  reviews: number
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onQuickView: (product: Product) => void
}

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="group relative">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium tracking-wide px-3 py-1.5">
            {product.badge}
          </span>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-medium tracking-wide px-3 py-1.5">
            -{discount}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background"
          style={{ right: discount > 0 ? "auto" : "1rem", left: discount > 0 ? "1rem" : "auto", top: discount > 0 ? "4rem" : "1rem" }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-accent text-accent" : "text-foreground"
            }`}
          />
        </button>

        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="flex gap-2">
            <button
              onClick={() => onAddToCart(product)}
              className="flex-1 flex items-center justify-center gap-2 bg-background text-foreground py-3 text-sm font-medium tracking-wide hover:bg-background/90 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              ADD TO BAG
            </button>
            <button
              onClick={() => onQuickView(product)}
              className="p-3 bg-background text-foreground hover:bg-background/90 transition-colors"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <span className="text-xs text-muted-foreground tracking-wide uppercase">
          {product.category}
        </span>
        <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium text-foreground">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-muted-foreground"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
      </div>
    </div>
  )
}
