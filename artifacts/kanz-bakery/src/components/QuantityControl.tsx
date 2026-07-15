import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface QuantityControlProps {
  item: { id: number; name: string; price: number };
  available?: boolean;
  size?: 'sm' | 'md';
}

export function QuantityControl({ item, available = true, size = 'md' }: QuantityControlProps) {
  const { getQuantity, addItem, updateQuantity } = useCart();
  const { t } = useTranslation();
  const qty = getQuantity(item.id);

  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const btnSize = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9';
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';

  if (!available) {
    return (
      <div className="w-full py-2 text-center text-sm text-muted-foreground">
        {t('qty.unavailable')}
      </div>
    );
  }

  if (qty === 0) {
    return (
      <Button
        size={size === 'sm' ? 'sm' : 'default'}
        className="w-full gap-2"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(item); }}
        data-testid={`button-add-to-order-${item.id}`}
      >
        <ShoppingBag className={iconSize} />
        {t('qty.addToOrder')}
      </Button>
    );
  }

  return (
    <div
      className="flex items-center justify-between w-full gap-2"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      <Button
        variant="outline"
        size="icon"
        className={btnSize}
        onClick={() => updateQuantity(item.id, qty - 1)}
        data-testid={`button-decrease-${item.id}`}
      >
        <Minus className={iconSize} />
      </Button>
      <span className={`font-semibold tabular-nums ${textSize}`} data-testid={`text-qty-${item.id}`}>
        {qty}
      </span>
      <Button
        variant="outline"
        size="icon"
        className={btnSize}
        onClick={() => updateQuantity(item.id, qty + 1)}
        data-testid={`button-increase-${item.id}`}
      >
        <Plus className={iconSize} />
      </Button>
    </div>
  );
}
