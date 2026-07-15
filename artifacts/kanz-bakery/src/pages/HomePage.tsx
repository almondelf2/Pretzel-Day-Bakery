import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useGetFeaturedMenuItems, useGetMenuSummary } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StarRating } from '@/components/StarRating';
import { ChevronRight, Clock, Users, Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { BreadMark } from '@/components/BrandLogo';

export default function HomePage() {
  const { t } = useTranslation();
  const { data: featured, isLoading: loadingFeatured } = useGetFeaturedMenuItems();
  const { data: menuSummary, isLoading: loadingSummary } = useGetMenuSummary();

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-start">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Award className="w-4 h-4 shrink-0" />
                  {t('home.hero.badge')}
                </span>
              </div>
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-foreground tracking-tight whitespace-pre-line">
                {t('home.hero.title')}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link href="/menu">
                  <Button size="lg" className="group" data-testid="button-view-menu">
                    {t('home.hero.viewMenu')}
                    <ChevronRight className="ms-2 w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/order">
                  <Button size="lg" variant="outline" data-testid="button-place-order">
                    {t('home.hero.placeOrder')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div
              className="relative h-[280px] sm:h-[380px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150"
              data-testid="img-hero"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex flex-col items-center justify-center gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/20 flex items-center justify-center">
                  <BreadMark className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
                </div>
                <div className="text-center space-y-1">
                  <p className="font-serif font-bold text-xl sm:text-2xl text-primary">{t('nav.brand')}</p>
                  <p className="text-xs sm:text-sm text-primary/70 tracking-widest uppercase">{t('home.hero.tagline')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-12 border-y border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center space-y-1 sm:space-y-2">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto" />
              <p className="font-serif font-bold text-xl sm:text-3xl text-foreground">{t('home.stats.hours')}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{t('home.stats.freshDaily')}</p>
            </div>
            <div className="text-center space-y-1 sm:space-y-2">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto" />
              <p className="font-serif font-bold text-xl sm:text-3xl text-foreground">{t('home.stats.customers')}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{t('home.stats.happyCustomers')}</p>
            </div>
            <div className="text-center space-y-1 sm:space-y-2">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto" />
              <p className="font-serif font-bold text-xl sm:text-3xl text-foreground">{t('home.stats.years')}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{t('home.stats.excellence')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-14 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 space-y-3 sm:space-y-4">
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-foreground">
              {t('home.featured.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              {t('home.featured.subtitle')}
            </p>
          </div>

          {loadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <Skeleton className="w-full h-48" />
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : featured && featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {featured.slice(0, 6).map((item, index) => (
                <Link key={item.id} href={`/menu/${item.id}`}>
                  <Card
                    className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-testid={`card-featured-${item.id}`}
                  >
                    <div className="relative h-44 sm:h-48 overflow-hidden bg-muted">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">{t('menu.items.noImage')}</span>
                        </div>
                      )}
                      {item.featured && (
                        <div className="absolute top-3 end-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                            <Award className="w-3 h-3" />
                            {t('home.featured.badge')}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4 sm:p-6 space-y-3">
                      <div>
                        <h3 className="font-serif font-semibold text-lg text-foreground group-hover:text-primary transition-colors" data-testid={`text-name-${item.id}`}>
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <p className="font-semibold text-lg text-foreground" data-testid={`text-price-${item.id}`}>
                          ${item.price.toFixed(2)}
                        </p>
                        {item.averageRating && item.ratingCount > 0 && (
                          <div className="flex items-center gap-1">
                            <StarRating rating={item.averageRating} size="sm" />
                            <span className="text-xs text-muted-foreground">({item.ratingCount})</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">{t('home.featured.noItems')}</p>
          )}

          <div className="text-center mt-10 sm:mt-12">
            <Link href="/menu">
              <Button variant="outline" size="lg" className="group" data-testid="button-browse-menu">
                {t('home.featured.browseMenu')}
                <ChevronRight className="ms-2 w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Menu Summary */}
      {!loadingSummary && menuSummary && menuSummary.categories && menuSummary.categories.length > 0 && (
        <section className="py-14 sm:py-24 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 space-y-3 sm:space-y-4">
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-foreground">
                {t('home.categories.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                {t('home.categories.subtitle', {
                  total: menuSummary.totalItems,
                  count: menuSummary.categories.length,
                })}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {menuSummary.categories.map((category, index) => (
                <Link key={category.id} href={`/menu?category=${category.id}`} className="block h-full">
                  <Card
                    className="group cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 h-full"
                    style={{ animationDelay: `${index * 75}ms` }}
                    data-testid={`card-category-${category.id}`}
                  >
                    <CardContent className="p-4 sm:p-6 space-y-2">
                      <h3 className="font-serif font-semibold text-base sm:text-xl text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {t('home.categories.itemCount', { count: category.itemCount })}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-14 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-background border-primary/20">
            <CardContent className="p-6 sm:p-12 lg:p-16 text-center space-y-5 sm:space-y-6">
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-foreground">
                {t('home.cta.title')}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('home.cta.subtitle')}
              </p>
              <Link href="/order">
                <Button size="lg" className="group" data-testid="button-cta-order">
                  {t('home.cta.button')}
                  <ChevronRight className="ms-2 w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
