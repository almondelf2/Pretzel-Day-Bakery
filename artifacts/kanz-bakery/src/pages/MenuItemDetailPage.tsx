import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useGetMenuItem, useGetMenuItemRatings, useCreateRating, getGetMenuItemRatingsQueryKey } from '@workspace/api-client-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/StarRating';
import { Skeleton } from '@/components/ui/skeleton';
import { QuantityControl } from '@/components/QuantityControl';
import { Award, ChevronLeft, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

const LOCALE_MAP: Record<string, string> = { en: 'en-US', fr: 'fr-FR', ar: 'ar-SA' };

export default function MenuItemDetailPage() {
  const params = useParams();
  const id = params.id ? Number(params.id) : null;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation();

  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const { data: item, isLoading: loadingItem } = useGetMenuItem(id!, { query: { enabled: !!id } });
  const { data: ratings, isLoading: loadingRatings } = useGetMenuItemRatings(id!, { query: { enabled: !!id } });
  const createRatingMutation = useCreateRating();

  const dateLocale = LOCALE_MAP[i18n.language] ?? 'en-US';

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !customerName.trim()) {
      toast({
        title: t('itemDetail.toast.missingTitle'),
        description: t('itemDetail.toast.missingDesc'),
        variant: 'destructive',
      });
      return;
    }

    createRatingMutation.mutate(
      {
        data: {
          menuItemId: id,
          rating,
          customerName: customerName.trim(),
          comment: comment.trim() || undefined,
        },
      },
      {
        onSuccess: () => {
          toast({
            title: t('itemDetail.toast.successTitle'),
            description: t('itemDetail.toast.successDesc'),
          });
          setCustomerName('');
          setRating(5);
          setComment('');
          queryClient.invalidateQueries({ queryKey: getGetMenuItemRatingsQueryKey(id) });
        },
        onError: () => {
          toast({
            title: t('itemDetail.toast.errorTitle'),
            description: t('itemDetail.toast.errorDesc'),
            variant: 'destructive',
          });
        },
      }
    );
  };

  if (!id) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <p className="text-muted-foreground">{t('itemDetail.invalidItem')}</p>
      </div>
    );
  }

  if (loadingItem) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="w-full h-72 sm:h-96 rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center space-y-4">
        <p className="text-muted-foreground">{t('itemDetail.itemNotFound')}</p>
        <Link href="/menu">
          <Button variant="outline">{t('itemDetail.back')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <Link href="/menu">
          <Button variant="ghost" className="mb-6 sm:mb-8 group" data-testid="button-back">
            <ChevronLeft className="w-4 h-4 me-2 group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1 transition-transform" />
            {t('itemDetail.back')}
          </Button>
        </Link>

        {/* Item Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-12">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="aspect-square bg-muted">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  data-testid="img-menu-item"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-muted-foreground">{t('itemDetail.noImageAvailable')}</span>
                </div>
              )}
            </div>
            {item.featured && (
              <div className="absolute top-4 end-4">
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg">
                  <Award className="w-4 h-4" />
                  {t('itemDetail.featuredItem')}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="font-serif font-bold text-2xl sm:text-4xl text-foreground" data-testid="text-item-name">
                  {item.name}
                </h1>
                <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap shrink-0 mt-1">
                  {item.categoryName}
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-semibold text-primary" data-testid="text-item-price">
                ${item.price.toFixed(2)}
              </p>
            </div>

            {item.description && (
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" data-testid="text-item-description">
                {item.description}
              </p>
            )}

            {/* Add to Order */}
            <div className="max-w-xs">
              <QuantityControl
                item={{ id: item.id, name: item.name, price: item.price }}
                available={item.available}
                size="md"
              />
            </div>

            {!item.available && (
              <div className="p-4 rounded-lg bg-muted border border-border">
                <p className="text-sm font-medium text-muted-foreground">
                  {t('itemDetail.unavailableMsg')}
                </p>
              </div>
            )}

            {item.averageRating && item.ratingCount > 0 && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 flex-wrap">
                <StarRating rating={item.averageRating} size="lg" showValue />
                <span className="text-sm text-muted-foreground">
                  {t('itemDetail.basedOn', { count: item.ratingCount })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ratings Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Submit Rating */}
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <CardHeader>
              <CardTitle className="font-serif">{t('itemDetail.review.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRating} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('itemDetail.review.name')}</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t('itemDetail.review.namePlaceholder')}
                    required
                    data-testid="input-customer-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('itemDetail.review.rating')}</Label>
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoveredRating(starValue)}
                          onMouseLeave={() => setHoveredRating(null)}
                          className="transition-transform hover:scale-110"
                          data-testid={`button-rating-${starValue}`}
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 ${
                              starValue <= (hoveredRating || rating)
                                ? 'fill-primary text-primary'
                                : 'fill-muted text-muted'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ms-1 text-xs sm:text-sm text-muted-foreground">
                      {t('itemDetail.review.stars', { count: rating })}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">{t('itemDetail.review.comment')}</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t('itemDetail.review.commentPlaceholder')}
                    rows={4}
                    data-testid="textarea-comment"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={createRatingMutation.isPending}
                  data-testid="button-submit-rating"
                >
                  {createRatingMutation.isPending
                    ? t('itemDetail.review.submitting')
                    : t('itemDetail.review.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Ratings List */}
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
            <CardHeader>
              <CardTitle className="font-serif">{t('itemDetail.reviewList.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingRatings ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
                </div>
              ) : ratings && ratings.length > 0 ? (
                <div className="space-y-6 max-h-[500px] sm:max-h-[600px] overflow-y-auto pe-2">
                  {ratings.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-border last:border-0" data-testid={`review-${review.id}`}>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <p className="font-medium text-foreground text-sm sm:text-base">{review.customerName}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString(dateLocale, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      {review.comment && (
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {t('itemDetail.reviewList.noReviews')}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
