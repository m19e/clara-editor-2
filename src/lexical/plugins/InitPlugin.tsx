import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

import { useKeybind } from "../keybind";
import { $setTextContent } from "../lib/text";

const PLACEHOLD_TEXT_CONTENT = `私たちは、生まれて、やがて死ぬ。
その間に、私たちは様々なことを経験する。
私たちは傷つき、ときに傷を糧にして成長し、ときに痛み続ける傷に思い悩み足踏みする。
傷とは過去の存在だ。
だが、今なお疼く。
そのとき、過去は現在に絶えず入り込み現在に生き続けているかのようだ。
同時に、私たちは未来を思い描くこともできる。
未来から現在を眺めたりもする。
私たちが生きている時間は、過去と未来が重なりあって、ひしめき合っている。`;

export const InitPlugin = () => {
	const [editor] = useLexicalComposerContext();

	useKeybind(editor);

	useEffect(() => {
		const f = async () => {
			try {
				const draft = PLACEHOLD_TEXT_CONTENT;
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
