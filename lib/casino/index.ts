import type { Game, GameMetaData } from '@/types';
import { requireEnv } from '@/utils';

const brandSlugs = ['betmgm', 'borgata', 'wof', 'partycasino'] as const;
const states = ['nj', 'pa', 'mi', 'wv', 'on'] as const;
const brandDomains = {
  betmgm: 'betmgm',
  borgata: 'borgataonline',
  partycasino: 'partycasino',
  wof: 'wheeloffortunecasino',
} as const;

type Brand = (typeof brandSlugs)[number];
type State = (typeof states)[number];
type BrandDomain = typeof brandDomains;

function isValidBrand(value: string): value is Brand {
  switch (value) {
    case 'betmgm':
    case 'borgata':
    case 'wof':
    case 'partycasino':
      return true;
    default:
      return false;
  }
}

function isValidState(value: string): value is State {
  switch (value) {
    case 'nj':
    case 'pa':
    case 'mi':
    case 'wv':
    case 'on':
      return true;
    default:
      return false;
  }
}

type Segments = {
  product: 'casinogames' | 'www';
  state: State | null;
  brand: BrandDomain[Brand];
  tld: 'com' | 'ca';
};

export function getCasinoBaseUrl(
  brandSlug = 'betmgm',
  state = 'nj',
  { gameSubdomain = false } = {},
): string {
  if (!isValidBrand(brandSlug) || !isValidState(state)) {
    throw new Error('Invalid brand or state');
  }

  const brand = brandDomains[brandSlug];
  const segments: Segments = {
    product: gameSubdomain ? 'casinogames' : 'www',
    state,
    brand,
    tld: 'com',
  };

  // MC ON has a '.ca' top-level domain
  if (brandSlug === 'betmgm' && state === 'on') {
    segments.tld = 'ca';
  }

  // BC NJ and WOF NJ don't have a state subdomain
  const isBCNJ = brandSlug === 'borgata' && state === 'nj';
  const isWOFNJ = brandSlug === 'wof' && state === 'nj';
  if (isBCNJ || isWOFNJ) {
    segments.state = null;
  }

  return `https://${Object.values(segments).filter(Boolean).join('.')}`;
}

export function fetchGames(
  brand: string,
  state: string,
  { mobile = false } = {},
): Promise<Response> {
  const baseUrl = getCasinoBaseUrl(brand, state);
  const apiUrl = baseUrl + requireEnv('GAME_METADATA_ENDPOINT');
  const request = new Request(apiUrl);

  // Since Single-Domain Migration, a special header needs to be set for the API to work
  request.headers.set(requireEnv('SPECIAL_HEADER_NAME'), requireEnv('SPECIAL_HEADER_VALUE'));

  if (mobile) {
    request.headers.set('user-agent', requireEnv('MOBILE_UA'));
  }

  return fetch(request, {
    next: {
      revalidate: 300, // cache response for 5 minutes
    },
  });
}

export function metadataToGame({ sid, game, name, provider }: GameMetaData): Game {
  return {
    id: sid.slice(4),
    game,
    name,
    provider,
  };
}
