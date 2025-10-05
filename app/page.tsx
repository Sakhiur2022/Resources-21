import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductCarousel } from "@/components/product-carousel"
import { ArrowRight, Users, UserCheck, PenTool as Tool } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Home | Professional Medical Equipment Solutions for Modern Hospitals",
  description:
    "Resources-21 delivers exceptional medical equipment and services to hospitals across Bangladesh. Partner with us for innovative healthcare solutions including hospital beds, cabinets, anesthesia machines, and surgical equipment.",
  openGraph: {
    title: "Resources-21 | Professional Medical Equipment Solutions",
    description:
      "Leading medical equipment supplier in Bangladesh with 25+ years of experience serving 100+ hospitals.",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-muted to-background py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Professional Solutions for the <span className="text-primary">Modern Hospitals</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 text-pretty">
                Resources-21 delivers exceptional products and services to businesses worldwide. Partner with us for
                innovative solutions that drive growth and success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/products">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Explore Our Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/company-profile">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full">
              <ProductCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Resources-21?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine expertise, innovation, and partnership to deliver exceptional value to our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">Strong Client Relationships</CardTitle>
                <CardDescription>
                  We maintain an excellent client list through perseverance and proper after-sale support, serving
                  prestigious private hospitals aiming for international standard healthcare.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">Skilled Workforce</CardTitle>
                <CardDescription>
                  We provide training and professional freedom, resulting in a highly skilled team confident in sales
                  promotion, after-sale service, and problem-solving for our clients.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Tool className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">After-Sale Service</CardTitle>
                <CardDescription>
                  Our strong team of engineers and technicians are trained to provide timely and effective after-sale
                  support, ensuring solutions to all customer problems.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Districts Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Products Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Partner with Us?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Discover how Resources-21 can help your business grow and succeed in today's competitive market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                View Our Products
              </Button>
            </Link>
            <Link href="/company-profile">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
