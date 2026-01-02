import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useSetAtom } from "jotai";
import type { EditorState } from "lexical";
import { $getRoot } from "lexical";
import { useCallback, useRef } from "react";

import { isSavedAtom } from "@/store/atoms";

// TODO refactor: extract to utils
const getTextFromEditorState = (editorState: EditorState) => {
	return editorState.read(() => $getRoot().getTextContent());
};

const debounce = <T extends (...args: any[]) => void>(fn: T, wait: number) => {
	let timer: number | undefined;
	return (...args: Parameters<T>) => {
		window.clearTimeout(timer);
		timer = window.setTimeout(() => fn(...args), wait);
	};
};

// TODO rename
export const NewAutoSavePlugin = () => {
	const setIsSaved = useSetAtom(isSavedAtom);

	const prevSavedTextRef = useRef<string | null>(null);

	const debouncedSave = useCallback(
		debounce((editorState: EditorState) => {
			const text = getTextFromEditorState(editorState);
			if (prevSavedTextRef.current === text) return;

			try {
				// TODO txtファイル保存処理
				// await writeFile(path, text)
				prevSavedTextRef.current = text;
				setIsSaved(true);
			} catch (e) {
				console.error("autosave failed", e);
			}
		}, 5000),
		[],
	);

	const onChange = useCallback(
		(editorState: EditorState) => {
			const text = getTextFromEditorState(editorState);
			if (prevSavedTextRef.current !== text) {
				setIsSaved(false);
			}
			debouncedSave(editorState);
		},
		[debouncedSave, setIsSaved],
	);

	return <OnChangePlugin onChange={onChange} ignoreSelectionChange />;
};
