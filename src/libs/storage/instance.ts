import { NDKEvent } from '@nostr-dev-kit/ndk';
import { BaseDirectory, removeFile } from '@tauri-apps/api/fs';
import Database from 'tauri-plugin-sql-api';
import { Stronghold } from 'tauri-plugin-stronghold-api';

import { Account, DBEvent, Relays, Widget } from '@utils/types';

export class LumeStorage {
  public db: Database;
  public secureDB: Stronghold;
  public account: Account | null = null;

  constructor(sqlite: Database, stronghold?: Stronghold) {
    this.db = sqlite;
    this.secureDB = stronghold ?? undefined;
    this.account = null;
  }

  private async getSecureClient() {
    try {
      return await this.secureDB.loadClient('lume');
    } catch {
      return await this.secureDB.createClient('lume');
    }
  }

  public async secureSave(key: string, value: string) {
    if (!this.secureDB) throw new Error("Stronghold isn't initialize");

    const client = await this.getSecureClient();
    const store = client.getStore();
    await store.insert(key, Array.from(new TextEncoder().encode(value)));
    return await this.secureDB.save();
  }

  public async secureLoad(key: string) {
    if (!this.secureDB) throw new Error("Stronghold isn't initialize");

    const client = await this.getSecureClient();
    const store = client.getStore();
    const value = await store.get(key);
    const decoded = new TextDecoder().decode(new Uint8Array(value));
    return decoded;
  }

  public async secureReset() {
    return await removeFile('lume.stronghold', { dir: BaseDirectory.AppConfig });
  }

  public async getActiveAccount() {
    const results: Array<Account> = await this.db.select(
      'SELECT * FROM accounts WHERE is_active = "1" ORDER BY id DESC LIMIT 1;'
    );

    if (results.length > 0) {
      const account = results[0];

      if (typeof account.follows === 'string')
        account.follows = JSON.parse(account.follows);

      if (typeof account.network === 'string')
        account.network = JSON.parse(account.network);

      if (typeof account.last_login_at === 'string')
        account.last_login_at = parseInt(account.last_login_at);

      this.account = account;
      return account;
    } else {
      console.log('no active account, please create new account');
      return null;
    }
  }

  public async createAccount(npub: string, pubkey: string) {
    const res = await this.db.execute(
      'INSERT OR IGNORE INTO accounts (npub, pubkey, privkey, is_active) VALUES ($1, $2, $3, $4);',
      [npub, pubkey, 'privkey is stored in secure storage', 1]
    );
    if (res) {
      const account = await this.getActiveAccount();
      return account;
    } else {
      console.error('create account failed');
    }
  }

  public async updateAccount(column: string, value: string | string[]) {
    const insert = await this.db.execute(
      `UPDATE accounts SET ${column} = $1 WHERE id = $2;`,
      [value, this.account.id]
    );

    if (insert) {
      const account = await this.getActiveAccount();
      return account;
    }
  }

  public async updateLastLogin() {
    const now = Math.floor(Date.now() / 1000);
    return await this.db.execute(
      'UPDATE accounts SET last_login_at = $1 WHERE id = $2;',
      [now, this.account.id]
    );
  }

  public async getWidgets() {
    const widgets: Array<Widget> = await this.db.select(
      'SELECT * FROM widgets WHERE account_id = $1 ORDER BY created_at DESC;',
      [this.account.id]
    );
    return widgets;
  }

  public async createWidget(kind: number, title: string, content: string | string[]) {
    const insert = await this.db.execute(
      'INSERT INTO widgets (account_id, kind, title, content) VALUES ($1, $2, $3, $4);',
      [this.account.id, kind, title, content]
    );

    if (insert) {
      const widgets: Array<Widget> = await this.db.select(
        'SELECT * FROM widgets ORDER BY id DESC LIMIT 1;'
      );
      if (widgets.length < 1) console.error('get created widget failed');
      return widgets[0];
    } else {
      console.error('create widget failed');
    }
  }

  public async removeWidget(id: string) {
    return await this.db.execute('DELETE FROM widgets WHERE id = $1;', [id]);
  }

  public async createEvent(
    id: string,
    event: string,
    author: string,
    kind: number,
    root_id: string,
    reply_id: string,
    created_at: number
  ) {
    return await this.db.execute(
      'INSERT OR IGNORE INTO events (id, account_id, event, author, kind, root_id, reply_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
      [id, this.account.id, event, author, kind, root_id, reply_id, created_at]
    );
  }

