import {
	type InitialConfigType,
	LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { Editor } from "./components/Editor";
import { MetaHead } from "./components/MetaHead";

// Todo
// TODO src以下を相対パスに統一する
// TODO 見えるとこの機能から作ってく
// TODO >書式設定(フォントサイズ、行間、字数)
// TODO >フォント設定

// Done
// TODO biomeでclassNameソートできるか試す
// TODO daisyuiのコンポーネント並べてみる
// TODO lexical-composerでラップ
// TODO plugins/useKeybind実装
// TODO lexicalの縦書き動作確認
// TODO ビルド検証
// TODO jotai入れる
// TODO appタイトル更新
// TODO 自動保存(挙動だけ)
// TODO タイトルのマーカー表示
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
