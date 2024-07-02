
         // This file was generated by [tauri-specta](https://github.com/oscartbeaumont/tauri-specta). Do not edit this file manually.

         /** user-defined commands **/

         export const commands = {
async getRelays() : Promise<Result<Relays, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_relays") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async connectRelay(relay: string) : Promise<Result<boolean, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("connect_relay", { relay }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async removeRelay(relay: string) : Promise<Result<boolean, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("remove_relay", { relay }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getBootstrapRelays() : Promise<Result<string[], string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_bootstrap_relays") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async saveBootstrapRelays(relays: string) : Promise<Result<null, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("save_bootstrap_relays", { relays }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getAccounts() : Promise<Result<string[], string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_accounts") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async createAccount() : Promise<Result<Account, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("create_account") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async saveAccount(nsec: string, password: string) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("save_account", { nsec, password }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getEncryptedKey(npub: string, password: string) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_encrypted_key", { npub, password }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getPrivateKey(npub: string) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_private_key", { npub }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async connectRemoteAccount(uri: string) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("connect_remote_account", { uri }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async loadAccount(npub: string, bunker: string | null) : Promise<Result<boolean, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("load_account", { npub, bunker }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getCurrentProfile() : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_current_profile") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getProfile(id: string) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_profile", { id }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getContactList() : Promise<Result<string[], string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_contact_list") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async setContactList(publicKeys: string[]) : Promise<Result<boolean, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("set_contact_list", { publicKeys }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async createProfile(name: string, displayName: string, about: string, picture: string, banner: string, nip05: string, lud16: string, website: string) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("create_profile", { name, displayName, about, picture, banner, nip05, lud16, website }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async isContactListEmpty() : Promise<Result<boolean, null>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("is_contact_list_empty") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async checkContact(hex: string) : Promise<Result<boolean, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("check_contact", { hex }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async toggleContact(hex: string, alias: string | null) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("toggle_contact", { hex, alias }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getNstore(key: string) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_nstore", { key }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async setNstore(key: string, content: string) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("set_nstore", { key, content }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async setWallet(uri: string) : Promise<Result<boolean, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("set_wallet", { uri }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async loadWallet() : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("load_wallet") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async removeWallet() : Promise<Result<null, null>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("remove_wallet") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async zapProfile(id: string, amount: string, message: string) : Promise<Result<boolean, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("zap_profile", { id, amount, message }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async zapEvent(id: string, amount: string, message: string) : Promise<Result<boolean, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("zap_event", { id, amount, message }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async friendToFriend(npub: string) : Promise<Result<boolean, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("friend_to_friend", { npub }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getNotifications() : Promise<Result<string[], string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_notifications") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getSettings() : Promise<Result<Settings, null>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_settings") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async setNewSettings(settings: string) : Promise<Result<null, null>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("set_new_settings", { settings }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async verifyNip05(key: string, nip05: string) : Promise<Result<boolean, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("verify_nip05", { key, nip05 }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getEventMeta(content: string) : Promise<Result<Meta, null>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_event_meta", { content }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getEvent(id: string) : Promise<Result<RichEvent, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_event", { id }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getEventFrom(id: string, relayHint: string) : Promise<Result<RichEvent, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_event_from", { id, relayHint }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getReplies(id: string) : Promise<Result<RichEvent[], string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_replies", { id }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async listenEventReply(id: string) : Promise<Result<null, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("listen_event_reply", { id }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getEventsBy(publicKey: string, asOf: string | null) : Promise<Result<RichEvent[], string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_events_by", { publicKey, asOf }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getLocalEvents(until: string | null) : Promise<Result<RichEvent[], string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_local_events", { until }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async listenLocalEvent(label: string) : Promise<Result<null, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("listen_local_event", { label }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getGroupEvents(publicKeys: string[], until: string | null) : Promise<Result<RichEvent[], string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_group_events", { publicKeys, until }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getGlobalEvents(until: string | null) : Promise<Result<RichEvent[], string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_global_events", { until }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getHashtagEvents(hashtags: string[], until: string | null) : Promise<Result<RichEvent[], string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("get_hashtag_events", { hashtags, until }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async publish(content: string, warning: string | null, difficulty: number | null) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("publish", { content, warning, difficulty }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async reply(content: string, to: string, root: string | null) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("reply", { content, to, root }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async repost(raw: string) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("repost", { raw }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async eventToBech32(id: string) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("event_to_bech32", { id }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async userToBech32(user: string) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("user_to_bech32", { user }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async unlisten(id: string) : Promise<Result<null, null>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("unlisten", { id }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async createColumn(column: Column) : Promise<Result<string, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("create_column", { column }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async closeColumn(label: string) : Promise<Result<boolean, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("close_column", { label }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async repositionColumn(label: string, x: number, y: number) : Promise<Result<null, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("reposition_column", { label, x, y }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async resizeColumn(label: string, width: number, height: number) : Promise<Result<null, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("resize_column", { label, width, height }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async reloadColumn(label: string) : Promise<Result<null, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("reload_column", { label }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async openWindow(window: Window) : Promise<Result<null, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("open_window", { window }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async openMainWindow() : Promise<void> {
await TAURI_INVOKE("open_main_window");
},
async forceQuit() : Promise<void> {
await TAURI_INVOKE("force_quit");
},
async setBadge(count: number) : Promise<void> {
await TAURI_INVOKE("set_badge", { count });
}
}

         /** user-defined events **/



         /** user-defined statics **/

         

/** user-defined types **/

export type Account = { npub: string; nsec: string }
export type Column = { label: string; url: string; x: number; y: number; width: number; height: number }
export type Meta = { content: string; images: string[]; videos: string[]; events: string[]; mentions: string[]; hashtags: string[] }
export type Relays = { connected: string[]; read: string[] | null; write: string[] | null; both: string[] | null }
export type RichEvent = { raw: string; parsed: Meta | null }
export type Settings = { proxy: string | null; image_resize_service: string | null; use_relay_hint: boolean; content_warning: boolean; display_avatar: boolean; display_zap_button: boolean; display_repost_button: boolean; display_media: boolean; vibrancy: boolean }
export type Window = { label: string; title: string; url: string; width: number; height: number; maximizable: boolean; minimizable: boolean; hidden_title: boolean }

/** tauri-specta globals **/

         import { invoke as TAURI_INVOKE } from "@tauri-apps/api/core";
import * as TAURI_API_EVENT from "@tauri-apps/api/event";
import { type WebviewWindow as __WebviewWindow__ } from "@tauri-apps/api/webviewWindow";

type __EventObj__<T> = {
  listen: (
    cb: TAURI_API_EVENT.EventCallback<T>
  ) => ReturnType<typeof TAURI_API_EVENT.listen<T>>;
  once: (
    cb: TAURI_API_EVENT.EventCallback<T>
  ) => ReturnType<typeof TAURI_API_EVENT.once<T>>;
  emit: T extends null
    ? (payload?: T) => ReturnType<typeof TAURI_API_EVENT.emit>
    : (payload: T) => ReturnType<typeof TAURI_API_EVENT.emit>;
};

export type Result<T, E> =
  | { status: "ok"; data: T }
  | { status: "error"; error: E };

function __makeEvents__<T extends Record<string, any>>(
  mappings: Record<keyof T, string>
) {
  return new Proxy(
    {} as unknown as {
      [K in keyof T]: __EventObj__<T[K]> & {
        (handle: __WebviewWindow__): __EventObj__<T[K]>;
      };
    },
    {
      get: (_, event) => {
        const name = mappings[event as keyof T];

        return new Proxy((() => {}) as any, {
          apply: (_, __, [window]: [__WebviewWindow__]) => ({
            listen: (arg: any) => window.listen(name, arg),
            once: (arg: any) => window.once(name, arg),
            emit: (arg: any) => window.emit(name, arg),
          }),
          get: (_, command: keyof __EventObj__<any>) => {
            switch (command) {
              case "listen":
                return (arg: any) => TAURI_API_EVENT.listen(name, arg);
              case "once":
                return (arg: any) => TAURI_API_EVENT.once(name, arg);
              case "emit":
                return (arg: any) => TAURI_API_EVENT.emit(name, arg);
            }
          },
        });
      },
    }
  );
}

     