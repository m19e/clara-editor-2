import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { useAtomValue } from "jotai";
import type { WheelEvent } from "react";
import { useEffect, useRef } from "react";

import { InitPlugin } from "@/lexical/plugins/InitPlugin";
import { NewAutoSavePlugin } from "@/lexical/plugins/NewAutoSavePlugin";
import { fontSizeAtom, lineHeightAtom, lineWordsAtom } from "@/store/atoms";

const Placeholder = () => {
	return (
		<div className="vertical pointer-events-none absolute top-4 right-[calc(50%-1rem)] select-none text-base-content text-opacity-60">
			執筆を始める
		</div>
	);
};

// Todo
// TODO 自動保存(処理)
// TODO ドロワーで書式設定
// TODO 1行の字数
// TODO 行間
// TODO フォントサイズ
// TODO フォント

// Done
export const Editor = () => {
	const _lw = useAtomValue(lineWordsAtom);
	const _lh = useAtomValue(lineHeightAtom);
	const _fs = useAtomValue(fontSizeAtom);

	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.setAttribute(
				"style",
				`
			  height: calc(${27}em + 7rem);
			  line-height: ${2};
			  font-size: ${1}rem;
			  `,
			);
		}
	}, []);

	const handleWheel = (e: WheelEvent<HTMLElement>) => {
		e.preventDefault();
		if (containerRef.current) {
			containerRef.current.scrollBy({
				top: 0,
				left: -e.deltaY,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
			<div className="w-1/2">
				<div
					className="mincho editor-scroll relative flex w-full overflow-x-auto overflow-y-hidden"
					ref={containerRef}
					onWheel={handleWheel}
				>
					<div className="flex-1"></div>
					<PlainTextPlugin
						contentEditable={
							<ContentEditable
								className="vertical relative h-full break-all text-justify text-base-content text-upright outline"
								spellCheck={false}
							/>
						}
						placeholder={<Placeholder />}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<div className="flex-1"></div>
				</div>
			</div>
			<NewAutoSavePlugin />
			<AutoFocusPlugin />
			<HistoryPlugin />
			<InitPlugin />
		</div>
	);
};
