"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Mail, Phone, MapPin, Target, Eye, Building, List } from "lucide-react"

interface CompanyProfile {
  id: string
  company_name: string
  about: string
  mission: string
  vision: string
  address: string
  phone: string
  email: string
}
interface ScopeItem {
  id: string
  category: string
  items: string
}

export default function CompanyProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [scopeItems, setScopeItems] = useState<ScopeItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient()
      const { data, error } = await supabase.from("company_profile").select("*").single()

      if (error) {
        console.error("Error fetching company profile:", error)
      } else {
        setProfile(data)
      }
    }
    async function fetchScope() {
      const supabase = createClient()
      const { data, error } = await supabase.from("scope_items").select("*").order("created_at", { ascending: true })

      if (error) {
        console.error("Error fetching scope items:", error)
      } else {
        setScopeItems(data)
      }
    }
    fetchProfile()
    fetchScope()
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-8">
            <div className="h-8 bg-muted rounded animate-pulse"></div>
            <div className="h-32 bg-muted rounded animate-pulse"></div>
            <div className="h-24 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {profile?.company_name || "Company Profile"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn more about our company, our mission, and what drives us to deliver excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Contact Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile?.address && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-card-foreground">Address</div>
                      <div className="text-muted-foreground">{profile.address}</div>
                    </div>
                  </div>
                )}

                {profile?.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-card-foreground">Phone</div>
                      <div className="text-muted-foreground">{profile.phone}</div>
                    </div>
                  </div>
                )}

                {profile?.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-card-foreground">Email</div>
                      <div className="text-muted-foreground">{profile.email}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            {/* About Section */}
            {profile?.about && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-card-foreground">
                    <Building className="h-6 w-6 text-primary" />
                    <span>About Us</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground leading-relaxed text-pretty">{profile.about}</p>
                </CardContent>
              </Card>
            )}

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile?.mission && (
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-card-foreground">
                      <Target className="h-6 w-6 text-primary" />
                      <span>Our Mission</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground leading-relaxed text-pretty">{profile.mission}</p>
                  </CardContent>
                </Card>
              )}

              {profile?.vision && (
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-card-foreground">
                      <Eye className="h-6 w-6 text-primary" />
                      <span>Our Vision</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground leading-relaxed text-pretty">{profile.vision}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Scope of Work */}
            {scopeItems.length > 0 && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-card-foreground">
                    <List className="h-6 w-6 text-primary" />
                    <span>Scope of Work</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {scopeItems.map((scope) => (
                      <div key={scope.id} className="border-l-4 border-primary pl-4">
                        <h3 className="font-semibold text-card-foreground mb-2">{scope.category}</h3>
                        <p className="text-muted-foreground leading-relaxed text-pretty">{scope.items}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Organizational Structure */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <Building className="h-6 w-6 text-primary" />
                  <span>Organizational Structure</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Proprietor Level */}
                  <div className="flex justify-center">
                    <div className="bg-primary/10 border-2 border-primary rounded-lg px-6 py-4 text-center">
                      <h3 className="font-bold text-lg text-primary">Proprietor</h3>
                    </div>
                  </div>

                  {/* Connection Line */}
                  <div className="flex justify-center">
                    <div className="w-px h-8 bg-border"></div>
                  </div>

                  {/* CEO Level */}
                  <div className="flex justify-center">
                    <div className="bg-muted border border-border rounded-lg px-6 py-4 text-center">
                      <h3 className="font-semibold text-lg text-foreground">CEO</h3>
                    </div>
                  </div>

                  {/* Connection Line */}
                  <div className="flex justify-center">
                    <div className="w-px h-8 bg-border"></div>
                  </div>

                  {/* Manager Level */}
                  <div className="flex justify-center">
                    <div className="bg-muted border border-border rounded-lg px-6 py-4 text-center">
                      <h3 className="font-semibold text-foreground">Manager Sales and Admin</h3>
                    </div>
                  </div>

                  {/* Connection Lines to Departments */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-px h-8 bg-border"></div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-80 h-px bg-border"></div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-x-40 w-px h-8 bg-border"></div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 translate-x-40 w-px h-8 bg-border"></div>
                    </div>
                  </div>

                  {/* Department Level */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                    <div className="bg-card border border-border rounded-lg px-4 py-3 text-center shadow-sm">
                      <h4 className="font-medium text-card-foreground">Sales</h4>
                    </div>
                    <div className="bg-card border border-border rounded-lg px-4 py-3 text-center shadow-sm">
                      <h4 className="font-medium text-card-foreground">Store & Account</h4>
                    </div>
                    <div className="bg-card border border-border rounded-lg px-4 py-3 text-center shadow-sm">
                      <h4 className="font-medium text-card-foreground">Technical Support</h4>
                    </div>
                    <div className="bg-card border border-border rounded-lg px-4 py-3 text-center shadow-sm">
                      <h4 className="font-medium text-card-foreground">Coordination</h4>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
