import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { ChatsListItem } from '@app/chats/components/item';
import { NewMessageModal } from '@app/chats/components/modal';
import { UnknownsModal } from '@app/chats/components/unknowns';

import { useStorage } from '@libs/storage/provider';

import { useNostr } from '@utils/hooks/useNostr';

export function ChatsList() {
  const { db } = useStorage();
  const { fetchNIP04Chats } = useNostr();
  const { status, data: chats } = useQuery(
    ['nip04-chats'],
    async () => {
      return await fetchNIP04Chats();
    },
    { refetchOnWindowFocus: false }
  );

  const renderItem = useCallback(
    (item: string) => {
      if (db.account.pubkey !== item) {
        return <ChatsListItem key={item} pubkey={item} />;
      }
    },
    [chats]
  );

  if (status === 'loading') {
    return (
      <div className="flex flex-col">
        <div className="inline-flex h-9 items-center gap-2.5 rounded-md px-2.5">
          <div className="relative h-6 w-6 shrink-0 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-full animate-pulse rounded-sm bg-white/10" />
        </div>
        <div className="inline-flex h-9 items-center gap-2.5 rounded-md px-2.5">
          <div className="relative h-6 w-6 shrink-0 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-full animate-pulse rounded-sm bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {chats.follows.map((item) => renderItem(item))}
      {chats.unknowns.length > 0 && <UnknownsModal data={chats.unknowns} />}
      <NewMessageModal />
    </div>
  );
}