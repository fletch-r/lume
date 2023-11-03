import * as Avatar from '@radix-ui/react-avatar';
import { minidenticon } from 'minidenticons';

import { useStorage } from '@libs/storage/provider';

import { LoaderIcon } from '@shared/icons';

import { useProfile } from '@utils/hooks/useProfile';
import { displayNpub } from '@utils/shortenKey';

export function ProfileCard() {
  const { db } = useStorage();
  const { status, user } = useProfile(db.account.pubkey);

  const svgURI =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(minidenticon(db.account.pubkey, 90, 50));

  return (
    <div className="mb-4 h-56 w-full rounded-2xl bg-neutral-100 transition-all duration-150 ease-smooth hover:scale-105 dark:bg-neutral-900">
      {status === 'pending' ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoaderIcon className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col justify-end p-4">
          <div className="flex flex-col gap-2.5">
            <Avatar.Root className="shrink-0">
              <Avatar.Image
                src={user?.picture || user?.image}
                alt={db.account.pubkey}
                loading="lazy"
                decoding="async"
                style={{ contentVisibility: 'auto' }}
                className="h-16 w-16 rounded-xl border border-neutral-200/50 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:border-neutral-800/50"
              />
              <Avatar.Fallback delayMs={300}>
                <img
                  src={svgURI}
                  alt={db.account.pubkey}
                  className="h-16 w-16 rounded-xl bg-black dark:bg-white"
                />
              </Avatar.Fallback>
            </Avatar.Root>
            <div>
              <h3 className="text-3xl font-semibold leading-8 text-neutral-900 dark:text-neutral-100">
                {user?.display_name || user?.name}
              </h3>
              <p className="text-lg text-neutral-700 dark:text-neutral-300">
                {user.nip05 || displayNpub(db.account.pubkey, 16)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
