import { ChannelsList } from "@app/channel/components/list";
import { ChatsList } from "@app/chat/components/list";
import { Disclosure } from "@headlessui/react";
import { ActiveLink } from "@shared/activeLink";
import { AppHeader } from "@shared/appHeader";
import { Composer } from "@shared/composer/modal";
import { NavArrowDownIcon, SpaceIcon, TrendingIcon } from "@shared/icons";
import { useComposer } from "@stores/composer";

export function Navigation() {
	const toggle = useComposer((state: any) => state.toggleModal);

	return (
		<div className="flex w-[232px] flex-col gap-3 border-r border-zinc-900">
			<AppHeader />
			<div className="flex flex-col gap-5 overflow-y-auto scrollbar-hide">
				<div className="inlin-lflex h-8 px-3.5">
					<Composer />
				</div>
				{/* Newsfeed */}
				<div className="flex flex-col gap-0.5 px-1.5">
					<div className="px-2.5">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">
							Feeds
						</h3>
					</div>
					<div className="flex flex-col gap-1">
						<ActiveLink
							href="/app/space"
							className="flex h-9 items-center gap-2.5 rounded-md px-2.5 text-zinc-200"
							activeClassName="bg-zinc-900/50"
						>
							<span className="inline-flex h-6 w-6 items-center justify-center rounded border-t border-zinc-800/50 bg-zinc-900">
								<SpaceIcon width={12} height={12} className="text-zinc-100" />
							</span>
							<span className="font-medium">Spaces</span>
						</ActiveLink>
						<ActiveLink
							href="/app/trending"
							className="flex h-9 items-center gap-2.5 rounded-md px-2.5 text-zinc-200"
							activeClassName="bg-zinc-900/50"
						>
							<span className="inline-flex h-6 w-6 items-center justify-center rounded border-t border-zinc-800/50 bg-zinc-900">
								<TrendingIcon
									width={12}
									height={12}
									className="text-zinc-100"
								/>
							</span>
							<span className="font-medium">Trending</span>
						</ActiveLink>
					</div>
				</div>
				{/* Channels */}
				<Disclosure defaultOpen={true}>
					{({ open }) => (
						<div className="flex flex-col gap-0.5 px-1.5">
							<Disclosure.Button className="flex items-center gap-1 px-2.5">
								<div
									className={`inline-flex h-5 w-5 transform items-center justify-center transition-transform duration-150 ease-in-out ${
										open ? "" : "rotate-180"
									}`}
								>
									<NavArrowDownIcon
										width={12}
										height={12}
										className="text-zinc-700"
									/>
								</div>
								<h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">
									Channels
								</h3>
							</Disclosure.Button>
							<Disclosure.Panel>
								<ChannelsList />
							</Disclosure.Panel>
						</div>
					)}
				</Disclosure>
				{/* Chats */}
				<Disclosure defaultOpen={true}>
					{({ open }) => (
						<div className="flex flex-col gap-0.5 px-1.5 pb-6">
							<Disclosure.Button className="flex items-center gap-1 px-2.5">
								<div
									className={`inline-flex h-5 w-5 transform items-center justify-center transition-transform duration-150 ease-in-out ${
										open ? "" : "rotate-180"
									}`}
								>
									<NavArrowDownIcon
										width={12}
										height={12}
										className="text-zinc-700"
									/>
								</div>
								<h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">
									Chats
								</h3>
							</Disclosure.Button>
							<Disclosure.Panel>
								<ChatsList />
							</Disclosure.Panel>
						</div>
					)}
				</Disclosure>
			</div>
		</div>
	);
}
