import type { NodeKey, PointType, RangeSelection } from "lexical";
import {
	$getAdjacentNode,
	$isDecoratorNode,
	$isElementNode,
	$isTextNode,
} from "lexical";

// TODO arrow function

const getDOMSelection = (): Selection | null => window.getSelection();

const $moveNativeSelection = (
	domSelection: Selection,
	alter: "move" | "extend",
	direction: "backward" | "forward" | "left" | "right",
	granularity: "character" | "word" | "lineboundary" | "line",
) => {
	domSelection.modify(alter, direction, granularity);
};

const $setPointValues = (
	point: PointType,
	key: NodeKey,
	offset: number,
	type: "text" | "element",
) => {
	point.key = key;
	point.offset = offset;
	point.type = type;
};

const $swapPoints = (selection: RangeSelection) => {
	const focus = selection.focus;
	const anchor = selection.anchor;
	const anchorKey = anchor.key;
	const anchorOffset = anchor.offset;
	const anchorType = anchor.type;

	$setPointValues(anchor, focus.key, focus.offset, focus.type);
	$setPointValues(focus, anchorKey, anchorOffset, anchorType);
	selection._cachedNodes = null;
};

const $modifyLineSelection = (
	selection: RangeSelection,
	alter: "move" | "extend",
	isBackward: boolean,
	granularity: "character" | "word" | "lineboundary" | "line",
) => {
	const focus = selection.focus;
	const anchor = selection.anchor;
	const collapse = alter === "move";

	// Handle the selection movement around decorators.
	// TODO: remove decorator logic
	const possibleNode = $getAdjacentNode(focus, isBackward);
	if ($isDecoratorNode(possibleNode) && !possibleNode.isIsolated()) {
		const sibling = isBackward
			? possibleNode.getPreviousSibling()
			: possibleNode.getNextSibling();

		if (!$isTextNode(sibling)) {
			const parent = possibleNode.getParentOrThrow();
			let offset: number;
			let elementKey: string;

			if ($isElementNode(sibling)) {
				elementKey = sibling.__key;
				offset = isBackward ? sibling.getChildrenSize() : 0;
			} else {
				offset = possibleNode.getIndexWithinParent();
				elementKey = parent.__key;
				if (!isBackward) {
					offset++;
				}
			}
			focus.set(elementKey, offset, "element");
			if (collapse) {
				anchor.set(elementKey, offset, "element");
			}
			return;
		} else {
			const siblingKey = sibling.__key;
			const offset = isBackward ? sibling.getTextContent().length : 0;
			focus.set(siblingKey, offset, "text");
			if (collapse) {
				anchor.set(siblingKey, offset, "text");
			}
			return;
		}
	}

	const domSelection = getDOMSelection();

	if (!domSelection) {
		return;
	}

	$moveNativeSelection(
		domSelection,
		alter,
		isBackward ? "backward" : "forward",
		granularity,
	);

	if (domSelection.rangeCount > 0) {
		const range = domSelection.getRangeAt(0);
		selection.applyDOMRange(range);
		selection.dirty = true;

		if (
			(!collapse && domSelection.anchorNode !== range.startContainer) ||
			domSelection.anchorOffset !== range.startOffset
		) {
			$swapPoints(selection);
		}
	}
};

export const $moveCaretSelection = (
	selection: RangeSelection,
	isHoldingShift: boolean,
	isBackward: boolean,
	granularity: "character" | "word" | "lineboundary" | "line",
) => {
	$modifyLineSelection(
		selection,
		isHoldingShift ? "extend" : "move",
		isBackward,
		granularity,
	);
};

export const $moveWord = (
	selection: RangeSelection,
	isHoldingShift: boolean,
	isBackward: boolean,
) => {
	$moveCaretSelection(selection, isHoldingShift, isBackward, "word");
};

export const $moveLine = (
	selection: RangeSelection,
	isHoldingShift: boolean,
	isBackward: boolean,
) => {
	$moveCaretSelection(selection, isHoldingShift, isBackward, "line");
};
