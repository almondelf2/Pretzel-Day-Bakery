import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

export default function OrderPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const createOrderMutation = useCreateOrder();
  const { data: menuItems } = useListMenuItems();
  const { items: cartItems, addItem, removeItem, updateQuantity, updateNotes, clearCart } = useCart();

  const [orderType, setOrderType] = useState<OrderInputType>('bulk');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('');

  // Add item from the dropdown — delegates to cart so badge updates immediately
  const handleAddItem = () => {
    if (!selectedMenuItem) return;
    const menuItem = menuItems?.find(item => item.id === Number(selectedMenuItem));
    if (!menuItem) return;
    addItem({ id: menuItem.id, name: menuItem.name, price: menuItem.price });
    setSelectedMenuItem('');
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast({ title: t('order.toast.noItemsTitle'), description: t('order.toast.noItemsDesc'), variant: 'destructive' });
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
      items: cartItems.map(({ id, quantity, notes }) => ({
        menuItemId: id,
        quantity,
        notes: notes ?? null,
      })),
    };
    createOrderMutation.mutate(
      { data: orderData },
      {
        onSuccess: () => {
          toast({ title: t('order.toast.successTitle'), description: t('order.toast.successDesc') });
          clearCart();
          setCustomerName(''); setEmail(''); setPhone(''); setEventDate('');
          setEventLocation(''); setGuestCount(''); setNotes('');
        },
        onError: (error: any) => {
          toast({ title: t('order.toast.errorTitle'), description: error?.message || t('order.toast.errorDesc'), variant: 'destructive' });
        },
      }
    );
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-foreground tracking-tight">
              {t('order.hero.title')}
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground">
              {t('order.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-5 sm:space-y-6">
                {/* Order Type */}
                <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="font-serif text-base sm:text-xl">{t('order.type.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => setOrderType('bulk')}
                        className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-start ${
                          orderType === 'bulk' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                        data-testid="button-type-bulk"
                      >
                        <p className="font-semibold text-foreground text-sm sm:text-base">{t('order.type.bulk.title')}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t('order.type.bulk.desc')}</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('catering')}
                        className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-start ${
                          orderType === 'catering' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                        data-testid="button-type-catering"
                      >
                        <p className="font-semibold text-foreground text-sm sm:text-base">{t('order.type.catering.title')}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t('order.type.catering.desc')}</p>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="font-serif text-base sm:text-xl">{t('order.contact.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">{t('order.contact.name')} *</Label>
                      <Input
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={t('order.contact.namePlaceholder')}
                        required
                        data-testid="input-customer-name"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('order.contact.email')} *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('order.contact.emailPlaceholder')}
                          required
                          data-testid="input-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('order.contact.phone')} *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t('order.contact.phonePlaceholder')}
                          required
                          data-testid="input-phone"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Event Details */}
                <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="font-serif text-base sm:text-xl">{t('order.event.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">{t('order.event.date')} *</Label>
                      <div className="relative">
                        <Calendar className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <Input
                          id="eventDate"
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="ps-10"
                          required
                          data-testid="input-event-date"
                        />
                      </div>
                    </div>
                    {orderType === 'catering' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="eventLocation">{t('order.event.location')}</Label>
                          <div className="relative">
                            <MapPin className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <Input
                              id="eventLocation"
                              value={eventLocation}
                              onChange={(e) => setEventLocation(e.target.value)}
                              placeholder={t('order.event.locationPlaceholder')}
                              className="ps-10"
                              data-testid="input-event-location"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="guestCount">{t('order.event.guests')}</Label>
                          <div className="relative">
                            <Users className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <Input
                              id="guestCount"
                              type="number"
                              min="1"
                              value={guestCount}
                              onChange={(e) => setGuestCount(e.target.value)}
                              placeholder={t('order.event.guestsPlaceholder')}
                              className="ps-10"
                              data-testid="input-guest-count"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="notes">{t('order.event.notes')}</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={t('order.event.notesPlaceholder')}
                        rows={3}
                        data-testid="textarea-notes"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Item Selection */}
                <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="font-serif text-base sm:text-xl">{t('order.items.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Select value={selectedMenuItem} onValueChange={setSelectedMenuItem}>
                        <SelectTrigger className="flex-1" data-testid="select-menu-item">
                          <SelectValue placeholder={t('order.items.choosePlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          {menuItems?.map((item) => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name} – ${item.price.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="button" onClick={handleAddItem} disabled={!selectedMenuItem} data-testid="button-add-item">
                        <Plus className="w-4 h-4 me-1 sm:me-2" />
                        <span className="hidden sm:inline">{t('order.items.add')}</span>
                      </Button>
                    </div>

                    {cartItems.length > 0 && (
                      <div className="space-y-3 pt-4 border-t border-border">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                            data-testid={`order-item-${item.id}`}
                          >
                            <div className="flex-1 space-y-2 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="font-medium text-foreground text-sm sm:text-base truncate">{item.name}</p>
                                  <p className="text-xs sm:text-sm text-muted-foreground">
                                    ${item.price.toFixed(2)} {t('order.items.each')}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.id)}
                                  className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                                  data-testid={`button-remove-${item.id}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button" variant="outline" size="icon"
                                  className="h-8 w-8 shrink-0"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  data-testid={`button-decrease-${item.id}`}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                                <Button
                                  type="button" variant="outline" size="icon"
                                  className="h-8 w-8 shrink-0"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  data-testid={`button-increase-${item.id}`}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <Input
                                placeholder={t('order.items.specialInstructions')}
                                value={item.notes || ''}
                                onChange={(e) => updateNotes(item.id, e.target.value || null)}
                                className="text-sm"
                                data-testid={`input-item-notes-${item.id}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <Card className="lg:sticky lg:top-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="font-serif text-base sm:text-xl">{t('order.summary.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('order.summary.type')}:</span>
                        <span className="font-medium">
                          {t(`order.typeLabel.${orderType}`)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('order.summary.items')}:</span>
                        <span className="font-medium">{cartItems.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('order.summary.totalQty')}:</span>
                        <span className="font-medium">
                          {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-muted-foreground">{t('order.summary.estimated')}:</span>
                        <span className="font-serif font-bold text-xl sm:text-2xl text-primary" data-testid="text-total">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{t('order.summary.note')}</p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={createOrderMutation.isPending || cartItems.length === 0}
                      data-testid="button-submit-order"
                    >
                      {createOrderMutation.isPending ? t('order.summary.submitting') : t('order.summary.submit')}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      {t('order.summary.contact')}
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
