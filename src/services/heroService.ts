import { getItem, setItem } from './storage';
import type { HeroConfig } from './types';
import { DEFAULT_HERO } from './types';

const HERO_KEY = 'hero-config';

export function getHeroConfig(): HeroConfig {
  return getItem<HeroConfig>(HERO_KEY, DEFAULT_HERO);
}

export function saveHeroConfig(config: HeroConfig): void {
  setItem(HERO_KEY, config);
}
