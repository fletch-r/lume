import { NDKEvent, NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { RepostIcon } from "@shared/icons";
import { RelayContext } from "@shared/relayProvider";
import { useActiveAccount } from "@stores/accounts";
import { dateToUnix } from "@utils/date";
import { compactNumber } from "@utils/number";
import { useContext, useEffect, useState } from "react";

export function NoteRepost({
	id,
	pubkey,
	reposts,
}: { id: string; pubkey: string; reposts: number }) {
	const ndk = useContext(RelayContext);
	const account = useActiveAccount((state: any) => state.account);

	const [count, setCount] = useState(0);

	const submitEvent = (e: any) => {
		e.stopPropagation();

		const signer = new NDKPrivateKeySigner(account.privkey);
		ndk.signer = signer;

		const event = new NDKEvent(ndk);
		// build event
		event.content = "";
		event.kind = 6;
		event.created_at = dateToUnix();
		event.pubkey = account.pubkey;
		event.tags = [
			["e", id],
			["p", pubkey],
		];

		// publish event
		event.publish();

		// update state
		setCount(count + 1);
	};

	useEffect(() => {
		setCount(reposts);
	}, [reposts]);

	return (
		<button
			type="button"
			onClick={(e) => submitEvent(e)}
			className="w-20 group inline-flex items-center gap-1.5"
		>
			<RepostIcon
				width={16}
				height={16}
				className="text-zinc-400 group-hover:text-blue-400"
			/>
			<span className="text-base leading-none text-zinc-400 group-hover:text-white">
				{compactNumber.format(count)}
			</span>
		</button>
	);
}
