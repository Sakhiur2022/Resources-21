"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { ExternalLink, Building, Globe } from "lucide-react"

interface Principal {
  id: string
  name: string
  logo_url: string
  website: string
  country: string
}

export default function PrincipalsPage() {
  const [principals, setPrincipals] = useState<Principal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPrincipals() {
      const supabase = createClient()
      const { data, error } = await supabase.from("principals").select("*").order("name")

      if (error) {
        console.error("Error fetching principals:", error)
      } else {
        setPrincipals(data || [])
      }
      setLoading(false)
    }

    fetchPrincipals()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Principals</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We represent leading manufacturers and service providers from around the world, bringing you the best
              products and solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Principals Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-card border-border">
                  <CardHeader>
                    <div className="w-full h-32 bg-muted rounded-lg animate-pulse mb-4"></div>
                    <div className="h-6 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : principals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {principals.map((principal) => (
                <Card key={principal.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                      {principal.logo_url ? (
                        <img
                          src={principal.logo_url || "/placeholder.svg"}
                          alt={`${principal.name} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <Building className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    <CardTitle className="text-card-foreground mb-2">{principal.name}</CardTitle>
                    {principal.country && (
                      <div className="flex items-center space-x-2 mb-4">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="secondary">{principal.country}</Badge>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {principal.website && (
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                        onClick={() => window.open(principal.website, "_blank")}
                      >
                        Visit Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Principals Listed</h3>
              <p className="text-muted-foreground">
                We're currently updating our principals showcase. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
