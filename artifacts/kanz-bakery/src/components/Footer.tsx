import { Link } from 'wouter';
import { ShoppingBag } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity" data-testid="link-footer-home">
              <ShoppingBag className="w-6 h-6 text-primary" strokeWidth={2.5} />
              <span className="font-serif font-bold text-xl tracking-tight text-foreground">
                Kanz Bakery
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Handcrafted breads, pastries, and celebration cakes baked fresh daily. 
              Every bite tells a story of tradition and warmth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-sm mb-3 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-menu">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-order">
                  Place Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-sm mb-3 text-foreground">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Baker Street</li>
              <li>Monday - Saturday: 7am - 7pm</li>
              <li>Sunday: 8am - 5pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Kanz Bakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
