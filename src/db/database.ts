import Dexie from 'dexie';
import type { ChildProfile, SkillProgress, SessionLog } from '../types/index.ts';

class MagiLearnDB extends Dexie {
  profiles!: Dexie.Table<ChildProfile, string>;
  skillProgress!: Dexie.Table<SkillProgress, string>;
  sessionLogs!: Dexie.Table<SessionLog, string>;

  constructor() {
    super('MagiLearnDB');
    this.version(1).stores({
      profiles: 'id, name',
      skillProgress: 'id, subject, skillKey, period, mastery',
      sessionLogs: 'id, date',
    });
  }
}

export const db = new MagiLearnDB();
