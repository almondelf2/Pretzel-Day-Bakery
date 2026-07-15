import { Link, useLocation, useSearch } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useListCategories, useListMenuItems } from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/StarRating';
import { Skeleton } from '@/components/ui/skeleton';
import { QuantityControl } from '@/components/QuantityControl';
import { Award } from 'lucide-react';

export default function MenuPage() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const search = useSearch();
  const categoryParam = new URLSearchParams(search).get('category');
  const selectedCategory = categoryParam ? Number(categoryParam) : null;

  const { data: categories, isLoading: loadingCategories } = useListCategories();
  const { data: menuItems, isLoading: loadingItems } = useListMenuItems(
    selectedCategory ? { categoryId: selectedCategory } : undefined
  );

  const handleCategoryChange = (categoryId: number | null) => {
    navigate(categoryId ? `/menu?category=${categoryId}` : '/menu');
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-foreground tracking-tight">
              {t('menu.hero.title')}
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground">
              {t('menu.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter — sticky below header */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40 py-3 sm:py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              className="shrink-0"
              onClick={() => handleCategoryChange(null)}
              data-testid="button-category-all"
            >
              {t('menu.filter.all')}
            </Button>
            {loadingCategories ? (
              <>
                <Skeleton className="h-9 w-24 shrink-0" />
                <Skeleton className="h-9 w-24 shrink-0" />
                <Skeleton className="h-9 w-24 shrink-0" />
              </>
            ) : (
              categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  className="shrink-0"
                  onClick={() => handleCategoryChange(category.id)}
                  data-testid={`button-category-${category.id}`}
                >
                  {category.name}
                </Button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loadingItems ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="w-full h-40 sm:h-48" />
                  <CardContent className="p-3 sm:p-4 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-9 w-full mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : menuItems && menuItems.length > 0 ? (
            <>
              <div className="mb-4 sm:mb-6 text-xs sm:text-sm text-muted-foreground">
                {t('menu.items.showing', { count: menuItems.length })}
                {selectedCategory && categories && (
                  <span> {t('menu.items.inCategory', { name: categories.find(c => c.id === selectedCategory)?.name })}</span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-start">
                {menuItems.map((item, index) => (
                  <div key={item.id} className="flex flex-col h-full">
                    <Link href={`/menu/${item.id}`} className="flex flex-col flex-1">
                      <Card
                        className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 flex flex-col h-full"
                        style={{ animationDelay: `${index * 50}ms` }}
                        data-testid={`card-menu-item-${item.id}`}
                      >
                        {/* Image */}
                        <div className="relative h-36 sm:h-48 shrink-0 overflow-hidden bg-muted">
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
                            <div className="absolute top-2 end-2 sm:top-3 sm:end-3">
                              <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium">
                                <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                <span className="hidden sm:inline">{t('menu.items.featured')}</span>
                              </span>
                            </div>
                          )}
                          {!item.available && (
                            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                              <span className="text-xs sm:text-sm font-medium text-muted-foreground text-center px-2">
                                {t('menu.items.unavailable')}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <CardContent className="p-3 sm:p-4 flex flex-col flex-1">
                          <div className="flex-1 space-y-1 mb-3">
                            <div className="flex items-start justify-between gap-1 sm:gap-2">
                              <h3
                                className="font-serif font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors leading-snug"
                                data-testid={`text-name-${item.id}`}
                              >
                                {item.name}
                              </h3>
                              <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap shrink-0 mt-0.5 hidden sm:block">
                                {item.categoryName}
                              </span>
                            </div>
                            {item.description && (
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-snug">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between mb-3">
                            <p className="font-semibold text-base sm:text-lg text-foreground" data-testid={`text-price-${item.id}`}>
                              ${item.price.toFixed(2)}
                            </p>
                            {item.averageRating != null && item.ratingCount > 0 && (
                              <div className="flex items-center gap-1">
                                <StarRating rating={item.averageRating} size="sm" />
                                <span className="text-xs text-muted-foreground hidden sm:inline">({item.ratingCount})</span>
                              </div>
                            )}
                          </div>

                          <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                            <QuantityControl
                              item={{ id: item.id, name: item.name, price: item.price }}
                              available={item.available}
                              size="sm"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 space-y-4">
              <p className="text-muted-foreground">{t('menu.items.noItems')}</p>
              <Button variant="outline" onClick={() => handleCategoryChange(null)}>
                {t('menu.items.viewAll')}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
