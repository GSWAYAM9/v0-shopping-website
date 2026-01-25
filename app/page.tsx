"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/shop/header"
import { Hero } from "@/components/shop/hero"
import { ProductGrid } from "@/components/shop/product-grid"
import { Collections } from "@/components/shop/collections"
import { Testimonials } from "@/components/shop/testimonials"
import { Newsletter } from "@/components/shop/newsletter"
import { Footer } from "@/components/shop/footer"
import { Cart, type CartItem } from "@/components/shop/cart"
import { SearchModal } from "@/components/shop/search-modal"
import { QuickView } from "@/components/shop/quick-view"
import { Checkout } from "@/components/shop/checkout"
import type { Product } from "@/components/shop/product-card"

// Product data
const products: Product[] = [
  {
    id: 1,
    name: "Artisan Leather Tote",
    category: "Accessories",
    price: 895,
    originalPrice: 1195,
    image: "/products/product-1.jpg",
    badge: "BESTSELLER",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    name: "Heritage Gold Sunglasses",
    category: "Accessories",
    price: 450,
    image: "/products/product-2.jpg",
    badge: "NEW",
    rating: 4.7,
    reviews: 64,
  },
  {
    id: 3,
    name: "Pure Cashmere Sweater",
    category: "Fashion",
    price: 595,
    image: "/products/product-3.jpg",
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 4,
    name: "Classic Timepiece",
    category: "Accessories",
    price: 2450,
    originalPrice: 2950,
    image: "/products/product-4.jpg",
    badge: "LIMITED",
    rating: 5.0,
    reviews: 42,
  },
  {
    id: 5,
    name: "Italian Leather Loafers",
    category: "Footwear",
    price: 685,
    image: "/products/product-5.jpg",
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 6,
    name: "Silk Artisan Scarf",
    category: "Accessories",
    price: 325,
    image: "/products/product-6.jpg",
    badge: "NEW",
    rating: 4.5,
    reviews: 73,
  },
  {
    id: 7,
    name: "Sculptural Ceramic Vase",
    category: "Home",
    price: 245,
    image: "/products/product-7.jpg",
    rating: 4.8,
    reviews: 51,
  },
  {
    id: 8,
    name: "Executive Leather Wallet",
    category: "Accessories",
    price: 275,
    originalPrice: 350,
    image: "/products/product-8.jpg",
    rating: 4.9,
    reviews: 204,
  },
]

export default function ShopPage() {
  // State
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  // Cart functions
  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
    setIsCartOpen(true)
  }, [])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 1) return
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }, [])

  const removeItem = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const handleCheckout = useCallback(() => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }, [])

  const handleCheckoutComplete = useCallback(() => {
    setCartItems([])
    setIsCheckoutOpen(false)
  }, [])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        menuOpen={isMenuOpen}
      />

      {/* Hero Section */}
      <Hero />

      {/* Product Grid */}
      <ProductGrid
        products={products}
        onAddToCart={addToCart}
        onQuickView={setQuickViewProduct}
      />

      {/* Collections */}
      <Collections />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onProductClick={(product) => {
          setQuickViewProduct(product)
          setIsSearchOpen(false)
        }}
      />

      {/* Quick View Modal */}
      <QuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(product, quantity) => {
          addToCart(product, quantity)
          setQuickViewProduct(null)
        }}
      />

      {/* Checkout */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onComplete={handleCheckoutComplete}
      />
    </main>
  )
}
