import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  <img src="https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/r21.png" />
                </span>
              </div>
              <span className="text-xl font-bold text-muted-foreground">Resources 21</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Leading provider of quality products and services for businesses worldwide. We deliver excellence through
              innovation and partnership.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>
                  <a href="mailto:r21.bd@hotmail.com" className="text-cyan-600 hover:underline">
                    r21.bd@hotmail.com
                  </a>
                </span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>
                  <a href="tel:+8801678092681" className="text-cyan-600 hover:underline">
                    +8801678092681
                  </a>
                </span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-xs text-justify">
                  {"House No 51/5, Block-kha, Road No 12, Shekertak, Adabor, Dhaka-1207"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-muted-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/clients" className="text-muted-foreground hover:text-primary transition-colors">
                  Clients
                </Link>
              </li>
              <li>
                <Link href="/principals" className="text-muted-foreground hover:text-primary transition-colors">
                  Principals
                </Link>
              </li>
              <li>
                <Link href="/company-profile" className="text-muted-foreground hover:text-primary transition-colors">
                  Company Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-muted-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-muted-foreground">Product Distribution</span>
              </li>
              <li>
                
              </li>
              <li>
                <span className="text-muted-foreground">Partnership Development</span>
              </li>
              <li>
                <span className="text-muted-foreground">Consulting Services</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">© {currentYear} Resources - 21. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
