import {
	type InitialConfigType,
	LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { Editor } from "./components/Editor";
import { MetaHead } from "./components/MetaHead";

// Todo

// Done
// TODO biomeでclassNameソートできるか試す
// TODO daisyuiのコンポーネント並べてみる
// TODO lexical-composerでラップ
// TODO plugins/useKeybind実装
// TODO lexicalの縦書き動作確認
// TODO ビルド検証
// TODO jotai入れる
function App() {
	const initialConfig: InitialConfigType = {
		namespace: "ClaraEditor2",
		onError: (err) => console.error(err),
	};

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<MetaHead />
			<Editor />
		</LexicalComposer>
	);
}

export default App;
