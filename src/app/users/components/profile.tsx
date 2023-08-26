import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserStats } from '@app/users/components/stats';

import { useStorage } from '@libs/storage/provider';

import { EditProfileModal } from '@shared/editProfileModal';
import { Image } from '@shared/image';

import { useProfile } from '@utils/hooks/useProfile';
import { useSocial } from '@utils/hooks/useSocial';
import { shortenKey } from '@utils/shortenKey';

export function UserProfile({ pubkey }: { pubkey: string }) {
  const { db } = useStorage();
  const { user } = useProfile(pubkey);
  const { status, userFollows, follow, unfollow } = useSocial();

  const [followed, setFollowed] = useState(false);

  const followUser = (pubkey: string) => {
    try {
      follow(pubkey);

      // update state
      setFollowed(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowUser = (pubkey: string) => {
    try {
      unfollow(pubkey);

      // update state
      setFollowed(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 'success' && userFollows) {
      if (userFollows.includes(pubkey)) {
        setFollowed(true);
      }
    }
  }, [status]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div className="h-56 w-full">
        {user.banner ? (
          <img
            src={user.banner}
            alt="user banner"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-black/50" />
        )}
      </div>
      <div className="-mt-7 flex w-full flex-col items-center px-5">
        <Image
          src={user.picture || user.image}
          alt={pubkey}
          className="h-14 w-14 rounded-lg ring-2 ring-black"
        />
        <div className="mt-2 flex flex-1 flex-col gap-6">
          <div className="flex flex-col items-center gap-1">
            <div className="inline-flex flex-col gap-1.5">
              <h5 className="text-center text-xl font-semibold leading-none">
                {user.display_name || user.displayName || user.name || 'No name'}
              </h5>
              <span className="max-w-[15rem] truncate text-center leading-none text-white/50">
                {user.nip05 || user.username || shortenKey(pubkey)}
              </span>
            </div>
            <div className="flex flex-col gap-6">
              {user.about || user.bio ? (
                <p className="mt-2 max-w-[500px] select-text break-words text-center text-white">
                  {user.about || user.bio}
                </p>
              ) : (
                <></>
              )}
              <UserStats pubkey={pubkey} />
            </div>
          </div>
          <div className="inline-flex items-center justify-center gap-2">
            {status === 'loading' ? (
              <button
                type="button"
                className="inline-flex h-10 w-36 items-center justify-center rounded-md bg-white/10 text-sm font-medium hover:bg-fuchsia-500"
              >
                Loading...
              </button>
            ) : followed ? (
              <button
                type="button"
                onClick={() => unfollowUser(pubkey)}
                className="inline-flex h-10 w-36 items-center justify-center rounded-md bg-white/10 text-sm font-medium hover:bg-fuchsia-500"
              >
                Unfollow
              </button>
            ) : (
              <button
                type="button"
                onClick={() => followUser(pubkey)}
                className="inline-flex h-10 w-36 items-center justify-center rounded-md bg-white/10 text-sm font-medium hover:bg-fuchsia-500"
              >
                Follow
              </button>
            )}
            <Link
              to={`/chats/${pubkey}`}
              className="inline-flex h-10 w-36 items-center justify-center rounded-md bg-white/10 text-sm font-medium hover:bg-fuchsia-500"
            >
              Message
            </Link>
            {db.account.pubkey === pubkey && (
              <>
                <span className="mx-2 inline-flex h-4 w-px bg-white/10" />
                <EditProfileModal />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}