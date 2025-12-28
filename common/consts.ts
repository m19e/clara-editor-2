import type { Schema as SchemaType } from "electron-store";
import type { Schema } from "./types";

export const schema: SchemaType<Schema> = {
	theme: {
		type: "string",
		enum: ["light", "dark"],
		default: "light",
	},
	"draft-filepath": {
		type: "string",
		default: "",
	},
	"font-type": {
		type: "string",
		enum: ["mincho", "gothic"],
		default: "mincho",
	},
	"font-size": {
		type: "number",
		default: 10,
	},
	"line-height": {
		type: "number",
		default: 20,
	},
	"line-words": {
		type: "number",
		default: 30,
	},
};
