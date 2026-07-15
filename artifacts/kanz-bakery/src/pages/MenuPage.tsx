import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useListCategories, useListMenuItems } from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/StarRating';
import { Skeleton } from '@/components/ui/skeleton';
import { Award } from 'lucide-react';

export default function MenuPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    categoryParam ? Number(categoryParam) : null
  );

  const { data: categories, isLoading: loadingCategories } = useListCategories();
  const { data: menuItems, isLoading: loadingItems } = useListMenuItems(
    selectedCategory ? { categoryId: selectedCategory } : undefined
  );

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(Number(categoryParam));
    }
  }, [categoryParam]);

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="font-serif font-bold text-4xl sm:text-5xl text-foreground tracking-tight">
              Our Menu
            </h1>
            <p className="text-lg text-muted-foreground">
              Every item baked fresh daily with local ingredients
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(null)}
              data-testid="button-category-all"
            >
              All Items
            </Button>
            {loadingCategories ? (
              <>
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
              </>
            ) : (
              categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
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
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loadingItems ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
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
          ) : menuItems && menuItems.length > 0 ? (
            <>
              <div className="mb-6 text-sm text-muted-foreground">
                Showing {menuItems.length} {menuItems.length === 1 ? 'item' : 'items'}
                {selectedCategory && categories && (
                  <span> in {categories.find(c => c.id === selectedCategory)?.name}</span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menuItems.map((item, index) => (
                  <Link key={item.id} href={`/menu/${item.id}`}>
                    <Card 
                      className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 50}ms` }}
                      data-testid={`card-menu-item-${item.id}`}
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
                        {!item.available && (
                          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                            <span className="text-sm font-medium text-muted-foreground">
                              Currently Unavailable
                            </span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-serif font-semibold text-lg text-foreground group-hover:text-primary transition-colors leading-tight" data-testid={`text-name-${item.id}`}>
                              {item.name}
                            </h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {item.categoryName}
                            </span>
                          </div>
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
            </>
          ) : (
            <div className="text-center py-12 space-y-4">
              <p className="text-muted-foreground">No items found in this category</p>
              <Button variant="outline" onClick={() => handleCategoryChange(null)}>
                View All Items
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
