declare global {
	interface Window {
		store: {
			get<K extends keyof import("../common/types").Schema>(
				key: K,
			): import("../common/types").Schema[K] | undefined;
			set<K extends keyof import("../common/types").Schema>(
				key: K,
				value: import("../common/types").Schema[K],
			): void;
			delete<K extends keyof import("../common/types").Schema>(key: K): void;
		};
	}
}
export {};
