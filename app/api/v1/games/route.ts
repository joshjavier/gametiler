import type { NextRequest } from 'next/server';

import { fetchGames, metadataToGame } from '@/lib/casino';
import type { GameMetaData } from '@/types';

// Set location to a US region to avoid CORS errors
export const preferredRegion = 'iad1';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const brand = searchParams.get('b');
  const state = searchParams.get('s');

  try {
    if (!brand || !state) {
      throw new Error('Invalid search param(s)');
    }

    const responses = await Promise.all([
      fetchGames(brand, state),
      fetchGames(brand, state, { mobile: true }),
    ]);

    if (responses.some((res) => !res.ok)) {
      console.log(
        'Response status:',
        `${responses[0].status} ${responses[0].statusText} (D),`,
        `${responses[1].status} ${responses[1].statusText} (M)`,
      );
      throw new Error('Unable to fetch data from the API');
    }

    const [d, m] = await Promise.all(responses.map((r) => r.json() as Promise<GameMetaData[]>));

    // Desktop and mobile variants of the same game have different `sid` values.
    // To reduce the size of the data we'll return to the client, we'll drop items
    // with duplicate `sid`s in the second response, so that only mobile games remain.
    const desktopGameIds = d.map((game) => game.sid);
    const mobileOnly = m.filter((game) => !desktopGameIds.includes(game.sid));
    const data = {
      d: d.map(metadataToGame),
      m: mobileOnly.map(metadataToGame),
    };

    return Response.json(data);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'Invalid brand or state' || err.message === 'Invalid search param(s)') {
        return Response.json({ error: err.message }, { status: 400 });
      }

      if (err.message === 'Unable to fetch data from the API') {
        return Response.json({ error: err.message }, { status: 500 });
      }

      console.log('Uncaught exception:', err);
      return Response.json({ error: 'Something went wrong' }, { status: 500 });
    } else {
      return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
  }
}
