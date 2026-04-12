export interface SearchResult {
  name: string;
  provider: string;
}

export interface SelectedGame {
  name: string;
  provider: string;
  slug: string;
  mobileSlug?: string;
}

export const searchResults: SearchResult[] = [
  { name: 'Book of Dead', provider: "Play'n GO" },
  { name: 'Book of Oz', provider: 'NextGen Gaming' },
  { name: 'Book of Ra Deluxe', provider: 'Novomatic' },
  { name: 'Book of Fallen', provider: 'Pragmatic Play' },
  { name: 'Book of Gold', provider: 'Playson' },
  { name: 'Book of Kingdoms', provider: 'Pragmatic Play' },
  { name: 'Book of Shadows', provider: 'Nolimit City' },
  { name: 'Book of Atem', provider: 'Red Tiger' },
];

export const selectedGames: SelectedGame[] = [
  { name: 'Straight Cash', provider: 'GAMEIOM', slug: 'gameiomstraightcash' },
  {
    name: "Fishin' Loaded Pots Gold Blitz Extreme",
    provider: 'DGC',
    slug: 'eusmdfipogoldblitex',
    mobileSlug: 'eusmdfipogoldblitexmobile',
  },
  { name: 'Fa Fa Babies 2', provider: 'Evolution', slug: 'LiveDealernefafababies2jp' },
  { name: 'Peaky Blinders 2', provider: 'WhiteHat', slug: 'whitehatpeakyblinders2' },
  { name: 'Starburst', provider: 'NetEnt', slug: 'starburst', mobileSlug: 'starburst_mobile' },
  {
    name: "Gonzo's Quest",
    provider: 'NetEnt',
    slug: 'gonzosquest',
    mobileSlug: 'gonzosquesttouch',
  },
  { name: 'Book of Dead', provider: "Play'n GO", slug: 'bookofdeadmgc' },
  { name: 'Wolf Gold', provider: 'Pragmatic Play', slug: 'wolfgold', mobileSlug: 'wolfgoldmobile' },
];

export const tileColors: [string, string][] = [
  ['#EEEDFE', '#534AB7'],
  ['#E1F5EE', '#085041'],
  ['#FAEEDA', '#633806'],
  ['#FAECE7', '#712B13'],
  ['#E6F1FB', '#0C447C'],
  ['#EAF3DE', '#27500A'],
  ['#FBEAF0', '#72243E'],
  ['#F1EFE8', '#444441'],
];
