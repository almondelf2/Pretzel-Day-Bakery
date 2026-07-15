import { useState } from 'react';
import { useParams, Link } from 'wouter';
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

export default function MenuItemDetailPage() {
  const params = useParams();
  const id = params.id ? Number(params.id) : null;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const { data: item, isLoading: loadingItem } = useGetMenuItem(id!, { query: { enabled: !!id } });
  const { data: ratings, isLoading: loadingRatings } = useGetMenuItemRatings(id!, { query: { enabled: !!id } });
  const createRatingMutation = useCreateRating();

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || !customerName.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please enter your name',
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
        } 
      },
      {
        onSuccess: () => {
          toast({
            title: 'Thank you!',
            description: 'Your rating has been submitted',
          });
          setCustomerName('');
          setRating(5);
          setComment('');
          queryClient.invalidateQueries({ queryKey: getGetMenuItemRatingsQueryKey(id) });
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Failed to submit rating',
            variant: 'destructive',
          });
        },
      }
    );
  };

  if (!id) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <p className="text-muted-foreground">Invalid menu item</p>
      </div>
    );
  }

  if (loadingItem) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="w-full h-96 rounded-xl" />
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
        <p className="text-muted-foreground">Item not found</p>
        <Link href="/menu">
          <Button variant="outline">Back to Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/menu">
          <Button variant="ghost" className="mb-8 group" data-testid="button-back">
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Menu
          </Button>
        </Link>

        {/* Item Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-left-4 duration-700">
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
                  <span className="text-muted-foreground">No image available</span>
                </div>
              )}
            </div>
            {item.featured && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg">
                  <Award className="w-4 h-4" />
                  Featured Item
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-150">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="font-serif font-bold text-3xl sm:text-4xl text-foreground" data-testid="text-item-name">
                  {item.name}
                </h1>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {item.categoryName}
                </span>
              </div>
              <p className="text-2xl font-semibold text-primary" data-testid="text-item-price">
                ${item.price.toFixed(2)}
              </p>
            </div>

            {item.description && (
              <p className="text-muted-foreground leading-relaxed" data-testid="text-item-description">
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
                  This item is currently unavailable
                </p>
              </div>
            )}

            {item.averageRating && item.ratingCount > 0 && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <StarRating rating={item.averageRating} size="lg" showValue />
                <span className="text-sm text-muted-foreground">
                  Based on {item.ratingCount} {item.ratingCount === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ratings Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Submit Rating Form */}
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <CardHeader>
              <CardTitle className="font-serif">Leave a Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRating} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    data-testid="input-customer-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Your Rating</Label>
                  <div className="flex items-center gap-2">
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
                            className={`w-8 h-8 ${
                              starValue <= (hoveredRating || rating)
                                ? 'fill-primary text-primary'
                                : 'fill-muted text-muted'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {rating} {rating === 1 ? 'star' : 'stars'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Comment (optional)</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts..."
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
                  {createRatingMutation.isPending ? 'Submitting...' : 'Submit Review'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Ratings List */}
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
            <CardHeader>
              <CardTitle className="font-serif">Customer Reviews</CardTitle>
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
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                  {ratings.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-border last:border-0" data-testid={`review-${review.id}`}>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <p className="font-medium text-foreground">{review.customerName}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      {review.comment && (
                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
