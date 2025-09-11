"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  image_url: string
  brand: string
  category: string
}

export function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, name, image_url, brand, category")
          .not("image_url", "is", null)
          .limit(100)

        if (error) throw error
        setProducts(data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [supabase])

  useEffect(() => {
    if (products.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [products.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  if (isLoading) {
    return (
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-muted rounded-lg animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg"></div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No product images available</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-xl">
      {/* Image Container */}
      <div className="relative w-full h-full">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/diverse-medical-equipment.png"
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Product Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
              <div className="text-white">
                <h3 className="text-lg md:text-xl font-semibold mb-1 text-balance">{product.name}</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-primary/80 px-2 py-1 rounded text-primary-foreground">{product.brand}</span>
                  <span className="bg-white/20 px-2 py-1 rounded">{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 h-8 w-8 md:h-10 md:w-10"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 h-8 w-8 md:h-10 md:w-10"
        onClick={goToNext}
      >
        <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
