"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { ExternalLink, Package } from "lucide-react"

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

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient()
      const { data, error } = await supabase.from("products").select("*").order("name")

      if (error) {
        console.error("Error fetching products:", error)
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Products</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our comprehensive range of high-quality products designed to meet your business needs.
            </p>
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
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                      {product.image_url ? (
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
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
              <h3 className="text-xl font-semibold text-foreground mb-2">No Products Available</h3>
              <p className="text-muted-foreground">
                We're currently updating our product catalog. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