  public async getEventByID(id: string) {
    const results: DBEvent[] = await this.db.select(
      'SELECT * FROM events WHERE id = $1 LIMIT 1;',
      [id]
    );

    if (results.length < 1) return null;
    return JSON.parse(results[0].event as string) as NDKEvent;
  }

  public async countTotalEvents() {
    const result: Array<{ total: string }> = await this.db.select(
      'SELECT COUNT(*) AS "total" FROM events;'
    );
    return parseInt(result[0].total);
  }

  public async getAllEvents(limit: number, offset: number) {
    const totalEvents = await this.countTotalEvents();
    const nextCursor = offset + limit;

    const events: { data: DBEvent[] | null; nextCursor: number } = {
      data: null,
      nextCursor: 0,
    };

    const query: DBEvent[] = await this.db.select(
      'SELECT * FROM events GROUP BY root_id ORDER BY created_at DESC LIMIT $1 OFFSET $2;',
      [limit, offset]
    );

    if (query && query.length > 0) {
      events['data'] = query;
      events['nextCursor'] =
        Math.round(totalEvents / nextCursor) > 1 ? nextCursor : undefined;

      return events;
    }

    return {
      data: [],
      nextCursor: 0,
    };
  }

  public async getAllEventsByAuthors(authors: string[], limit: number, offset: number) {
    const totalEvents = await this.countTotalEvents();
    const nextCursor = offset + limit;
    const authorsArr = `'${authors.join("','")}'`;

    const events: { data: DBEvent[] | null; nextCursor: number } = {
      data: null,
      nextCursor: 0,
    };

    const query: DBEvent[] = await this.db.select(
      `SELECT * FROM events WHERE author IN (${authorsArr}) ORDER BY created_at DESC LIMIT $1 OFFSET $2;`,
      [limit, offset]
    );

    if (query && query.length > 0) {
      events['data'] = query;
      events['nextCursor'] =
        Math.round(totalEvents / nextCursor) > 1 ? nextCursor : undefined;

      return events;
    }

    return {
      data: [],
      nextCursor: 0,
    };
  }

  public async getAllEventsByKinds(kinds: number[], limit: number, offset: number) {
    const totalEvents = await this.countTotalEvents();
    const nextCursor = offset + limit;
    const authorsArr = `'${kinds.join("','")}'`;

    const events: { data: DBEvent[] | null; nextCursor: number } = {
      data: null,
      nextCursor: 0,
    };

    const query: DBEvent[] = await this.db.select(
      `SELECT * FROM events WHERE kinds IN (${authorsArr}) ORDER BY created_at DESC LIMIT $1 OFFSET $2;`,
      [limit, offset]
    );

    if (query && query.length > 0) {
      events['data'] = query;
      events['nextCursor'] =
        Math.round(totalEvents / nextCursor) > 1 ? nextCursor : undefined;

      return events;
    }

    return {
      data: [],
      nextCursor: 0,
    };
  }

  public async isEventsEmpty() {
    const results: DBEvent[] = await this.db.select(
      'SELECT * FROM events ORDER BY id DESC LIMIT 1;'
    );

    return results.length < 1;
  }

  public async getExplicitRelayUrls() {
    if (!this.account) return null;

    const result: Relays[] = await this.db.select(
      `SELECT * FROM relays WHERE account_id = "${this.account.id}" ORDER BY id DESC LIMIT 50;`
    );

    if (result.length < 1) return null;
    return result.map((el) => el.relay);
  }

  public async createRelay(relay: string, purpose?: string) {
    return await this.db.execute(
      'INSERT OR IGNORE INTO relays (account_id, relay, purpose) VALUES ($1, $2, $3);',
      [this.account.id, relay, purpose || '']
    );
  }

  public async removeRelay(relay: string) {
    return await this.db.execute(`DELETE FROM relays WHERE relay = "${relay}";`);
  }

  public async removePrivkey() {
    return await this.db.execute(
      `UPDATE accounts SET privkey = "privkey is stored in secure storage" WHERE id = "${this.account.id}";`
    );
  }

  public async close() {
    return this.db.close();
  }
}
