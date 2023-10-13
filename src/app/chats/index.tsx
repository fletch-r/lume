import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import { ChatListItem } from '@app/chats/components/chatListItem';

import { LoaderIcon } from '@shared/icons';

import { useNostr } from '@utils/hooks/useNostr';

export function ChatsScreen() {
  const { getAllNIP04Chats } = useNostr();
  const { status, data } = useQuery(
    ['nip04-chats'],
    async () => {
      return await getAllNIP04Chats();
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    }
  );

  const renderItem = useCallback(
    (event: NDKEvent) => {
      return <ChatListItem key={event.id} event={event} />;
    },
    [data]
  );

  return (
    <div className="grid h-full w-full grid-cols-3">
      <div className="col-span-1 h-full overflow-y-auto border-r border-white/5 scrollbar-none">
        <div
          data-tauri-drag-region
          className="flex h-11 w-full shrink-0 items-center border-b border-white/5 px-3"
        >
          <h3 className="bg-gradient-to-r from-blue-400 via-red-400 to-orange-500 bg-clip-text font-semibold text-transparent dark:from-blue-200 dark:via-red-200 dark:to-orange-300">
            All chats
          </h3>
        </div>
        <div className="flex h-full flex-col gap-1">
          {status === 'loading' ? (
            <div className="flex h-full w-full items-center justify-center pb-16">
              <div className="inline-flex flex-col items-center justify-center gap-2">
                <LoaderIcon className="h-5 w-5 animate-spin text-neutral-900 dark:text-neutral-100" />
                <h5 className="text-neutral-900 dark:text-neutral-100">
                  Loading messages...
                </h5>
              </div>
            </div>
          ) : (
            data.map((item) => renderItem(item))
          )}
        </div>
      </div>
      <div className="col-span-2">
        <Outlet />
      </div>
    </div>
  );
}
