"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Building2, MapPin, Package } from "lucide-react"

interface Customer {
  id: string
  name: string
  address: string
  items: Item[]
}

interface Item {
  id: string
  name: string
}

export default function ClientsPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCustomers() {
      const supabase = createClient()

      // Fetch customers with their items through the customer_items junction table
      const { data: customersData, error: customersError } = await supabase
        .from("customers")
        .select(`
          id,
          name,
          address,
          customer_items (
            items (
              id,
              name
            )
          )
        `)
        .order("name")
        .limit(1000)
      


      if (customersError) {
        console.error("Error fetching customers:", customersError)
      } else {
        // Transform the data to flatten the items array
        const transformedData =
          customersData?.map((customer) => ({
            ...customer,
            items: customer.customer_items?.map((ci: any) => ci.items).filter(Boolean) || [],
          })) || []

          const sortedCustomers = transformedData.sort(
    (a, b) => b.customer_items.length - a.customer_items.length
  );

        setCustomers(sortedCustomers)
      }
      setLoading(false)
    }

    fetchCustomers()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Customers</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're proud to serve valued customers nationwide, providing quality products and services that meet their unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Customers Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-card border-border">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4 mb-4"></div>
                    <div className="h-20 bg-muted rounded animate-pulse"></div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : customers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {customers.map((customer) => (
                <Card key={customer.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-card-foreground">{customer.name}</CardTitle>
                      </div>
                    </div>

                    {customer.address && (
                      <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{customer.address}</span>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent>
                    {customer.items && customer.items.length > 0 ? (
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Package className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">Products/Services:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {customer.items.map((item) => (
                            <Badge
                              key={item.id}
                              variant="secondary"
                              className="bg-primary/10 text-primary hover:bg-primary/20"
                            >
                              {item.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No products/services listed</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Customers Listed</h3>
              <p className="text-muted-foreground">
                We're currently updating our customer showcase. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
