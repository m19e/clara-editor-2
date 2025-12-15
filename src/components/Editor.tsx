import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import type { WheelEvent } from "react";
import { useEffect, useRef } from "react";

import { InitPlugin } from "../lexical/plugins/InitPlugin";

const Placeholder = () => {
	return (
		<div className="vertical pointer-events-none absolute top-4 right-[calc(50%-1rem)] select-none text-base-content text-opacity-60">
			執筆を始める
		</div>
	);
};

// Todo
// TODO jotaiで本文管理

// Done
// TODO tailwind-scrollbar試す
// TODO スクロール表示不備を検証
export const Editor = () => {
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
			<AutoFocusPlugin />
			<HistoryPlugin />
			<InitPlugin />
		</div>
	);
};
