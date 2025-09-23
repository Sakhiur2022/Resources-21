"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { ExternalLink, Package, Search } from "lucide-react"

interface Product {
  id: string
  name: string
  brand: string
  category: string
  image_url: string
  product_link: string
  created_at: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient()
      const { data, error } = await supabase.from("products").select("*").order("name")

      if (error) {
        console.error("Error fetching products:", error)
      } else {
        setProducts(data || [])
        setFilteredProducts(data || [])
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (selectedBrand !== "all") {
      filtered = filtered.filter((product) => product.brand === selectedBrand)
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedBrand, selectedCategory])

  const uniqueCategories = [...new Set(products.map((p) => p.category))].sort()

  const getBrandsForCategory = (category: string) => {
    return [...new Set(products.filter((p) => p.category === category).map((p) => p.brand))].sort()
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedBrand("all")
    setSelectedCategory("all")
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setSelectedBrand("all")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Products</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality products designed to meet your business needs.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category + Brand Selector */}
          <div className="mb-6">
            <div className="overflow-x-auto">
              <div className="flex items-center gap-4 pb-4 min-w-max">
                {/* All Categories */}
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => handleCategoryClick("all")}
                  className="whitespace-nowrap"
                >
                  All Categories
                </Button>

                {/* Category Buttons */}
                {uniqueCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => handleCategoryClick(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {selectedCategory !== "all" && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">{selectedCategory} Brands:</h3>
              <div className="overflow-x-auto">
                <div className="flex items-center gap-3 pb-2 min-w-max">
                  <Button
                    variant={selectedBrand === "all" ? "default" : "outline"}
                    onClick={() => setSelectedBrand("all")}
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    All Brands
                  </Button>
                  {getBrandsForCategory(selectedCategory).map((brand) => (
                    <Button
                      key={brand}
                      variant={selectedBrand === brand ? "default" : "outline"}
                      onClick={() => setSelectedBrand(brand)}
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results Count + Clear Filters */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} of {products.length} products
            </span>
            {(searchTerm || selectedBrand !== "all" || selectedCategory !== "all") && (
              <Button variant="outline" onClick={clearFilters} size="sm">
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-card border-border">
                  <CardHeader>
                    <div className="w-full h-48 bg-muted rounded-lg animate-pulse"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-3 bg-muted rounded animate-pulse mb-4 w-3/4"></div>
                    <div className="h-8 bg-muted rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                      {product.image_url ? (
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-auto h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="h-16 w-16 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-card-foreground mb-2">{product.name}</CardTitle>
                        <div className="flex gap-2 mb-2">
                          <Badge variant="secondary">{product.category}</Badge>
                          <Badge variant="outline" className="border-primary/20 text-primary">
                            {product.brand}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-pretty">
                      High-quality {product.category.toLowerCase()} from {product.brand}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a href={product?.product_link} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2">
                        Learn More
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {products.length === 0 ? "No Products Available" : "No Products Found"}
              </h3>
              <p className="text-muted-foreground">
                {products.length === 0
                  ? "We're currently updating our product catalog. Please check back soon."
                  : "Try adjusting your search or filter criteria to find what you're looking for."}
              </p>
              {(searchTerm || selectedBrand !== "all" || selectedCategory !== "all") && (
                <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
