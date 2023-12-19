import * as Avatar from '@radix-ui/react-avatar';
import { useQuery } from '@tanstack/react-query';
import { minidenticon } from 'minidenticons';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { useArk } from '@libs/ark';
import { RepostIcon } from '@shared/icons';
import { displayNpub, formatCreatedAt } from '@utils/formater';

export function NoteUser({
  pubkey,
  time,
  variant = 'text',
  className,
}: {
  pubkey: string;
  time: number;
  variant?: 'text' | 'repost';
  className?: string;
}) {
  const ark = useArk();
  const createdAt = useMemo(() => formatCreatedAt(time), [time]);
  const fallbackName = useMemo(() => displayNpub(pubkey, 16), [pubkey]);
  const fallbackAvatar = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(pubkey, 90, 50)),
    [pubkey]
  );

  const { isLoading, data: user } = useQuery({
    queryKey: ['user', pubkey],
    queryFn: async () => {
      try {
        const profile = await ark.getUserProfile({ pubkey });

        if (!profile)
          throw new Error(
            `Cannot get metadata for ${pubkey}, will be retry after 10 seconds`
          );

        return profile;
      } catch (e) {
        throw new Error(e);
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 2,
  });

  if (variant === 'repost') {
    if (isLoading) {
      return (
        <div className={twMerge('flex gap-3', className)}>
          <div className="inline-flex w-10 items-center justify-center">
            <RepostIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="inline-flex items-center gap-2">
            <div className="h-6 w-6 animate-pulse rounded bg-neutral-300 dark:bg-neutral-700" />
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-300 dark:bg-neutral-700" />
          </div>
        </div>
      );
    }

    return (
      <div className={twMerge('flex gap-2', className)}>
        <div className="inline-flex w-10 items-center justify-center">
          <RepostIcon className="h-5 w-5 text-blue-500" />
        </div>
        <div className="inline-flex items-center gap-2">
          <Avatar.Root className="shrink-0">
            <Avatar.Image
              src={user?.picture || user?.image}
              alt={pubkey}
              loading="lazy"
              decoding="async"
              className="h-6 w-6 rounded object-cover"
            />
            <Avatar.Fallback delayMs={300}>
              <img
                src={fallbackAvatar}
                alt={pubkey}
                className="h-6 w-6 rounded bg-black dark:bg-white"
              />
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="inline-flex items-baseline gap-1">
            <h5 className="max-w-[10rem] truncate font-medium text-neutral-900 dark:text-neutral-100/80">
              {user?.name || user?.display_name || user?.displayName || fallbackName}
            </h5>
            <span className="text-blue-500">reposted</span>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={twMerge('flex items-center gap-3', className)}>
        <Avatar.Root className="h-9 w-9 shrink-0">
          <Avatar.Image
            src={fallbackAvatar}
            alt={pubkey}
            className="h-9 w-9 rounded-lg bg-black ring-1 ring-neutral-200/50 dark:bg-white dark:ring-neutral-800/50"
          />
        </Avatar.Root>
        <div className="h-6 flex-1">
          <div className="max-w-[15rem] truncate font-semibold text-neutral-950 dark:text-neutral-50">
            {fallbackName}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={twMerge('flex items-center gap-3', className)}>
      <Avatar.Root className="h-9 w-9 shrink-0">
        <Avatar.Image
          src={user?.picture || user?.image}
          alt={pubkey}
          loading="lazy"
          decoding="async"
          className="h-9 w-9 rounded-lg bg-white object-cover ring-1 ring-neutral-200/50 dark:ring-neutral-800/50"
        />
        <Avatar.Fallback delayMs={300}>
          <img
            src={fallbackAvatar}
            alt={pubkey}
            className="h-9 w-9 rounded-lg bg-black ring-1 ring-neutral-200/50 dark:bg-white dark:ring-neutral-800/50"
          />
        </Avatar.Fallback>
      </Avatar.Root>
      <div className="flex h-6 flex-1 items-start justify-between gap-2">
        <div className="max-w-[15rem] truncate font-semibold text-neutral-950 dark:text-neutral-50">
          {user?.name || user?.display_name || user?.displayName || fallbackName}
        </div>
        <div className="text-neutral-500 dark:text-neutral-400">{createdAt}</div>
      </div>
    </div>
  );
}
