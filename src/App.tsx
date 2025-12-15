import {
	type InitialConfigType,
	LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { Editor } from "./components/Editor";

// Todo
// TODO jotai入れる

// Done
// TODO biomeでclassNameソートできるか試す
// TODO daisyuiのコンポーネント並べてみる
// TODO lexical-composerでラップ
// TODO plugins/useKeybind実装
// TODO lexicalの縦書き動作確認
// TODO ビルド検証
function App() {
	const initialConfig: InitialConfigType = {
		namespace: "ClaraEditor2",
		onError: (err) => console.error(err),
	};

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<Editor />
		</LexicalComposer>
	);
}

export default App;
