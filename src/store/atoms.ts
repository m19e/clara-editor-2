import { atom } from "jotai";
import { withAtomEffect } from "jotai-effect";
import { IS_PROD } from "@/consts";
import type { Schema } from "/common/types";

// `preload処理でwindowにAPI生やす`前にAPI叩いてクラッシュしていたのでガードする
const hasStore = () => {
	return typeof window !== "undefined" && "store" in window && !!window.store;
};

const atomWithAppStore = <K extends keyof Schema, V extends Schema[K]>(
	key: K,
	defaultValue: V,
) => {
	const baseAtom = atom<V>(defaultValue);
	return withAtomEffect(baseAtom, (get, set) => {
		if (!hasStore()) return;

		if (IS_PROD) {
			const stored = window.store.get(key);
			if (stored !== undefined) set(baseAtom, stored as V);
		}

		const value = get(baseAtom);

		if (value === defaultValue) {
			window.store.delete(key); // リセット検知
		} else {
			window.store.set(key, value);
		}
	});
};

// EDITOR (stored)
export const draftFilepathAtom = atomWithAppStore(
	"draft-filepath",
	// FIXME 開発用
	IS_PROD ? "" : "dev_mode.txt",
);
export const fontTypeAtom = atomWithAppStore("font-type", "mincho");
export const fontSizeAtom = atomWithAppStore("font-size", 10);
export const lineHeightAtom = atomWithAppStore("line-height", 20);
export const lineWordsAtom = atomWithAppStore("line-words", 30);

// UI
export const isFallbackAtom = atom(true);
export const isSavedAtom = atom(true);
export const charCountAtom = atom(0);
export const selectedCharCountAtom = atom(0);

// VIEW
export const showCharCountAtom = atom(true);
export const showLineNumberAtom = atom(true);
