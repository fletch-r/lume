import { commands } from "@/commands.gen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/columns/_layout/create-group")({
	loader: async () => {
		const res = await commands.getContactList();

		if (res.status === "ok") {
			return res.data;
		} else {
			throw new Error(res.error);
		}
	},
});
