import { contextBridge, ipcRenderer } from "electron";
import Store from "electron-store";
// main側のpath指定はaliasにしない(ビルドケア)
import { schema } from "../common/consts";
import type { Schema } from "../common/types";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
	on(...args: Parameters<typeof ipcRenderer.on>) {
		const [channel, listener] = args;
		return ipcRenderer.on(channel, (event, ...args) =>
			listener(event, ...args),
		);
	},
	off(...args: Parameters<typeof ipcRenderer.off>) {
		const [channel, ...omit] = args;
		return ipcRenderer.off(channel, ...omit);
	},
	send(...args: Parameters<typeof ipcRenderer.send>) {
		const [channel, ...omit] = args;
		return ipcRenderer.send(channel, ...omit);
	},
	invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
		const [channel, ...omit] = args;
		return ipcRenderer.invoke(channel, ...omit);
	},

	// You can expose other APTs you need here.
	// ...
});

const store = new Store<Schema>({ schema });

// TODO electron-store用のAPI生やす
contextBridge.exposeInMainWorld("store", {
	get<K extends keyof Schema>(key: K): Schema[K] | undefined {
		return store.get(key);
	},
	set<K extends keyof Schema>(key: K, value: Schema[K]) {
		store.set(key, value);
	},
	delete(key: keyof Schema) {
		store.delete(key);
	},
});
