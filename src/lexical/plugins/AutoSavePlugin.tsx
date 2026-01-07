// import { writeFile } from "node:fs/promises";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useAtom, useSetAtom } from "jotai";
import type { EditorState } from "lexical";
import { $getRoot } from "lexical";
import { useEffect, useRef } from "react";

import { IS_PROD } from "../../consts";
import { draftFilepathAtom, isSavedAtom } from "../../store/atoms";

const getTextFromEditorState = (editorState: EditorState) => {
	return editorState.read(() => $getRoot().getTextContent());
};

const saveDraft = async (
	_filepath: string,
	editorState: EditorState,
): Promise<null | string> => {
	if (!IS_PROD) return null;

	const text = getTextFromEditorState(editorState);
	try {
		// await writeFile(filepath, text);
		console.log(text);
		console.log("success auto save");
		return null;
	} catch (error) {
		return JSON.stringify(error);
	}
};

export const AutoSavePlugin = (): null => {
	const [editor] = useLexicalComposerContext();
	const [draftPath, _setDraftPath] = useAtom(draftFilepathAtom);
	const setIsSaved = useSetAtom(isSavedAtom);

	const shouldSave = useRef(false);
	const timerIdRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		shouldSave.current = false;
	}, []);

	useEffect(() => {
		return editor.registerUpdateListener(
			({ editorState, dirtyElements, dirtyLeaves, prevEditorState }) => {
				if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;
				if (prevEditorState.isEmpty()) return;
				if (draftPath === "") return;
				if (!shouldSave.current) {
					shouldSave.current = true;
					return;
				}

				setIsSaved(false);

				if (timerIdRef.current !== null) {
					clearTimeout(timerIdRef.current);
				}

				timerIdRef.current = setTimeout(() => {
					(async () => {
						const err = await saveDraft(draftPath, editorState);
						if (err) return;
						setIsSaved(true);
					})();
				}, 5000);
			},
		);
	}, [editor, draftPath, setIsSaved]);

	return null;
};
