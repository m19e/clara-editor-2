import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { draftFilepathAtom, isSavedAtom } from "@/store/atoms";

// TODO rename correctly
export const MetaHead = () => {
	const isSaved = useAtomValue(isSavedAtom);
	const draftPath = useAtomValue(draftFilepathAtom);

	useEffect(() => {
		const appTitle = `${isSaved ? "" : "*"}${draftPath} - Clara Editor 2`;

		// Update the document title
		document.title = appTitle;
	}, [isSaved, draftPath]);

	return null;
};
