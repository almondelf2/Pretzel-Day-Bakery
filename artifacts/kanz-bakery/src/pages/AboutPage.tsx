import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Award, Clock } from 'lucide-react';

const VALUE_ICONS = [Heart, Users, Award, Clock];
const VALUE_KEYS = ['handcrafted', 'community', 'quality', 'time'] as const;

export default function AboutPage() {
  const { t } = useTranslation();

  const teamMembers = t('about.team.members', { returnObjects: true }) as Array<{
    name: string;
    role: string;
    bio: string;
  }>;

  const teamInitials = ['WB', 'SH', 'PB', 'KM'];

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background py-14 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight">
              {t('about.hero.title')}
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 order-2 lg:order-1">
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-foreground">
                {t('about.story.title')}
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>{t('about.story.p1')}</p>
                <p>{t('about.story.p2')}</p>
                <p>{t('about.story.p3')}</p>
                <p>{t('about.story.p4')}</p>
              </div>
            </div>

            <div
              className="relative h-[280px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 order-1 lg:order-2"
              data-testid="img-storefront"
            >
              <img
                src="/images/pretzel-bakery-interior.jpg"
                alt={t('about.story.imgAlt')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 space-y-3 sm:space-y-4">
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-foreground">
              {t('about.values.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {VALUE_KEYS.map((key, index) => {
              const Icon = VALUE_ICONS[index];
              return (
                <Card
                  key={key}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h3 className="font-serif font-semibold text-base sm:text-lg text-foreground">
                      {t(`about.values.${key}.title`)}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {t(`about.values.${key}.desc`)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 space-y-3 sm:space-y-4">
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-foreground">
              {t('about.team.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={member.name}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/15 flex items-center justify-center mx-auto ring-2 ring-primary/20">
                    <span className="font-serif font-bold text-xl sm:text-2xl text-primary select-none">
                      {teamInitials[index]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-base sm:text-lg text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mt-1">{member.role}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="py-14 sm:py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-foreground">
            {t('about.visit.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.visit.subtitle')}
          </p>
          <div className="text-muted-foreground space-y-1 text-sm sm:text-base">
            <p className="font-medium">{t('about.visit.address')}</p>
            <p>{t('about.visit.weekdays')}</p>
            <p>{t('about.visit.sunday')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
