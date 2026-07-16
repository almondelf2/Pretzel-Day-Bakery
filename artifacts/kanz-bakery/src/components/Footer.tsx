import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { BrandLogo } from '@/components/BrandLogo';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="mb-4">
              <BrandLogo />
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-sm mb-3 text-foreground">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-menu">
                  {t('nav.menu')}
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-order">
                  {t('footer.placeOrder')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-sm mb-3 text-foreground">{t('footer.hours')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t('footer.weekdays')}</li>
              <li>{t('footer.sunday')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <p className="text-xs text-muted-foreground text-center">
            I learned how to use Replit at the world's largest AI Training Hackathon, you can too by{' '}
            <a
              href="https://try.ka.nz/hack"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              clicking here
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
