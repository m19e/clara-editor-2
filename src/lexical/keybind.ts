import { $moveCharacter } from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";
import type { LexicalEditor, TextFormatType } from "lexical";
import {
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_EDITOR,
	COMMAND_PRIORITY_HIGH,
	FORMAT_TEXT_COMMAND,
	INSERT_PARAGRAPH_COMMAND,
	KEY_ARROW_DOWN_COMMAND,
	KEY_ARROW_LEFT_COMMAND,
	KEY_ARROW_RIGHT_COMMAND,
	KEY_ARROW_UP_COMMAND,
	KEY_ENTER_COMMAND,
	KEY_TAB_COMMAND,
	PASTE_COMMAND,
} from "lexical";
import { useLayoutEffect } from "react";

import { onPasteForRichText } from "./lib/clipboard";
import { $moveLine } from "./lib/selection";

export function useKeybind(editor: LexicalEditor): void {
	useLayoutEffect(() => {
		return mergeRegister(
			// bind arrow key to WYSIWYG caret move
			editor.registerCommand<KeyboardEvent>(
				KEY_ARROW_LEFT_COMMAND,
				(payload) => {
					const selection = $getSelection();
					if (!$isRangeSelection(selection)) {
						return false;
					}
					const isHoldingShift = payload.shiftKey;
					// if we prevent default, cannot autoscroll following caret on Chrome & Webkit
					payload.preventDefault();
					$moveLine(selection, isHoldingShift, false);
					return true;
				},
				COMMAND_PRIORITY_EDITOR,
			),
			editor.registerCommand<KeyboardEvent>(
				KEY_ARROW_RIGHT_COMMAND,
				(payload) => {
					const selection = $getSelection();
					if (!$isRangeSelection(selection)) {
						return false;
					}
					const isHoldingShift = payload.shiftKey;
					// if we prevent default, cannot autoscroll following caret on Chrome & Webkit
					payload.preventDefault();
					$moveLine(selection, isHoldingShift, true);
					return true;
				},
				COMMAND_PRIORITY_EDITOR,
			),
			editor.registerCommand<KeyboardEvent>(
				KEY_ARROW_UP_COMMAND,
				(payload) => {
					const selection = $getSelection();
					if (!$isRangeSelection(selection)) {
						return false;
					}
					const isHoldingShift = payload.shiftKey;
					payload.preventDefault();
					$moveCharacter(selection, isHoldingShift, false);
					return true;
				},
				COMMAND_PRIORITY_EDITOR,
			),
			editor.registerCommand<KeyboardEvent>(
				KEY_ARROW_DOWN_COMMAND,
				(payload) => {
					const selection = $getSelection();
					if (!$isRangeSelection(selection)) {
						return false;
					}
					const isHoldingShift = payload.shiftKey;
					payload.preventDefault();
					$moveCharacter(selection, isHoldingShift, true);
					return true;
				},
				COMMAND_PRIORITY_EDITOR,
			),
			// overwrite default rich text editor behavior
			editor.registerCommand(
				INSERT_PARAGRAPH_COMMAND,
				() => {
					const selection = $getSelection();
					if (!$isRangeSelection(selection)) {
						return false;
					}
					selection.insertParagraph();
					return true;
				},
				COMMAND_PRIORITY_HIGH,
			),
			editor.registerCommand<KeyboardEvent | null>(
				KEY_ENTER_COMMAND,
				(event) => {
					const selection = $getSelection();
					if (!$isRangeSelection(selection)) {
						return false;
					}
					if (event !== null) {
						event.preventDefault();
						if (event.shiftKey) {
							return editor.dispatchCommand(
								INSERT_PARAGRAPH_COMMAND,
								undefined,
							);
						}
					}
					return editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined);
				},
				COMMAND_PRIORITY_HIGH,
			),
			editor.registerCommand(
				PASTE_COMMAND,
				(event) => {
					const selection = $getSelection();
					if ($isRangeSelection(selection)) {
						onPasteForRichText(event, editor);
						return true;
					}
					return false;
				},
				COMMAND_PRIORITY_HIGH,
			),
			editor.registerCommand<KeyboardEvent>(
				KEY_TAB_COMMAND,
				(event) => {
					event.preventDefault();
					return true;
				},
				COMMAND_PRIORITY_HIGH,
			),
			editor.registerCommand<TextFormatType>(
				FORMAT_TEXT_COMMAND,
				() => {
					return true;
				},
				COMMAND_PRIORITY_HIGH,
			),
		);
	}, [editor]);
}
