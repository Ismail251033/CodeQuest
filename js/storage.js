/* ============================================
   CODEQUEST - STORAGE MODULE
   All localStorage operations
   ============================================ */

const STORAGE_KEYS = {
  USER_PROFILE:  'cq_user_profile',
  PROGRESS:      'cq_progress',
  SETTINGS:      'cq_settings',
  ACHIEVEMENTS:  'cq_achievements',
  ACTIVITY_LOG:  'cq_activity_log',
  MISTAKE_LOG:   'cq_mistake_log',
  QUESTIONNAIRE: 'cq_questionnaire',
};

const Storage = {

  // === GENERIC ===
  get(key) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    } catch(e) {
      console.warn('Storage.get error:', e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch(e) {
      console.warn('Storage.set error:', e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  },

  // === USER PROFILE ===
  getProfile() {
    return this.get(STORAGE_KEYS.USER_PROFILE) || this._defaultProfile();
  },

  saveProfile(profile) {
    return this.set(STORAGE_KEYS.USER_PROFILE, profile);
  },

  updateProfile(updates) {
    const profile = this.getProfile();
    const updated = { ...profile, ...updates, updatedAt: Date.now() };
    this.saveProfile(updated);
    return updated;
  },

  _defaultProfile() {
    return {
      id: 'user_' + Date.now(),
      name: 'Coder',
      avatar: '🧑‍💻',
      language: null,
      level: 'beginner',
      goals: [],
      xp: 0,
      totalXp: 0,
      level_num: 1,
      rank: 'Novice Coder',
      streak: 0,
      maxStreak: 0,
      lastActiveDate: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  },

  // === PROGRESS ===
  getProgress() {
    return this.get(STORAGE_KEYS.PROGRESS) || {};
  },

  getTopicProgress(language, topicId) {
    const progress = this.getProgress();
    return progress[language]?.[topicId] || {
      status: 'available',
      mastery: 0,
      lessonsCompleted: [],
      challengesCompleted: [],
      quizScores: [],
      mistakeCount: 0,
      lastAttempted: null,
    };
  },

  setTopicProgress(language, topicId, topicData) {
    const progress = this.getProgress();
    if (!progress[language]) progress[language] = {};
    progress[language][topicId] = { ...topicData, updatedAt: Date.now() };
    this.set(STORAGE_KEYS.PROGRESS, progress);
  },

  updateTopicProgress(language, topicId, updates) {
    const current = this.getTopicProgress(language, topicId);
    this.setTopicProgress(language, topicId, { ...current, ...updates });
  },

  markLessonComplete(language, topicId, lessonId) {
    const tp = this.getTopicProgress(language, topicId);
    if (!tp.lessonsCompleted.includes(lessonId)) {
      tp.lessonsCompleted.push(lessonId);
    }
    tp.lastAttempted = Date.now();
    this.setTopicProgress(language, topicId, tp);
  },

  markChallengeComplete(language, topicId, challengeId, score) {
    const tp = this.getTopicProgress(language, topicId);
    if (!tp.challengesCompleted.includes(challengeId)) {
      tp.challengesCompleted.push(challengeId);
    }
    tp.quizScores.push({ id: challengeId, score, date: Date.now() });
    tp.lastAttempted = Date.now();
    this.setTopicProgress(language, topicId, tp);
  },

  // === XP ===
  addXP(amount) {
    const profile = this.getProfile();
    profile.xp += amount;
    profile.totalXp += amount;

    // Level progression: every 500 XP = 1 level
    const newLevel = Math.floor(profile.totalXp / 500) + 1;
    const leveledUp = newLevel > profile.level_num;
    profile.level_num = newLevel;
    profile.rank = this._getRank(newLevel);

    this.saveProfile(profile);
    this.logActivity('xp_gain', { amount });
    return { profile, leveledUp, newLevel };
  },

  _getRank(level) {
    const ranks = [
      [1,  'Novice Coder'],
      [5,  'Code Apprentice'],
      [10, 'Junior Developer'],
      [15, 'Developer'],
      [20, 'Senior Developer'],
      [25, 'Tech Lead'],
      [30, 'Architect'],
      [40, 'Code Master'],
      [50, 'Code Legend'],
    ];
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (level >= ranks[i][0]) return ranks[i][1];
    }
    return 'Novice Coder';
  },

  // === STREAK ===
  updateStreak() {
    const profile = this.getProfile();
    const today = new Date().toDateString();
    const last  = profile.lastActiveDate;

    if (last === today) return profile.streak; // already counted today

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (last === yesterday) {
      profile.streak += 1;
    } else if (!last) {
      profile.streak = 1;
    } else {
      profile.streak = 1; // streak broken
    }

    profile.maxStreak = Math.max(profile.maxStreak, profile.streak);
    profile.lastActiveDate = today;
    this.saveProfile(profile);
    return profile.streak;
  },

  // === QUESTIONNAIRE ===
  getQuestionnaire() {
    return this.get(STORAGE_KEYS.QUESTIONNAIRE);
  },

  saveQuestionnaire(answers) {
    this.set(STORAGE_KEYS.QUESTIONNAIRE, answers);
    // Also update profile
    this.updateProfile({
      language: answers.language,
      level: answers.level,
      goals: answers.goals || [],
      studyTime: answers.studyTime,
      difficulty: answers.difficulty,
    });
  },

  // === ACHIEVEMENTS ===
  getAchievements() {
    return this.get(STORAGE_KEYS.ACHIEVEMENTS) || [];
  },

  unlockAchievement(id) {
    const achievements = this.getAchievements();
    if (!achievements.includes(id)) {
      achievements.push(id);
      this.set(STORAGE_KEYS.ACHIEVEMENTS, achievements);
      return true;
    }
    return false;
  },

  hasAchievement(id) {
    return this.getAchievements().includes(id);
  },

  // === ACTIVITY LOG ===
  logActivity(type, data = {}) {
    const log = this.get(STORAGE_KEYS.ACTIVITY_LOG) || [];
    log.push({ type, data, date: new Date().toDateString(), ts: Date.now() });
    // Keep last 365 days
    if (log.length > 1000) log.splice(0, log.length - 1000);
    this.set(STORAGE_KEYS.ACTIVITY_LOG, log);
  },

  getActivityByDate(dateStr) {
    const log = this.get(STORAGE_KEYS.ACTIVITY_LOG) || [];
    return log.filter(l => l.date === dateStr);
  },

  getActivityHeatmap() {
    const log = this.get(STORAGE_KEYS.ACTIVITY_LOG) || [];
    const map = {};
    log.forEach(l => {
      map[l.date] = (map[l.date] || 0) + 1;
    });
    return map;
  },

  // === MISTAKES ===
  logMistake(language, topicId, exerciseId, details) {
    const log = this.get(STORAGE_KEYS.MISTAKE_LOG) || [];
    log.push({ language, topicId, exerciseId, details, ts: Date.now() });
    this.set(STORAGE_KEYS.MISTAKE_LOG, log);
  },

  getMistakesByTopic(language, topicId) {
    const log = this.get(STORAGE_KEYS.MISTAKE_LOG) || [];
    return log.filter(l => l.language === language && l.topicId === topicId);
  },

  // === SETTINGS ===
  getSettings() {
    return this.get(STORAGE_KEYS.SETTINGS) || {
      soundEnabled: true,
      animationsEnabled: true,
      autoHints: false,
    };
  },

  saveSettings(settings) {
    this.set(STORAGE_KEYS.SETTINGS, settings);
  },
};

// Export for use in other modules
if (typeof module !== 'undefined') {
  module.exports = Storage;
  }
unlockTopic(language, topicId) 
{
  const tp = this.getTopicProgress(language, topicId);

  tp.status = 'available';

  this.setTopicProgress(language, topicId, tp);
 }
