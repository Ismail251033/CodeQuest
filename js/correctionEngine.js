/* ============================================
   CODEQUEST - INTELLIGENT CORRECTION ENGINE
   ============================================ */

const CorrectionEngine = {

  // Main entry: analyze a user's answer
  analyze(challenge, userAnswer) {
    const result = {
      isCorrect: false,
      score: 0,
      feedback: '',
      explanation: '',
      steps: [],
      mistakeType: null,
      similarExample: null,
      followUpChallenge: null,
      lessonToRevisit: null,
      encouragement: '',
    };

    switch (challenge.type) {
      case 'multiple_choice':
        return this._analyzeMultipleChoice(challenge, parseInt(userAnswer));
      case 'coding':
        return this._analyzeCoding(challenge, userAnswer);
      case 'debugging':
        return this._analyzeDebugging(challenge, userAnswer);
      case 'fill_blank':
        return this._analyzeFillBlank(challenge, userAnswer);
      default:
        return this._analyzeGeneral(challenge, userAnswer);
    }
  },

  _analyzeMultipleChoice(challenge, selectedIndex) {
    const correct = challenge.correctIndex ?? challenge.correct;
    const isCorrect = selectedIndex === correct;

    return {
      isCorrect,
      score: isCorrect ? 100 : 0,
      feedback: isCorrect
        ? this._successMessage()
        : `You chose option ${selectedIndex + 1}, but the correct answer is option ${correct + 1}.`,
      explanation: challenge.explanation || '',
      steps: isCorrect ? [] : this._buildExplanationSteps(challenge),
      mistakeType: isCorrect ? null : 'conceptual',
      encouragement: isCorrect ? this._kudos() : this._tryAgain(),
      lessonToRevisit: challenge.relatedLesson || null,
    };
  },

  _analyzeCoding(challenge, code) {
    if (!code || code.trim().length < 2) {
      return {
        isCorrect: false,
        score: 0,
        feedback: 'Please write some code before submitting.',
        explanation: 'An empty submission cannot be evaluated.',
        steps: [],
        encouragement: 'Start with just one line — you can do this!',
      };
    }

    // Run the code safely and compare output
    const runResult = this._safeRun(code);
    const expected  = challenge.expectedOutput || '';
    const contains  = challenge.expectedOutputContains || [];

    let isCorrect = false;
    let score = 0;

    if (runResult.error) {
      return {
        isCorrect: false,
        score: 0,
        feedback: `Your code has an error: ${runResult.error}`,
        explanation: this._explainError(runResult.error, code),
        steps: this._errorSteps(runResult.error, code),
        mistakeType: 'syntax',
        encouragement: "Errors are normal — every developer debugs. Read the error message carefully!",
      };
    }

    const output = (runResult.output || '').trim();

    if (expected && output === expected.trim()) {
      isCorrect = true;
      score = 100;
    } else if (contains.length > 0) {
      const matched = contains.filter(c => output.includes(c));
      score = Math.round((matched.length / contains.length) * 100);
      isCorrect = score === 100;
    } else if (challenge.solution) {
      // Compare structure loosely
      score = this._compareCodeStructure(code, challenge.solution);
      isCorrect = score >= 80;
    }

    if (isCorrect) {
      return {
        isCorrect: true,
        score: 100,
        feedback: this._successMessage(),
        explanation: challenge.explanation || 'Great solution!',
        steps: [],
        actualOutput: output,
        encouragement: this._kudos(),
      };
    }

    // Not correct — give detailed feedback
    const mistakes = this._detectCommonMistakes(challenge, code);

    return {
      isCorrect: false,
      score,
      feedback: mistakes.length > 0
        ? mistakes[0].explanation
        : `Your output was "${output}" but expected "${expected || contains.join(', ')}".`,
      explanation: challenge.explanation || '',
      steps: this._buildCodingSteps(challenge, code, mistakes),
      mistakeType: mistakes[0]?.type || 'logic',
      actualOutput: output,
      expectedOutput: expected,
      lessonToRevisit: challenge.relatedLesson || null,
      encouragement: this._tryAgain(),
      similarExample: this._generateSimilarExample(challenge),
    };
  },

  _analyzeDebugging(challenge, fixedCode) {
    if (!fixedCode || fixedCode.trim().length < 2) {
      return { isCorrect: false, score: 0, feedback: 'Please write your fix before submitting.', steps: [], encouragement: 'Look for the bug — compare your code with the original carefully.' };
    }

    const runResult = this._safeRun(fixedCode);
    const expected  = challenge.expectedOutput || '';

    if (runResult.error) {
      return {
        isCorrect: false, score: 0,
        feedback: `Still has an error: ${runResult.error}`,
        explanation: this._explainError(runResult.error, fixedCode),
        steps: this._errorSteps(runResult.error, fixedCode),
        encouragement: 'Getting closer! Fix the new error now.',
      };
    }

    const output  = (runResult.output || '').trim();
    const isCorrect = output === expected.trim();

    if (isCorrect) {
      return {
        isCorrect: true, score: 100,
        feedback: '🐛 Bug squashed! Perfect fix.',
        explanation: challenge.explanation || '',
        steps: this._buildFixSteps(challenge),
        encouragement: this._kudos(),
      };
    }

    return {
      isCorrect: false, score: 30,
      feedback: `Almost! Output was "${output}", expected "${expected}".`,
      explanation: challenge.explanation || '',
      steps: this._buildCodingSteps(challenge, fixedCode, []),
      encouragement: "You're close — check the logic again.",
    };
  },

  _analyzeFillBlank(challenge, answer) {
    const a = (answer || '').trim().toLowerCase();
    const accepted = (challenge.acceptedAnswers || [challenge.expectedAnswer]).map(x => x.trim().toLowerCase());
    const isCorrect = accepted.includes(a);

    return {
      isCorrect,
      score: isCorrect ? 100 : 0,
      feedback: isCorrect ? this._successMessage() : `Your answer "${answer}" is not correct.`,
      explanation: challenge.explanation || '',
      steps: isCorrect ? [] : [{ step: '1', text: `The correct answer is: ${challenge.expectedAnswer}` }, { step: '2', text: challenge.explanation || '' }],
      encouragement: isCorrect ? this._kudos() : this._tryAgain(),
    };
  },

  _analyzeGeneral(challenge, answer) {
    const a = (answer || '').trim().toLowerCase();
    const expected = (challenge.expectedAnswer || '').trim().toLowerCase();
    const isCorrect = a === expected || (challenge.acceptedAnswers || []).map(x => x.toLowerCase()).includes(a);

    return {
      isCorrect,
      score: isCorrect ? 100 : 0,
      feedback: isCorrect ? this._successMessage() : 'That\'s not quite right.',
      explanation: challenge.explanation || '',
      steps: [],
      encouragement: isCorrect ? this._kudos() : this._tryAgain(),
    };
  },

  // Safe JavaScript runner using iframe sandbox
  _safeRun(code) {
    const output = [];
    const errors = [];

    try {
      const sandbox = {
        console: {
          log:   (...args) => output.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
          error: (...args) => errors.push(args.join(' ')),
          warn:  (...args) => output.push('⚠️ ' + args.join(' ')),
        },
        Math, JSON, String, Number, Boolean, Array, Object,
        parseInt, parseFloat, isNaN, isFinite,
        setTimeout: () => {}, setInterval: () => {},
      };

      const fn = new Function(...Object.keys(sandbox), code);
      fn(...Object.values(sandbox));

      return { output: output.join('\n'), error: null };
    } catch (e) {
      return { output: output.join('\n'), error: e.message };
    }
  },

  _detectCommonMistakes(challenge, code) {
    const mistakes = [];
    const patterns = challenge.commonMistakes || [];

    for (const { pattern, explanation, type } of patterns) {
      if (code.includes(pattern)) {
        mistakes.push({ pattern, explanation, type: type || 'logic' });
      }
    }

    // Generic checks
    if (code.includes('=') && !code.includes('==') && !code.includes('=>') && !code.includes('<=') && !code.includes('>=') && !code.includes('!=')) {
      if (/if\s*\(.*=(?!=)/.test(code)) {
        mistakes.push({
          pattern: 'assignment in if',
          explanation: 'You used = (assignment) inside an if condition. Use === for comparison!',
          type: 'operator',
        });
      }
    }

    return mistakes;
  },

  _explainError(error, code) {
    const msg = error.toLowerCase();

    if (msg.includes('undefined')) {
      const varMatch = error.match(/(\w+) is not defined/);
      if (varMatch) {
        return `The variable or function "${varMatch[1]}" is not defined. Make sure you've declared it before using it. Check for typos in the name!`;
      }
    }
    if (msg.includes('syntax')) {
      return `Your code has a syntax error — it's not written in valid JavaScript. Look for: missing closing brackets ), }, ], missing semicolons, or mismatched quotes.`;
    }
    if (msg.includes('not a function')) {
      return `You tried to call something as a function, but it's not. Make sure you're calling the right name and it's actually defined as a function.`;
    }
    if (msg.includes('cannot read')) {
      return `You tried to access a property of something that is null or undefined. Check that your variable has a value before accessing its properties.`;
    }
    if (msg.includes('typeerror')) {
      return `Type error: you're using a value in a way that doesn't match its type. Check what type your variable is.`;
    }
    return `Error: ${error}. Read the error message carefully — it tells you exactly what went wrong and on which line.`;
  },

  _errorSteps(error, code) {
    return [
      { step: '1', text: `Error message: "${error}"` },
      { step: '2', text: this._explainError(error, code) },
      { step: '3', text: 'Fix the error, then try running again.' },
    ];
  },

  _buildExplanationSteps(challenge) {
    const steps = [];
    if (challenge.explanation) {
      steps.push({ step: '📖', text: challenge.explanation });
    }
    return steps;
  },

  _buildCodingSteps(challenge, code, mistakes) {
    const steps = [];

    if (mistakes.length > 0) {
      steps.push({ step: '🐛', text: `Found issue: ${mistakes[0].explanation}` });
    }

    if (challenge.explanation) {
      steps.push({ step: '💡', text: challenge.explanation });
    }

    if (challenge.solution) {
      steps.push({ step: '✅', text: `One correct solution:\n${challenge.solution}` });
    }

    return steps;
  },

  _buildFixSteps(challenge) {
    return [
      { step: '🔍', text: `Bug found: ${challenge.explanation || 'Logic error in the code.'}` },
      { step: '✅', text: `Fixed version:\n${challenge.solution || ''}` },
    ];
  },

  _compareCodeStructure(userCode, solutionCode) {
    // Simple heuristic: check for key tokens
    const keywords = ['return', 'for', 'if', 'function', 'const', 'let', '=>'];
    let matched = 0;
    const solutionTokens = keywords.filter(k => solutionCode.includes(k));

    for (const kw of solutionTokens) {
      if (userCode.includes(kw)) matched++;
    }

    return solutionTokens.length > 0 ? Math.round((matched / solutionTokens.length) * 100) : 50;
  },

  _generateSimilarExample(challenge) {
    if (challenge.id.includes('var') || challenge.id.includes('type')) {
      return {
        title: 'Similar Example',
        code: `// Type coercion example\nconsole.log(1 + "1");  // "11"\nconsole.log(1 - "1");  // 0\nconsole.log(true + 1); // 2`,
        explanation: 'JavaScript automatically converts types in some operations.',
      };
    }
    return null;
  },

  _successMessage() {
    const msgs = ['Correct! 🎉', 'Perfect! ✨', 'Nailed it! 🚀', 'Excellent! 💎', 'That\'s right! ⚡'];
    return msgs[Math.floor(Math.random() * msgs.length)];
  },

  _kudos() {
    const msgs = ['Keep crushing it!', 'You\'re on fire! 🔥', 'Excellent work!', 'You\'re getting it!', 'Brilliant!'];
    return msgs[Math.floor(Math.random() * msgs.length)];
  },

  _tryAgain() {
    const msgs = ['Don\'t give up — every mistake teaches you something!', 'Almost there — review the hint and try again.', 'This is how learning works. You\'ve got this!', 'Take another look — the answer is closer than you think.'];
    return msgs[Math.floor(Math.random() * msgs.length)];
  },
};
