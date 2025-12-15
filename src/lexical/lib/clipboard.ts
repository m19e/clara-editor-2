import type {
	CommandPayloadType,
	LexicalEditor,
	PASTE_COMMAND,
	RangeSelection,
} from "lexical";
import { $getSelection, $isRangeSelection } from "lexical";

function $insertDataTransferForNovelText(
	dataTransfer: DataTransfer,
	selection: RangeSelection,
): void {
	const text = dataTransfer.getData("text/plain");
	if (text != null) {
		if ($isRangeSelection(selection)) {
			const lines = text.split(/\r?\n/);
			const linesLength = lines.length;

			for (let i = 0; i < linesLength; i++) {
				selection.insertText(lines[i]);
				if (i < linesLength - 1) {
					selection.insertParagraph();
				}
			}
			console.log("hoge");
		}
		// else {
		//   selection.insertRawText(text);
		// }
	}
}

export function onPasteForRichText(
	event: CommandPayloadType<typeof PASTE_COMMAND>,
	editor: LexicalEditor,
): void {
	event.preventDefault();
	editor.update(
		() => {
			const selection = $getSelection();
			const clipboardData =
				event instanceof InputEvent || event instanceof KeyboardEvent
					? null
					: event.clipboardData;
			if (clipboardData != null && $isRangeSelection(selection)) {
				$insertDataTransferForNovelText(clipboardData, selection);
			}
		},
		{
			tag: "paste",
		},
	);
}
