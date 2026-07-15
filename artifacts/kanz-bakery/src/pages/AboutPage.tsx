import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Award, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight">
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A neighborhood bakery built on tradition, warmth, and the simple joy 
              of breaking bread together.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground">
                Fifteen Years of Fresh Starts
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Kanz Bakery opened its doors in 2009 with a simple promise: to bake bread 
                  the way your grandmother did — slowly, carefully, with hands that care.
                </p>
                <p>
                  We wake before sunrise to shape dough that's been rising overnight. 
                  By the time you walk through our doors, the croissants are still warm, 
                  the sourdough is crackling, and the air smells like butter and possibility.
                </p>
                <p>
                  What started as a two-person operation has grown into a beloved neighborhood 
                  fixture. But we've kept what matters: every loaf is still shaped by hand, 
                  every cake is still custom, and every customer is still greeted by name.
                </p>
                <p>
                  We don't use shortcuts. We don't rush fermentation. We don't compromise on 
                  ingredients. Because good bread takes time, and you're worth it.
                </p>
              </div>
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-right-4 duration-700 delay-150" data-testid="img-storefront">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex flex-col items-center justify-center gap-8">
                <div className="grid grid-cols-3 gap-4 opacity-60">
                  {['Sourdough', 'Croissants', 'Cakes', 'Cookies', 'Pies', 'Pastries'].map((label) => (
                    <div key={label} className="w-20 h-20 rounded-xl bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary/80 text-center px-1">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center space-y-1">
                  <p className="font-serif font-bold text-3xl text-primary">Est. 2009</p>
                  <p className="text-sm text-primary/70 tracking-widest uppercase">A neighbourhood institution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground">
              What We Believe
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The values that shape every loaf we bake
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '0ms' }}>
              <CardContent className="p-6 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-foreground">
                  Handcrafted
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every pastry is shaped by skilled hands, not machines. We believe in the 
                  human touch.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-6 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-foreground">
                  Community
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You're not a customer — you're a neighbor. We remember your order and 
                  ask about your day.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '200ms' }}>
              <CardContent className="p-6 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-foreground">
                  Quality
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Local flour, real butter, organic eggs. No preservatives, no shortcuts, 
                  no compromises.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '300ms' }}>
              <CardContent className="p-6 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-foreground">
                  Time
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Good bread can't be rushed. We give dough the hours it needs to develop 
                  flavor and texture.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground">
              Meet the Bakers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The people behind your morning pastry
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Martinez', role: 'Head Baker & Founder', bio: 'Started Kanz with a sourdough starter and a dream. Still wakes at 4am every day.' },
              { name: 'James Chen', role: 'Pastry Chef', bio: 'Trained in Paris, returned home to make croissants that rival the Seine.' },
              { name: 'Maya Thompson', role: 'Cake Designer', bio: 'Turns celebrations into edible art. Every cake tells a story.' },
            ].map((member, index) => (
              <Card 
                key={member.name}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mx-auto flex items-center justify-center">
                    <span className="font-serif font-bold text-2xl text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mt-1">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground">
            Visit Us Soon
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're on Baker Street, just past the park. Come for the bread, stay for the warmth.
          </p>
          <div className="text-muted-foreground space-y-1">
            <p className="font-medium">123 Baker Street</p>
            <p>Monday - Saturday: 7am - 7pm</p>
            <p>Sunday: 8am - 5pm</p>
          </div>
        </div>
      </section>
    </div>
  );
}
