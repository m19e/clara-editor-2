import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

import { MOCK_TEXT_CONTENT } from "../../consts";
import { useKeybind } from "../keybind";
import { $setTextContent } from "../lib/text";

export const InitPlugin = () => {
	const [editor] = useLexicalComposerContext();

	useKeybind(editor);

	useEffect(() => {
		const f = async () => {
			try {
				const draft = MOCK_TEXT_CONTENT;
				editor.update(() => $setTextContent(draft));
			} catch (e) {
				console.error(e);
			}
			await new Promise((resolve) => setTimeout(resolve, 1000));
		};
		(async () => {
			await f();
		})();
	}, [editor.update]);

	return null;
};
