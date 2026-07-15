import { Link } from 'wouter';
import { useGetFeaturedMenuItems, useGetMenuSummary } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StarRating } from '@/components/StarRating';
import { ChevronRight, Clock, Users, Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { data: featured, isLoading: loadingFeatured } = useGetFeaturedMenuItems();
  const { data: menuSummary, isLoading: loadingSummary } = useGetMenuSummary();

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Award className="w-4 h-4" />
                  Award-Winning Bakery
                </span>
              </div>
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-foreground tracking-tight">
                Baked Fresh,<br />Served Warm
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Every loaf, every pastry, every cake is handcrafted with care. 
                Start your morning with the smell of fresh bread and the warmth of home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/menu">
                  <Button size="lg" className="group" data-testid="button-view-menu">
                    View Menu
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/order">
                  <Button size="lg" variant="outline" data-testid="button-place-order">
                    Place an Order
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-4 duration-700 delay-150" data-testid="img-hero">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex flex-col items-center justify-center gap-6">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg viewBox="0 0 64 64" className="w-20 h-20 text-primary" fill="currentColor">
                    <ellipse cx="32" cy="40" rx="24" ry="12" opacity="0.3"/>
                    <path d="M10 36 Q12 20 32 18 Q52 20 54 36 Q52 44 32 46 Q12 44 10 36Z"/>
                    <path d="M18 28 Q20 18 32 16 Q44 18 46 28" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
                    <path d="M22 24 Q24 15 32 14 Q40 15 42 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                  </svg>
                </div>
                <div className="text-center space-y-1">
                  <p className="font-serif font-bold text-2xl text-primary">Kanz Bakery</p>
                  <p className="text-sm text-primary/70 tracking-widest uppercase">Baked with love since 2009</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <Clock className="w-8 h-8 text-primary mx-auto" />
              <p className="font-serif font-bold text-3xl text-foreground">7am - 7pm</p>
              <p className="text-sm text-muted-foreground">Fresh Daily</p>
            </div>
            <div className="text-center space-y-2">
              <Users className="w-8 h-8 text-primary mx-auto" />
              <p className="font-serif font-bold text-3xl text-foreground">10,000+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center space-y-2">
              <Award className="w-8 h-8 text-primary mx-auto" />
              <p className="font-serif font-bold text-3xl text-foreground">15 Years</p>
              <p className="text-sm text-muted-foreground">Of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground">
              Customer Favorites
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The treats our neighbors can't get enough of
            </p>
          </div>

          {loadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.slice(0, 6).map((item, index) => (
                <Link key={item.id} href={`/menu/${item.id}`}>
                  <Card 
                    className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-testid={`card-featured-${item.id}`}
                  >
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">No image</span>
                        </div>
                      )}
                      {item.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                            <Award className="w-3 h-3" />
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 space-y-3">
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
                            <span className="text-xs text-muted-foreground">
                              ({item.ratingCount})
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No featured items available</p>
          )}

          <div className="text-center mt-12">
            <Link href="/menu">
              <Button variant="outline" size="lg" className="group" data-testid="button-browse-menu">
                Browse Full Menu
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Menu Summary */}
      {menuSummary && menuSummary.categories && menuSummary.categories.length > 0 && (
        <section className="py-16 sm:py-24 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-4">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground">
                What We Bake
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {menuSummary.totalItems} items across {menuSummary.categories.length} categories
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuSummary.categories.map((category, index) => (
                <Link key={category.id} href={`/menu?category=${category.id}`}>
                  <Card 
                    className="group cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 75}ms` }}
                    data-testid={`card-category-${category.id}`}
                  >
                    <CardContent className="p-6 space-y-3">
                      <h3 className="font-serif font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.itemCount} {category.itemCount === 1 ? 'item' : 'items'}
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
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-background border-primary/20">
            <CardContent className="p-8 sm:p-12 lg:p-16 text-center space-y-6">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground">
                Planning an Event?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From intimate gatherings to grand celebrations, we craft custom cakes 
                and catering that make every moment memorable.
              </p>
              <Link href="/order">
                <Button size="lg" className="group" data-testid="button-cta-order">
                  Schedule Your Order
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
