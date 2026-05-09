/* ============================================
   CODEQUEST - PYTHON COURSE DATA
   ============================================ */

const PYTHON_COURSE = {
  id: 'python',
  name: 'Python',
  emoji: '🐍',
  color: '#3776ab',
  colorDark: '#2a5f8f',
  description: 'Simple, powerful, and loved by beginners. Perfect for data science, AI, and scripting.',

  topics: [
    {
      id: 'py-variables',
      title: 'Variables & Types',
      emoji: '📦',
      description: 'Python\'s clean syntax for variables and data types.',
      difficulty: 'beginner',
      xpReward: 100,
      estimatedMinutes: 20,
      prerequisites: [],
      lessons: [
        {
          id: 'py-var-intro',
          title: 'Python Variables',
          content: [
            {
              type: 'explanation',
              title: 'Python Variables',
              text: 'Python variables are even simpler than most languages — no keyword needed! Just write a name, equals sign, and a value. Python figures out the type automatically.',
            },
            {
              type: 'code',
              lang: 'python',
              label: 'Python Variables',
              code: `# No keyword needed — just assign!
name = "Alice"
age = 25
height = 1.75
is_student = True   # Note: True/False capitalized in Python
nothing = None      # Python's null

print(name)         # → Alice
print(type(age))    # → <class 'int'>
print(type(height)) # → <class 'float'>`,
            },
            {
              type: 'tip',
              text: '💡 Python uses snake_case: player_score, first_name (not camelCase like JavaScript)',
            },
            {
              type: 'code',
              lang: 'python',
              label: 'Python Type Conversion',
              code: `# Convert between types
x = "42"        # string
y = int(x)      # → 42 (integer)
z = float(x)    # → 42.0 (float)
s = str(100)    # → "100" (string)

# f-strings — the modern way to format strings
name = "Alice"
age = 25
print(f"Hello, {name}! You are {age} years old.")
# → Hello, Alice! You are 25 years old.`,
            },
            {
              type: 'quiz',
              question: 'What is the Python syntax for True/False?',
              options: ['true/false', 'TRUE/FALSE', 'True/False', '1/0'],
              correct: 2,
              explanation: 'In Python, booleans are capitalized: True and False (unlike JavaScript where they are lowercase). This is a common source of confusion when switching between languages.',
            },
          ],
        },
      ],
      challenges: [
        {
          id: 'py-ch-var-1',
          title: 'Python Profile',
          type: 'coding',
          difficulty: 'easy',
          xpReward: 35,
          instructions: 'Create variables for a player profile and print them using an f-string.',
          solution: `player_name = "Alex"
player_score = 150
is_active = True

print(f"Player: {player_name}, Score: {player_score}, Active: {is_active}")`,
          hints: ['Python uses snake_case', 'Use f"..." for string formatting', 'Boolean is True (capital T)'],
          explanation: 'Python\'s clean syntax and f-strings make it very readable. f-strings (f"...") let you embed variables directly in strings.',
        },
      ],
    },

    {
      id: 'py-conditions',
      title: 'Conditions',
      emoji: '🔀',
      description: 'Python\'s if/elif/else with indentation-based blocks.',
      difficulty: 'beginner',
      xpReward: 120,
      estimatedMinutes: 25,
      prerequisites: ['py-variables'],
      lessons: [
        {
          id: 'py-if-else',
          title: 'If / Elif / Else',
          content: [
            {
              type: 'explanation',
              title: 'Python Conditions',
              text: 'Python uses indentation (spaces) instead of curly braces to define code blocks. This forces clean, readable code.',
            },
            {
              type: 'code',
              lang: 'python',
              label: 'If/Elif/Else',
              code: `temperature = 28

if temperature > 35:
    print("Very hot! 🔥")
elif temperature > 25:
    print("Warm and sunny ☀️")
elif temperature > 15:
    print("Nice weather 🌤️")
else:
    print("Cold! 🥶")

# → Warm and sunny ☀️

# Comparison operators work the same
# > < >= <= == !=
# Also: 'and', 'or', 'not' (not && || !)
score = 85
if score >= 80 and score < 90:
    print("Grade B")`,
            },
            {
              type: 'warning',
              text: '⚠️ Python is WHITESPACE-SENSITIVE. Indentation defines code blocks. Use 4 spaces (standard). Missing or wrong indentation causes IndentationError!',
            },
            {
              type: 'quiz',
              question: 'What keyword does Python use instead of "else if"?',
              options: ['elsif', 'else if', 'elif', 'elseif'],
              correct: 2,
              explanation: 'Python uses `elif` (short for "else if"). It\'s cleaner and less verbose than other languages.',
            },
          ],
        },
      ],
      challenges: [
        {
          id: 'py-ch-cond-1',
          title: 'Grade Checker',
          type: 'coding',
          difficulty: 'easy',
          xpReward: 40,
          instructions: 'Write a function get_grade(score) that returns a letter grade (A/B/C/D/F).',
          solution: `def get_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

print(get_grade(92))  # → A
print(get_grade(75))  # → C`,
          hints: ['Use def to define a function', 'Use elif for multiple conditions', 'Remember indentation!'],
          explanation: 'Python functions are defined with `def`. The colon and indentation define the function body.',
        },
      ],
    },

    {
      id: 'py-loops',
      title: 'Loops',
      emoji: '🔄',
      description: 'Python\'s elegant for loops and while loops.',
      difficulty: 'beginner',
      xpReward: 140,
      estimatedMinutes: 30,
      prerequisites: ['py-conditions'],
      lessons: [
        {
          id: 'py-for-loop',
          title: 'For Loops & Range',
          content: [
            {
              type: 'explanation',
              title: 'Python For Loops',
              text: 'Python\'s for loop is more elegant than most languages. It directly iterates over items, not indices. Combined with range(), it\'s very powerful.',
            },
            {
              type: 'code',
              lang: 'python',
              label: 'Python For Loops',
              code: `# Iterate over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Use range() for number sequences
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 11):    # 1 to 10
    print(i)

for i in range(0, 20, 2): # 0, 2, 4, ... 18
    print(i)

# Enumerate — get index AND value
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")`,
            },
          ],
        },
      ],
      challenges: [
        {
          id: 'py-ch-loop-1',
          title: 'List Squares',
          type: 'coding',
          difficulty: 'easy',
          xpReward: 40,
          instructions: 'Create a list of squares of numbers 1-10 using a list comprehension.',
          solution: `squares = [x**2 for x in range(1, 11)]
print(squares)
# → [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]`,
          hints: ['Python has list comprehensions: [expr for x in range(...)]', 'Use ** for exponentiation', 'range(1, 11) gives 1 to 10'],
          explanation: 'List comprehensions are a Python superpower: [x**2 for x in range(1, 11)] creates a list in one clean line.',
        },
      ],
    },

    {
      id: 'py-functions',
      title: 'Functions',
      emoji: '⚙️',
      description: 'Python functions with defaults, *args, and lambdas.',
      difficulty: 'beginner',
      xpReward: 160,
      estimatedMinutes: 35,
      prerequisites: ['py-loops'],
      lessons: [],
      challenges: [
        {
          id: 'py-ch-func-1',
          title: 'Default Parameters',
          type: 'coding',
          difficulty: 'medium',
          xpReward: 55,
          instructions: 'Write a greet(name, greeting="Hello") function that uses a default greeting.',
          solution: `def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))          # → Hello, Alice!
print(greet("Bob", "Bonjour")) # → Bonjour, Bob!`,
          hints: ['Default parameters go in the function signature', 'Syntax: def func(param=default)', 'Call without the default arg to use the default'],
          explanation: 'Python supports default parameter values, making functions more flexible. Parameters with defaults must come after parameters without defaults.',
        },
      ],
    },

    {
      id: 'py-lists',
      title: 'Lists & Dicts',
      emoji: '📋',
      description: 'Python\'s powerful list and dictionary data structures.',
      difficulty: 'intermediate',
      xpReward: 180,
      estimatedMinutes: 40,
      prerequisites: ['py-functions'],
      lessons: [],
      challenges: [
        {
          id: 'py-ch-list-1',
          title: 'Word Counter',
          type: 'coding',
          difficulty: 'medium',
          xpReward: 70,
          instructions: 'Write a function word_count(text) that returns a dictionary with each word\'s frequency.',
          solution: `def word_count(text):
    words = text.lower().split()
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts

result = word_count("hello world hello python world")
print(result)  # → {'hello': 2, 'world': 2, 'python': 1}`,
          hints: ['Use .split() to get a list of words', 'Use a dict: {word: count}', 'dict.get(key, default) avoids KeyError'],
          explanation: 'Dictionaries are perfect for counting. dict.get(key, 0) returns 0 if the key doesn\'t exist yet, making counting clean.',
        },
      ],
    },
  ],
};

if (typeof module !== 'undefined') module.exports = { PYTHON_COURSE };
