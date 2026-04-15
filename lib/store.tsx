'use client';

import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';

import type { Game, SelectedGame } from '@/types';

interface StoreState {
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  games: Game[];
  mobileGames: Game[];
  selectedGames: SelectedGame[];
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; d: Game[]; m: Game[] }
  | { type: 'FETCH_ERROR'; error: string }
  | { type: 'ADD_GAME'; game: SelectedGame }
  | { type: 'REMOVE_GAME'; id: string }
  | { type: 'CLEAR_GAMES' };

const initialState: StoreState = {
  status: 'idle',
  error: null,
  games: [],
  mobileGames: [],
  selectedGames: [],
};

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...initialState, status: 'loading' };
    case 'FETCH_SUCCESS':
      return { ...state, status: 'success', games: action.d, mobileGames: action.m };
    case 'FETCH_ERROR':
      return { ...state, status: 'error', error: action.error };
    case 'ADD_GAME':
      if (state.selectedGames.some((g) => g.id === action.game.id)) return state;
      return { ...state, selectedGames: [...state.selectedGames, action.game] };
    case 'REMOVE_GAME':
      return { ...state, selectedGames: state.selectedGames.filter((g) => g.id !== action.id) };
    case 'CLEAR_GAMES':
      return { ...state, selectedGames: [] };
    default:
      return state;
  }
}

interface StoreContextValue extends StoreState {
  addGame: (game: SelectedGame) => void;
  removeGame: (id: string) => void;
  clearGames: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

interface StoreProviderProps {
  brand?: string;
  state?: string;
  children: ReactNode;
}

export function StoreProvider({ brand, state, children }: StoreProviderProps) {
  const [storeState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!brand || !state) return;

    dispatch({ type: 'FETCH_START' });

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
    fetch(`${baseUrl}/api/v1/games?b=${brand}&s=${state}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data: { error?: string }) => {
            throw new Error(data.error ?? 'Failed to fetch games');
          });
        }
        return res.json() as Promise<{ d: Game[]; m: Game[] }>;
      })
      .then(({ d, m }) => dispatch({ type: 'FETCH_SUCCESS', d, m }))
      .catch((err: Error) => dispatch({ type: 'FETCH_ERROR', error: err.message }));
  }, [brand, state]);

  function addGame(game: SelectedGame) {
    dispatch({ type: 'ADD_GAME', game });
  }

  function removeGame(id: string) {
    dispatch({ type: 'REMOVE_GAME', id });
  }

  function clearGames() {
    dispatch({ type: 'CLEAR_GAMES' });
  }

  return (
    <StoreContext.Provider value={{ ...storeState, addGame, removeGame, clearGames }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
