/* ============================================
   CODEQUEST - ADAPTIVE LEARNING SYSTEM
   ============================================ */

const AdaptiveLearning = {

  // Calculate topic mastery from performance data
  calculateMastery(topicProgress) {
    const { lessonsCompleted, challengesCompleted, quizScores, mistakeCount } = topicProgress;

    const lessonScore    = Math.min(lessonsCompleted.length * 20, 40);
    const challengeScore = Math.min(challengesCompleted.length * 15, 40);

    let avgQuizScore = 0;
    if (quizScores && quizScores.length > 0) {
      avgQuizScore = quizScores.reduce((s, q) => s + q.score, 0) / quizScores.length;
      avgQuizScore = (avgQuizScore / 100) * 20;
    }

    const mistakePenalty = Math.min(mistakeCount * 2, 10);
    const mastery = Math.max(0, Math.min(100, lessonScore + challengeScore + avgQuizScore - mistakePenalty));

    return Math.round(mastery);
  },

  // Recommend next topic/lesson based on progress
  getRecommendations(language, profile) {
    if (!window.COURSES || !COURSES[language]) return [];

    const course   = COURSES[language];
    const progress = Storage.getProgress()[language] || {};
    const recs     = [];

    for (const topic of course.topics) {
      const tp = progress[topic.id] || { status: 'locked', mastery: 0, lessonsCompleted: [], challengesCompleted: [], quizScores: [], mistakeCount: 0 };
      const mastery = this.calculateMastery(tp);

      // Recommend struggling topics
      if (tp.challengesCompleted.length > 0 && mastery < 50) {
        recs.push({
          type: 'review',
          topicId: topic.id,
          title: `Review: ${topic.title}`,
          reason: `Your mastery is at ${mastery}% — a quick review will solidify this!`,
          priority: 100 - mastery,
        });
      }

      // Recommend next unlocked topic
      if (tp.status === 'available' || tp.status === 'in_progress') {
        if (tp.lessonsCompleted.length < (topic.lessons || []).length) {
          recs.push({
            type: 'continue',
            topicId: topic.id,
            title: `Continue: ${topic.title}`,
            reason: 'Pick up where you left off.',
            priority: 80,
          });
        }
      }
    }

    return recs.sort((a, b) => b.priority - a.priority).slice(0, 3);
  },

  // Determine appropriate difficulty for next challenge
  suggestDifficulty(language, topicId) {
    const tp = Storage.getTopicProgress(language, topicId);
    const mastery = this.calculateMastery(tp);

    if (mastery >= 75) return 'hard';
    if (mastery >= 40) return 'medium';
    return 'easy';
  },

  // Update topic status based on progress
  updateTopicStatuses(language) {
    if (!window.COURSES || !COURSES[language]) return;

    const course   = COURSES[language];
    const progress = Storage.getProgress()[language] || {};

    for (let i = 0; i < course.topics.length; i++) {
      const topic = course.topics[i];
      const tp    = progress[topic.id] || {};

      // First topic always available
      if (i === 0) {
        if (!tp.status || tp.status === 'locked') {
          Storage.updateTopicProgress(language, topic.id, { status: 'available' });
        }
        continue;
      }

      // Check prerequisites
      const prereqs = topic.prerequisites || [];
      const allPrereqsDone = prereqs.every(prereqId => {
        const prereqProg = progress[prereqId] || {};
        return this.calculateMastery({ lessonsCompleted: prereqProg.lessonsCompleted || [], challengesCompleted: prereqProg.challengesCompleted || [], quizScores: prereqProg.quizScores || [], mistakeCount: prereqProg.mistakeCount || 0 }) >= 30;
      });

      if (allPrereqsDone && (!tp.status || tp.status === 'locked')) {
        Storage.updateTopicProgress(language, topic.id, { status: 'available' });
      }
    }
  },

  // Get weak topics for review suggestions
  getWeakTopics(language) {
    if (!window.COURSES || !COURSES[language]) return [];

    const course   = COURSES[language];
    const progress = Storage.getProgress()[language] || {};
    const weak     = [];

    for (const topic of course.topics) {
      const tp = progress[topic.id];
      if (!tp) continue;

      const mastery = this.calculateMastery(tp);
      if (tp.challengesCompleted?.length > 0 && mastery < 60) {
        weak.push({ topicId: topic.id, title: topic.title, mastery, emoji: topic.emoji });
      }
    }

    return weak.sort((a, b) => a.mastery - b.mastery);
  },

  // Get strong topics
  getStrongTopics(language) {
    if (!window.COURSES || !COURSES[language]) return [];

    const course   = COURSES[language];
    const progress = Storage.getProgress()[language] || {};
    const strong   = [];

    for (const topic of course.topics) {
      const tp = progress[topic.id];
      if (!tp) continue;

      const mastery = this.calculateMastery(tp);
      if (mastery >= 75) {
        strong.push({ topicId: topic.id, title: topic.title, mastery, emoji: topic.emoji });
      }
    }

    return strong.sort((a, b) => b.mastery - a.mastery);
  },

  // Overall course progress %
  getCourseProgress(language) {
    if (!window.COURSES || !COURSES[language]) return 0;

    const course   = COURSES[language];
    const progress = Storage.getProgress()[language] || {};
    let total = 0, completed = 0;

    for (const topic of course.topics) {
      total++;
      const tp = progress[topic.id] || {};
      if (this.calculateMastery(tp) >= 50) completed++;
    }

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  },
};
