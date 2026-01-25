"use client"

import React from "react"

import { useState } from "react"
import { X, CreditCard, Lock, Check, ChevronRight } from "lucide-react"
import type { CartItem } from "./cart"

interface CheckoutProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onComplete: () => void
}

type Step = "shipping" | "payment" | "confirmation"

export function Checkout({ isOpen, onClose, items, onComplete }: CheckoutProps) {
  const [step, setStep] = useState<Step>("shipping")
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  })
  const [processing, setProcessing] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 25
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setProcessing(false)
    setStep("confirmation")
  }

  const handleComplete = () => {
    onComplete()
    setStep("shipping")
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      phone: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      nameOnCard: "",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 bg-background border-b border-border z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl tracking-widest text-foreground">MAISON</h1>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {step === "confirmation" ? (
          /* Confirmation */
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl text-foreground mb-4">Thank You!</h2>
            <p className="text-muted-foreground mb-2">Your order has been confirmed.</p>
            <p className="text-sm text-muted-foreground mb-8">
              Order #MAI-{Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
            <p className="text-muted-foreground mb-8">
              A confirmation email has been sent to {formData.email || "your email"}.
            </p>
            <button
              onClick={handleComplete}
              className="bg-primary text-primary-foreground px-10 py-4 text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div>
              {/* Progress */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === "shipping" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {step === "payment" ? <Check className="w-4 h-4" /> : "1"}
                  </span>
                  <span className={step === "shipping" ? "font-medium text-foreground" : "text-muted-foreground"}>
                    Shipping
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    2
                  </span>
                  <span className={step === "payment" ? "font-medium text-foreground" : "text-muted-foreground"}>
                    Payment
                  </span>
                </div>
              </div>

              {step === "shipping" ? (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <h2 className="font-serif text-2xl text-foreground">Shipping Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl text-foreground">Payment Details</h2>
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← Back to shipping
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary p-3">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pr-12 border border-border bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name on Card</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-foreground transition-colors"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        PAY ${total.toFixed(2)}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:pl-8 lg:border-l lg:border-border">
              <h2 className="font-serif text-xl text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-24 bg-muted shrink-0 relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                      <p className="text-sm font-medium text-foreground mt-1">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-6 border-t border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">
                    {shipping === 0 ? "FREE" : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (estimated)</span>
                  <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between py-4 border-t border-border">
                <span className="font-medium text-foreground">Total</span>
                <span className="text-xl font-semibold text-foreground">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
