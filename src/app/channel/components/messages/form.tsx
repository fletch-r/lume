import { UserReply } from "@app/channel/components/messages/userReply";
import { NDKEvent, NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { CancelIcon } from "@shared/icons";
import { RelayContext } from "@shared/relayProvider";
import { useActiveAccount } from "@stores/accounts";
import { useChannelMessages } from "@stores/channels";
import { dateToUnix } from "@utils/date";
import { useContext, useState } from "react";

export function ChannelMessageForm({ channelID }: { channelID: string }) {
	const ndk = useContext(RelayContext);
	const account = useActiveAccount((state: any) => state.account);

	const [value, setValue] = useState("");
	const [replyTo, closeReply] = useChannelMessages((state: any) => [
		state.replyTo,
		state.closeReply,
	]);

	const submitEvent = () => {
		let tags: string[][];

		if (replyTo.id !== null) {
			tags = [
				["e", channelID, "", "root"],
				["e", replyTo.id, "", "reply"],
				["p", replyTo.pubkey, ""],
			];
		} else {
			tags = [["e", channelID, "", "root"]];
		}

		const signer = new NDKPrivateKeySigner(account.privkey);
		ndk.signer = signer;

		const event = new NDKEvent(ndk);
		// build event
		event.content = value;
		event.kind = 42;
		event.created_at = dateToUnix();
		event.pubkey = account.pubkey;
		event.tags = tags;

		// publish event
		event.publish();

		// reset state
		setValue("");
	};

	const handleEnterPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			submitEvent();
		}
	};

	const stopReply = () => {
		closeReply();
	};

	return (
		<div
			className={`relative ${
				replyTo.id ? "h-36" : "h-24"
			} w-full overflow-hidden before:pointer-events-none before:absolute before:-inset-1 before:rounded-[6px] before:border before:border-fuchsia-500 before:opacity-0 before:ring-2 before:ring-fuchsia-500/20 before:transition after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 after:transition focus-within:before:opacity-100 focus-within:after:shadow-fuchsia-500/100 dark:focus-within:after:shadow-fuchsia-500/20`}
		>
			{replyTo.id && (
				<div className="absolute left-0 top-0 z-10 h-16 w-full p-[2px]">
					<div className="flex h-full w-full items-center justify-between rounded-t-md border-b border-zinc-700/70 bg-zinc-900 px-3">
						<div className="flex w-full flex-col">
							<UserReply pubkey={replyTo.pubkey} />
							<div className="-mt-5 pl-[38px]">
								<div className="text-base text-zinc-100">{replyTo.content}</div>
							</div>
						</div>
						<button
							type="button"
							onClick={() => stopReply()}
							className="inline-flex h-5 w-5 items-center justify-center rounded hover:bg-zinc-800"
						>
							<CancelIcon width={12} height={12} className="text-white" />
						</button>
					</div>
				</div>
			)}
			<textarea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleEnterPress}
				spellCheck={false}
				placeholder="Message"
				className={`relative ${
					replyTo.id ? "h-36 pt-16" : "h-24 pt-3"
				} w-full resize-none rounded-lg border border-black/5 px-3.5 pb-3 text-base shadow-input shadow-black/5 !outline-none placeholder:text-zinc-400 dark:bg-zinc-800 dark:text-white dark:shadow-black/10 dark:placeholder:text-zinc-500`}
			/>
			<div className="absolute bottom-2 w-full px-2">
				<div className="flex w-full items-center justify-between bg-zinc-800">
					<div className="flex items-center gap-2 divide-x divide-zinc-700">
						<div className="flex items-center gap-2 pl-2" />
					</div>
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => submitEvent()}
							disabled={value.length === 0 ? true : false}
							className="inline-flex h-8 w-16 items-center justify-center rounded-md bg-fuchsia-500 px-4 text-base font-medium shadow-button hover:bg-fuchsia-600 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
						>
							Send
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
