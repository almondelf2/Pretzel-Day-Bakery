import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Header } from '@/components/Header';
import { CartProvider } from '@/contexts/CartContext';
import { Footer } from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import MenuPage from '@/pages/MenuPage';
import MenuItemDetailPage from '@/pages/MenuItemDetailPage';
import OrderPage from '@/pages/OrderPage';
import FindUsPage from '@/pages/FindUsPage';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

/** Keeps <html dir> and <html lang> in sync with i18next language */
function DirectionSync() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return null;
}

function Router() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <DirectionSync />
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/menu" component={MenuPage} />
          <Route path="/menu/:id" component={MenuItemDetailPage} />
          <Route path="/order" component={OrderPage} />
          <Route path="/find-us" component={FindUsPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
