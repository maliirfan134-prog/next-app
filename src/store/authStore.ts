import { atom } from "jotai";

export const authTokenAtom = atom<string | null>(null);

export const userAtom = atom<{ name: string } | null>(null);
