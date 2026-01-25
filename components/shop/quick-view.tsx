"use client"

import { useState, useEffect } from "react"
import { X, Plus, Minus, Heart, Share2, ChevronLeft, ChevronRight, Check } from "lucide-react"
import type { Product } from "./product-card"

interface QuickViewProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, quantity: number) => void
}

const sizes = ["XS", "S", "M", "L", "XL"]
const colors = [
  { name: "Cream", value: "#F5F0E8" },
  { name: "Black", value: "#1A1A1A" },
  { name: "Camel", value: "#C19A6B" },
]

export function QuickView({ product, isOpen, onClose, onAddToCart }: QuickViewProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setQuantity(1)
      setAddedToCart(false)
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

  if (!product) return null

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-background w-full max-w-5xl max-h-[90vh] overflow-hidden transition-all duration-500 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 h-full">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-muted">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-between px-4">
              <button className="p-2 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors" aria-label="Previous image">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors" aria-label="Next image">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Badge */}
            {product.badge && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium tracking-wide px-3 py-1.5">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-8 md:p-12 overflow-y-auto">
            <span className="text-sm text-muted-foreground tracking-wide uppercase">
              {product.category}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mt-2 mb-4">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-muted-foreground"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl font-medium text-foreground">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8">
              Crafted with exceptional attention to detail, this piece embodies timeless elegance 
              and superior quality. Made from premium materials for lasting beauty and comfort.
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground mb-3">
                Color: <span className="text-muted-foreground font-normal">{selectedColor.name}</span>
              </h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? "border-foreground scale-110"
                        : "border-transparent hover:border-muted-foreground"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-foreground">Size</h3>
                <button className="text-sm text-muted-foreground underline hover:text-foreground transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-6">
              {/* Quantity */}
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium tracking-wide transition-all ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    ADDED TO BAG
                  </>
                ) : (
                  "ADD TO BAG"
                )}
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center gap-2 px-6 py-3 border transition-colors ${
                  isWishlisted
                    ? "border-accent text-accent"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-accent" : ""}`} />
                <span className="text-sm font-medium">WISHLIST</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">SHARE</span>
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-accent" />
                  Free shipping over $500
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-accent" />
                  30-day returns
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-accent" />
                  Secure checkout
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-accent" />
                  Gift wrapping available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
