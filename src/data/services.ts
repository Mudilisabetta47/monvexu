export type ServiceIcon = 'monitor' | 'cpu' | 'shopping-bag' | 'megaphone' | 'route' | 'rocket';

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  points: string[];
  icon: ServiceIcon;
};

export const services: Service[] = [
  {
    id: 'digital',
    index: '01',
    title: 'Digital',
    description: 'Websites, Plattformen und digitale Produkte.',
    points: ['Webentwicklung', 'Plattformen', 'Digitale Produkte'],
    icon: 'monitor',
  },
  {
    id: 'technology',
    index: '02',
    title: 'Technology',
    description: 'Softwareentwicklung, IT-Systeme und Automatisierung.',
    points: ['Softwareentwicklung', 'IT-Systeme', 'Automatisierung'],
    icon: 'cpu',
  },
  {
    id: 'e-commerce',
    index: '03',
    title: 'E-Commerce',
    description: 'Digitale Shops, Produkte und Commerce-Systeme.',
    points: ['Online-Shops', 'Produktdaten', 'Commerce-Systeme'],
    icon: 'shopping-bag',
  },
  {
    id: 'marketing',
    index: '04',
    title: 'Marketing',
    description: 'Markenaufbau, digitale Kommunikation und Online-Marketing.',
    points: ['Markenentwicklung', 'Kommunikation', 'Online-Marketing'],
    icon: 'megaphone',
  },
  {
    id: 'travel-mobility',
    index: '05',
    title: 'Travel & Mobility',
    description: 'Reisevermittlung, Busvermittlung und Mobilitätsprojekte.',
    points: ['Reisevermittlung', 'Busvermittlung', 'Mobilitätsprojekte'],
    icon: 'route',
  },
  {
    id: 'ventures',
    index: '06',
    title: 'Ventures',
    description: 'Aufbau und Entwicklung neuer Geschäftsmodelle und Marken.',
    points: ['Geschäftsmodelle', 'Markengründung', 'Langfristiger Betrieb'],
    icon: 'rocket',
  },
];
