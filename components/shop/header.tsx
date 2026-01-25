"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
  onSearchClick: () => void
  onMenuClick: () => void
  menuOpen: boolean
}

export function Header({ cartCount, onCartClick, onSearchClick, onMenuClick, menuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#shop" className="text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors">
              SHOP
            </a>
            <a href="#collections" className="text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors">
              COLLECTIONS
            </a>
            <a href="#about" className="text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors">
              ABOUT
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-foreground/80 hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <a href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-2xl md:text-3xl tracking-widest font-medium text-foreground">
              MAISON
            </h1>
          </a>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onSearchClick}
              className="p-2 text-foreground/80 hover:text-foreground transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <a href="#wishlist" className="hidden sm:block p-2 text-foreground/80 hover:text-foreground transition-colors">
              <Heart className="w-5 h-5" />
            </a>
            <a href="#account" className="hidden sm:block p-2 text-foreground/80 hover:text-foreground transition-colors">
              <User className="w-5 h-5" />
            </a>
            <button
              onClick={onCartClick}
              className="p-2 text-foreground/80 hover:text-foreground transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-6 gap-4">
          <a href="#shop" className="text-lg font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors py-2">
            SHOP
          </a>
          <a href="#collections" className="text-lg font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors py-2">
            COLLECTIONS
          </a>
          <a href="#about" className="text-lg font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors py-2">
            ABOUT
          </a>
          <a href="#wishlist" className="text-lg font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors py-2">
            WISHLIST
          </a>
          <a href="#account" className="text-lg font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors py-2">
            ACCOUNT
          </a>
        </nav>
      </div>
    </header>
  )
}
