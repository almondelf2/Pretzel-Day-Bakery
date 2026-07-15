import { Link, useLocation } from 'wouter';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'ع' },
] as const;

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { t, i18n } = useTranslation();

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/find-us', label: t('nav.findUs') },
    { href: '/menu', label: t('nav.menu') },
    { href: '/order', label: t('nav.order') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0" data-testid="link-home">
            <ShoppingBag className="w-6 h-6 text-primary" strokeWidth={2.5} />
            <span className="font-serif font-bold text-xl tracking-tight text-foreground">
              {t('nav.brand')}
            </span>
          </Link>

          {/* Desktop Navigation + Language switcher */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid={`link-nav-${link.href.replace('/', '') || 'home'}`}
                >
                  {link.label}
                  {link.href === '/order' && totalItems > 0 && (
                    <span
                      className="absolute -top-1 -end-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center leading-none"
                      data-testid="badge-cart-count"
                    >
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Language switcher */}
            <div className="flex items-center gap-0.5 ms-3 ps-3 border-s border-border/60">
              <Globe className="w-3.5 h-3.5 text-muted-foreground me-1 shrink-0" />
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    i18n.language === code
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/60 hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid={`button-lang-${code}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/40 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`relative flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid={`link-mobile-${link.href.replace('/', '') || 'home'}`}
                >
                  {link.label}
                  {link.href === '/order' && totalItems > 0 && (
                    <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </Link>
              ))}

              {/* Mobile language switcher */}
              <div className="flex items-center gap-2 px-4 pt-3 mt-1 border-t border-border/40">
                <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex gap-1">
                  {LANGS.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => changeLanguage(code)}
                      className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                        i18n.language === code
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground/60 hover:text-foreground hover:bg-muted'
                      }`}
                      data-testid={`button-mobile-lang-${code}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
