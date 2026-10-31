import type { Category } from './types';

export const categories: Category[] = [
  {
    slug: 'business-software',
    name: 'Business Software',
    short: 'Business',
    icon: 'Briefcase',
    accent: '#2F4FF0',
    accent2: '#7C9BFF',
    tagline: 'Kunden, Zahlen, Teams, Termine und Dokumente an einem Ort.',
    description:
      'Die Werkzeuge für den Alltag eines Unternehmens: Vertrieb, Buchhaltung, Personal, Terminbuchung und Dokumente. Als zusammenhängende Produktfamilie konzipiert, damit Daten nur einmal erfasst werden.',
    seo: {
      title: 'Business Software: CRM, Finance, Workforce, Booking',
      description: 'Business-Software von MONVEX: CRM, Finance, Workforce, Booking und Document Cloud. Als Produktfamilie gedacht, Demo oder Beratung auf Anfrage.',
    },
  },
  {
    slug: 'kuenstliche-intelligenz',
    name: 'Artificial Intelligence',
    short: 'KI',
    icon: 'Sparkles',
    accent: '#7040F0',
    accent2: '#B79CFF',
    tagline: 'KI-Assistenten und Automatisierung, die Aufgaben wirklich abnehmen.',
    description:
      'KI für den Unternehmensalltag: Agenten, die Aufgaben erledigen, ein Concierge für Kundenkontakt, eine Enterprise-KI auf Ihren eigenen Daten und Workflows, die Prozesse automatisch ausführen.',
    seo: {
      title: 'KI-Software: AI Agent, Concierge, Enterprise AI',
      description: 'KI-Software von MONVEX: AI Agent, AI Concierge, Enterprise AI und Workflow Automation. Individuelle Beratung und Prototypen auf Anfrage.',
    },
  },
  {
    slug: 'enterprise-loesungen',
    name: 'Enterprise Solutions',
    short: 'Enterprise',
    icon: 'Building2',
    accent: '#0A7472',
    accent2: '#5DD6D0',
    tagline: 'Auswertung, Integration, Service und Lieferkette für große Organisationen.',
    description:
      'Lösungen für Organisationen mit vielen Systemen, Standorten und Beteiligten: Analytics, Integration Hub, Service Desk, Lieferantenportal und Fuhrparkmanagement.',
    seo: {
      title: 'Enterprise Solutions: Analytics, Hub, Service Desk',
      description: 'Enterprise-Software von MONVEX: Analytics, Integration Hub, Service Desk, Supplier Portal und Fleet Management. Beratung und Angebot auf Anfrage.',
    },
  },
  {
    slug: 'persoenliche-software',
    name: 'Personal Software',
    short: 'Personal',
    icon: 'Heart',
    accent: '#C23A1C',
    accent2: '#FFA08A',
    tagline: 'Alltag, Geld, Auto und Familie übersichtlich in einer App.',
    description:
      'Lösungen für Privatpersonen: Haushaltsfinanzen, Fahrzeug und Dokumente, Lebensorganisation und Familienplanung. Persönlich, aufgeräumt und mit Datenschutz als Ausgangspunkt.',
    seo: {
      title: 'Personal Software: Money, Garage, Life und Family',
      description: 'Persönliche Software von MONVEX: Money, Garage, Life und Family. Wir bauen sie für Sie, Ideen sind willkommen.',
    },
  },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
