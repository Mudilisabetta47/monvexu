import type { Industry } from '../types';
import { fahrschulen } from './fahrschulen';
import { anwaelte } from './anwaelte';
import { aerzte, zahnaerzte, physiotherapie } from './gesundheit';
import { immobilien, handwerk, autowerkstaetten } from './gewerbe';
import { gastronomie, hotels, busunternehmen, onlineshops } from './gastro';

/**
 * Registry aller VERÖFFENTLICHTEN Branchen (nur Branchen mit echtem Content).
 * Neue Branche: Datei anlegen, hier eintragen – Route, Sitemap, Übersicht und interne Links folgen automatisch.
 */
export const industries: Industry[] = [
  fahrschulen,
  anwaelte,
  aerzte,
  zahnaerzte,
  physiotherapie,
  immobilien,
  handwerk,
  autowerkstaetten,
  gastronomie,
  hotels,
  busunternehmen,
  onlineshops,
];

/**
 * Branchen-Pipeline: geplant, aber (noch) nicht veröffentlicht – ohne Seite, ohne Sitemap-Eintrag.
 * Eine Branche wandert in `industries`, sobald sie eigenen Content besitzt.
 */
export const industryPipeline: string[] = [
  'Kliniken', 'Hausverwaltungen', 'Versicherungen', 'Finanzberater', 'Unternehmensberater', 'Speditionen & Logistik',
  'Gebäudereinigung', 'Sicherheitsdienste', 'Bestattungsunternehmen', 'Fotografen', 'Architekten & Ingenieurbüros',
  'Industrieunternehmen', 'B2B-Unternehmen', 'Startups', 'Agenturen', 'Vereine', 'Schulen & Kindergärten',
  'Bildungseinrichtungen', 'Eventveranstalter', 'Friseure & Kosmetik', 'Fitnessstudios',
];
