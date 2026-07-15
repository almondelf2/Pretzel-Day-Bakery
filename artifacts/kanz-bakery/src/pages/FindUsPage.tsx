import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Phone, Clock, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// ---------------------------------------------------------------------------
// Branch data — Scranton, PA locations
// ---------------------------------------------------------------------------
export const BRANCHES = [
  {
    id: 'scranton-business-park',
    coords: [41.4090, -75.6541] as [number, number],
    phone: '+1 (570) 555-0100',
    mapsUrl: 'https://maps.google.com/?q=1725+Slough+Ave+Scranton+PA',
  },
  {
    id: 'steamtown-mall',
    coords: [41.4082, -75.6624] as [number, number],
    phone: '+1 (570) 555-0182',
    mapsUrl: 'https://maps.google.com/?q=Steamtown+Mall+Scranton+PA',
  },
  {
    id: 'alfredos',
    coords: [41.4108, -75.6512] as [number, number],
    phone: '+1 (570) 555-0147',
    mapsUrl: 'https://maps.google.com/?q=Alfredo\'s+Pizza+Cafe+Scranton+PA',
  },
] as const;

// Centre of the three branches — used for initial map viewport
const MAP_CENTER: [number, number] = [41.4093, -75.6559];
const MAP_ZOOM = 14;

// ---------------------------------------------------------------------------
// Custom amber pin SVG as a DivIcon
// ---------------------------------------------------------------------------
function makePinIcon(selected: boolean) {
  const fill = selected ? '#92400e' : '#d97706'; // amber-800 : amber-500
  const size = selected ? 40 : 32;
  const anchor = size / 2;
  return L.divIcon({
    className: '',
    html: `
      <svg width="${size}" height="${size * 1.25}" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z" fill="${fill}"/>
        <circle cx="16" cy="16" r="6" fill="white"/>
        ${selected ? `<circle cx="16" cy="16" r="3" fill="${fill}"/>` : ''}
      </svg>`,
    iconSize: [size, size * 1.25],
    iconAnchor: [anchor, size * 1.25],
    popupAnchor: [0, -size * 1.25 - 4],
  });
}

// ---------------------------------------------------------------------------
// Child component — runs inside MapContainer so it can call useMap()
// ---------------------------------------------------------------------------
function MapController({ target }: { target: [number, number] | null }) {
  const map = useMap();
  const prevRef = useRef<[number, number] | null>(null);
  useEffect(() => {
    if (!target) return;
    if (prevRef.current && prevRef.current[0] === target[0] && prevRef.current[1] === target[1]) return;
    prevRef.current = target;
    map.flyTo(target, 15, { duration: 0.9 });
  }, [target, map]);
  return null;
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function FindUsPage() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const selectedCoords = selected ? BRANCHES.find(b => b.id === selected)?.coords ?? null : null;

  const handleSelectBranch = (id: string) => {
    setSelected(id);
    cardRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
              <MapPin className="w-3.5 h-3.5" />
              {t('findUs.badge')}
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-foreground tracking-tight">
              {t('findUs.hero.title')}
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground">
              {t('findUs.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-5">

            {/* Map — left column */}
            <div className="flex-1 min-h-[340px] md:min-h-0">
              <div className="md:sticky md:top-24 rounded-2xl overflow-hidden border border-border shadow-md"
                   style={{ height: 'min(580px, 68dvh)' }}>
                <MapContainer
                  center={MAP_CENTER}
                  zoom={MAP_ZOOM}
                  scrollWheelZoom={false}
                  style={{ width: '100%', height: '100%' }}
                  zoomControl={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapController target={selectedCoords} />
                  {BRANCHES.map(branch => (
                    <Marker
                      key={branch.id}
                      position={branch.coords}
                      icon={makePinIcon(branch.id === selected)}
                      eventHandlers={{ click: () => handleSelectBranch(branch.id) }}
                    >
                      <Popup>
                        <div className="text-sm font-medium">
                          {t(`findUs.branches.${branch.id}.name`)}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {t(`findUs.branches.${branch.id}.address`)}
                        </div>
                        <a
                          href={branch.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline mt-1 block"
                        >
                          {t('findUs.getDirections')} →
                        </a>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Branch list — right column */}
            <div className="md:w-[300px] shrink-0 space-y-3">
              {BRANCHES.map((branch, i) => {
                const isSelected = branch.id === selected;
                return (
                  <div
                    key={branch.id}
                    ref={el => { cardRefs.current[branch.id] = el; }}
                    onClick={() => handleSelectBranch(branch.id)}
                    className={`rounded-2xl border-2 p-5 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border bg-card hover:border-primary/40 hover:shadow-sm'
                    }`}
                    data-testid={`branch-card-${branch.id}`}
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-colors ${
                          isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-serif font-semibold text-base sm:text-lg text-foreground leading-tight">
                            {t(`findUs.branches.${branch.id}.name`)}
                          </p>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {t(`findUs.branches.${branch.id}.neighborhood`)}
                          </Badge>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary shrink-0 mt-1">
                          {t('findUs.selected')}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="ms-12 space-y-2.5">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary/60" />
                        <span>{t(`findUs.branches.${branch.id}.address`)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-3.5 h-3.5 shrink-0 text-primary/60" />
                        <a
                          href={`tel:${branch.phone}`}
                          dir="ltr"
                          className="hover:text-primary transition-colors"
                          onClick={e => e.stopPropagation()}
                        >
                          {branch.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary/60" />
                        <div>
                          <p>{t('findUs.hours.weekdays')}: {t('findUs.hours.satThu')}</p>
                          <p>{t('findUs.hours.friday')}: {t('findUs.hours.friHours')}</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="ms-12 mt-4 flex gap-2">
                      <Button
                        size="sm"
                        variant={isSelected ? 'default' : 'outline'}
                        className="flex-1 gap-1.5 text-xs"
                        asChild
                        onClick={e => e.stopPropagation()}
                      >
                        <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer">
                          <Navigation className="w-3 h-3" />
                          {t('findUs.getDirections')}
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
