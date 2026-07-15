import { useState } from 'react';
import { useCreateOrder, useListMenuItems, OrderInputType } from '@workspace/api-client-react';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, Users, Plus, Minus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { OrderItem } from '@workspace/api-client-react/generated/api.schemas';

interface OrderItemWithDetails extends OrderItem {
  name?: string;
  price?: number;
}

export default function OrderPage() {
  const { toast } = useToast();
  const createOrderMutation = useCreateOrder();
  const { data: menuItems } = useListMenuItems();
  const { items: cartItems, clearCart } = useCart();

  const [orderType, setOrderType] = useState<OrderInputType>('bulk');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<OrderItemWithDetails[]>(() =>
    cartItems.map(ci => ({
      menuItemId: ci.id,
      quantity: ci.quantity,
      notes: null,
      name: ci.name,
      price: ci.price,
    }))
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('');

  const handleAddItem = () => {
    if (!selectedMenuItem) return;

    const menuItem = menuItems?.find(item => item.id === Number(selectedMenuItem));
    if (!menuItem) return;

    const existingItemIndex = items.findIndex(item => item.menuItemId === menuItem.id);
    
    if (existingItemIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += 1;
      setItems(updatedItems);
    } else {
      setItems([
        ...items,
        {
          menuItemId: menuItem.id,
          quantity: 1,
          notes: null,
          name: menuItem.name,
          price: menuItem.price,
        },
      ]);
    }
    setSelectedMenuItem('');
  };

  const handleUpdateQuantity = (menuItemId: number, delta: number) => {
    setItems(items.map(item => {
      if (item.menuItemId === menuItemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleRemoveItem = (menuItemId: number) => {
    setItems(items.filter(item => item.menuItemId !== menuItemId));
  };

  const handleUpdateItemNotes = (menuItemId: number, notes: string) => {
    setItems(items.map(item => {
      if (item.menuItemId === menuItemId) {
        return { ...item, notes: notes || null };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = item.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast({
        title: 'No items selected',
        description: 'Please add at least one item to your order',
        variant: 'destructive',
      });
      return;
    }

    const orderData = {
      type: orderType,
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      eventDate,
      eventLocation: eventLocation.trim() || null,
      guestCount: guestCount ? Number(guestCount) : null,
      notes: notes.trim() || null,
      items: items.map(({ menuItemId, quantity, notes }) => ({
        menuItemId,
        quantity,
        notes,
      })),
    };

    createOrderMutation.mutate(
      { data: orderData },
      {
        onSuccess: () => {
          toast({
            title: 'Order Submitted!',
            description: 'We\'ll be in touch shortly to confirm your order.',
          });
          clearCart();
          // Reset form
          setCustomerName('');
          setEmail('');
          setPhone('');
          setEventDate('');
          setEventLocation('');
          setGuestCount('');
          setNotes('');
          setItems([]);
        },
        onError: (error: any) => {
          toast({
            title: 'Error',
            description: error?.message || 'Failed to submit order',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="font-serif font-bold text-4xl sm:text-5xl text-foreground tracking-tight">
              Schedule Your Order
            </h1>
            <p className="text-lg text-muted-foreground">
              Perfect for celebrations, office events, or stocking up on favorites
            </p>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Type */}
                <Card className="animate-in fade-in slide-in-from-left-4 duration-700">
                  <CardHeader>
                    <CardTitle className="font-serif">Order Type</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setOrderType('bulk')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          orderType === 'bulk'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        data-testid="button-type-bulk"
                      >
                        <p className="font-semibold text-foreground">Bulk Order</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Large quantity of specific items
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('catering')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          orderType === 'catering'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        data-testid="button-type-catering"
                      >
                        <p className="font-semibold text-foreground">Catering</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Event or party service
                        </p>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
                  <CardHeader>
                    <CardTitle className="font-serif">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                        required
                        data-testid="input-customer-name"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          data-testid="input-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) 123-4567"
                          required
                          data-testid="input-phone"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Event Details */}
                <Card className="animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                  <CardHeader>
                    <CardTitle className="font-serif">Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Event Date *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <Input
                          id="eventDate"
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="pl-10"
                          required
                          data-testid="input-event-date"
                        />
                      </div>
                    </div>
                    {orderType === 'catering' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="eventLocation">Event Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <Input
                              id="eventLocation"
                              value={eventLocation}
                              onChange={(e) => setEventLocation(e.target.value)}
                              placeholder="Address or venue name"
                              className="pl-10"
                              data-testid="input-event-location"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="guestCount">Guest Count</Label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <Input
                              id="guestCount"
                              type="number"
                              min="1"
                              value={guestCount}
                              onChange={(e) => setGuestCount(e.target.value)}
                              placeholder="Number of guests"
                              className="pl-10"
                              data-testid="input-guest-count"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="notes">Special Requests</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Dietary restrictions, delivery instructions, etc."
                        rows={3}
                        data-testid="textarea-notes"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Item Selection */}
                <Card className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
                  <CardHeader>
                    <CardTitle className="font-serif">Select Items</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Select value={selectedMenuItem} onValueChange={setSelectedMenuItem}>
                        <SelectTrigger className="flex-1" data-testid="select-menu-item">
                          <SelectValue placeholder="Choose an item" />
                        </SelectTrigger>
                        <SelectContent>
                          {menuItems?.map((item) => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name} - ${item.price.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        type="button" 
                        onClick={handleAddItem}
                        disabled={!selectedMenuItem}
                        data-testid="button-add-item"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>

                    {items.length > 0 && (
                      <div className="space-y-3 pt-4 border-t border-border">
                        {items.map((item) => (
                          <div 
                            key={item.menuItemId} 
                            className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                            data-testid={`order-item-${item.menuItemId}`}
                          >
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="font-medium text-foreground">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    ${item.price?.toFixed(2)} each
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem(item.menuItemId)}
                                  className="text-muted-foreground hover:text-destructive transition-colors"
                                  data-testid={`button-remove-${item.menuItemId}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleUpdateQuantity(item.menuItemId, -1)}
                                  data-testid={`button-decrease-${item.menuItemId}`}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleUpdateQuantity(item.menuItemId, 1)}
                                  data-testid={`button-increase-${item.menuItemId}`}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <Input
                                placeholder="Special instructions for this item..."
                                value={item.notes || ''}
                                onChange={(e) => handleUpdateItemNotes(item.menuItemId, e.target.value)}
                                className="text-sm"
                                data-testid={`input-item-notes-${item.menuItemId}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary (Sidebar) */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                  <CardHeader>
                    <CardTitle className="font-serif">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Order Type:</span>
                        <span className="font-medium capitalize">{orderType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Items:</span>
                        <span className="font-medium">{items.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Quantity:</span>
                        <span className="font-medium">
                          {items.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-muted-foreground">Estimated Total:</span>
                        <span className="font-serif font-bold text-2xl text-primary" data-testid="text-total">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Final price confirmed upon order review
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={createOrderMutation.isPending || items.length === 0}
                      data-testid="button-submit-order"
                    >
                      {createOrderMutation.isPending ? 'Submitting...' : 'Submit Order'}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      We'll contact you within 24 hours to confirm details and finalize your order.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
