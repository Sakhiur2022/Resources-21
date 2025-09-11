"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { ExternalLink, Building2, Mail } from "lucide-react"

interface Client {
  id: string
  name: string
  logo_url: string
  website: string
  contact_email: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClients() {
      const supabase = createClient()
      const { data, error } = await supabase.from("clients").select("*").order("name")

      if (error) {
        console.error("Error fetching clients:", error)
      } else {
        setClients(data || [])
      }
      setLoading(false)
    }

    fetchClients()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Clients</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're proud to partner with leading organizations worldwide, delivering exceptional value and building
              lasting relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-card border-border">
                  <CardHeader>
                    <div className="w-full h-32 bg-muted rounded-lg animate-pulse mb-4"></div>
                    <div className="h-6 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : clients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients.map((client) => (
                <Card key={client.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                      {client.logo_url ? (
                        <img
                          src={client.logo_url || "/placeholder.svg"}
                          alt={`${client.name} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <Building2 className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    <CardTitle className="text-card-foreground text-center mb-4">{client.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {client.website && (
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                        onClick={() => window.open(client.website, "_blank")}
                      >
                        Visit Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    {client.contact_email && (
                      <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{client.contact_email}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Clients Listed</h3>
              <p className="text-muted-foreground">
                We're currently updating our client showcase. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
