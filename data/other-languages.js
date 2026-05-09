/* ============================================
   CODEQUEST - OTHER LANGUAGES
   C, C++, Java, HTML/CSS, SQL
   ============================================ */

const C_COURSE = {
  id: 'c',
  name: 'C',
  emoji: '⚡',
  color: '#a8b9cc',
  colorDark: '#7a8a9a',
  description: 'The foundational systems language. Learn how computers really work.',
  topics: [
    {
      id: 'c-basics',
      title: 'C Fundamentals',
      emoji: '⚡',
      description: 'Variables, types, and the main function.',
      difficulty: 'beginner',
      xpReward: 120,
      estimatedMinutes: 30,
      prerequisites: [],
      lessons: [
        {
          id: 'c-intro',
          title: 'Your First C Program',
          content: [
            {
              type: 'explanation',
              title: 'C: The Language Everything is Built On',
              text: 'C is one of the oldest and most influential programming languages. Operating systems, databases, and game engines are often written in C. Learning C teaches you how computers actually work.',
            },
            {
              type: 'code',
              lang: 'c',
              label: 'Hello World in C',
              code: `#include <stdio.h>   // include standard I/O library

int main() {          // main function — entry point
    printf("Hello, World!\\n");  // print to console
    return 0;         // 0 = success
}`,
            },
            {
              type: 'code',
              lang: 'c',
              label: 'Variables in C',
              code: `int age = 25;           // integer
float height = 1.75f;   // decimal (float)
double pi = 3.14159;    // high precision decimal
char letter = 'A';      // single character
char name[] = "Alice";  // string (array of chars)

// C requires explicit types!
// Variables must be declared before use`,
            },
            {
              type: 'quiz',
              question: 'What does `int main()` mean in C?',
              options: ['It\'s optional boilerplate', 'The main function returns an integer', 'It initializes memory', 'It imports libraries'],
              correct: 1,
              explanation: '`int main()` declares the main function that returns an integer (int). C programs start executing from main(). Returning 0 signals success to the operating system.',
            },
          ],
        },
      ],
      challenges: [
        {
          id: 'c-ch-1',
          title: 'Variable Types',
          type: 'multiple_choice',
          difficulty: 'easy',
          xpReward: 30,
          instructions: 'Which C data type is used for a single character?',
          options: ['string', 'char', 'character', 'letter'],
          correctIndex: 1,
          explanation: 'In C, a single character is stored in a `char` (1 byte). For strings, you use a char array: char name[] = "Alice"; There is no built-in string type in C.',
        },
      ],
    },
    {
      id: 'c-pointers',
      title: 'Pointers',
      emoji: '👉',
      description: 'Understand memory addresses — the heart of C.',
      difficulty: 'intermediate',
      xpReward: 200,
      estimatedMinutes: 50,
      prerequisites: ['c-basics'],
      lessons: [],
      challenges: [
        {
          id: 'c-ch-ptr-1',
          title: 'Pointer Basics',
          type: 'multiple_choice',
          difficulty: 'medium',
          xpReward: 60,
          instructions: 'What does the & operator do in C?',
          options: ['Logical AND', 'Gets the memory address of a variable', 'Multiplies', 'Declares a pointer'],
          correctIndex: 1,
          explanation: '& is the "address-of" operator. `int x = 5; int* ptr = &x;` — ptr now holds the memory address where x is stored. Pointers are variables that store addresses.',
        },
      ],
    },
  ],
};

const CPP_COURSE = {
  id: 'cpp',
  name: 'C++',
  emoji: '🔵',
  color: '#00599c',
  colorDark: '#004a7f',
  description: 'C with superpowers. Classes, OOP, and high-performance applications.',
  topics: [
    {
      id: 'cpp-basics',
      title: 'C++ Basics',
      emoji: '🔵',
      description: 'C++ syntax, cout, and basic I/O.',
      difficulty: 'beginner',
      xpReward: 120,
      estimatedMinutes: 30,
      prerequisites: [],
      lessons: [
        {
          id: 'cpp-intro',
          title: 'Hello C++',
          content: [
            {
              type: 'code',
              lang: 'cpp',
              label: 'Hello World in C++',
              code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Variables
    int age = 25;
    string name = "Alice";  // C++ has std::string
    double pi = 3.14159;
    
    cout << "Name: " << name << ", Age: " << age << endl;
    return 0;
}`,
            },
            {
              type: 'quiz',
              question: 'What is `cout` in C++?',
              options: ['A function to count', 'Console output stream', 'A variable type', 'A loop'],
              correct: 1,
              explanation: '`cout` is the console output stream. `cout << "text"` writes to the console. The `<<` operator is the "stream insertion" operator.',
            },
          ],
        },
      ],
      challenges: [
        {
          id: 'cpp-ch-1',
          title: 'Class Basics',
          type: 'multiple_choice',
          difficulty: 'medium',
          xpReward: 50,
          instructions: 'What is the difference between a struct and a class in C++?',
          options: [
            'No difference',
            'Class members are private by default; struct members are public',
            'Struct can\'t have methods',
            'Class is faster',
          ],
          correctIndex: 1,
          explanation: 'In C++, the only technical difference is default access: class members are private by default, struct members are public. By convention, classes are used for complex objects with behavior, structs for simple data.',
        },
      ],
    },
    {
      id: 'cpp-oop',
      title: 'OOP Concepts',
      emoji: '🏗️',
      description: 'Classes, inheritance, and polymorphism.',
      difficulty: 'intermediate',
      xpReward: 220,
      estimatedMinutes: 60,
      prerequisites: ['cpp-basics'],
      lessons: [],
      challenges: [],
    },
  ],
};

const JAVA_COURSE = {
  id: 'java',
  name: 'Java',
  emoji: '☕',
  color: '#ed8b00',
  colorDark: '#b86e00',
  description: 'Write once, run anywhere. Enterprise, Android, and beyond.',
  topics: [
    {
      id: 'java-basics',
      title: 'Java Fundamentals',
      emoji: '☕',
      description: 'Classes, main method, and Java syntax.',
      difficulty: 'beginner',
      xpReward: 130,
      estimatedMinutes: 35,
      prerequisites: [],
      lessons: [
        {
          id: 'java-intro',
          title: 'Java Basics',
          content: [
            {
              type: 'explanation',
              title: 'Everything is a Class',
              text: 'In Java, everything lives inside a class. Even the simplest program requires a class declaration. This enforces Object-Oriented Programming from day one.',
            },
            {
              type: 'code',
              lang: 'java',
              label: 'Hello Java',
              code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Variables
        int age = 25;
        String name = "Alice";  // Note: String with capital S
        double pi = 3.14;
        boolean isStudent = true;
        
        System.out.println("Name: " + name);
    }
}`,
            },
            {
              type: 'quiz',
              question: 'In Java, what does `static` mean in `public static void main`?',
              options: [
                'The method runs slowly',
                'The method belongs to the class, not an instance',
                'The method cannot change variables',
                'The method runs only once',
              ],
              correct: 1,
              explanation: '`static` means the method belongs to the class itself, not to objects created from the class. `main` must be static so the JVM can call it without creating an object first.',
            },
          ],
        },
      ],
      challenges: [
        {
          id: 'java-ch-1',
          title: 'Java Syntax',
          type: 'multiple_choice',
          difficulty: 'easy',
          xpReward: 30,
          instructions: 'How do you print in Java?',
          options: ['print("text")', 'echo "text"', 'System.out.println("text")', 'console.log("text")'],
          correctIndex: 2,
          explanation: 'Java uses `System.out.println()` for output. `System` is the class, `out` is the output stream, `println` prints with a newline. Unlike Python\'s `print()` or JavaScript\'s `console.log()`.',
        },
      ],
    },
  ],
};

const HTML_COURSE = {
  id: 'html',
  name: 'HTML & CSS',
  emoji: '🎨',
  color: '#e34f26',
  colorDark: '#c03e1e',
  description: 'Build beautiful websites. The foundation of every web page.',
  topics: [
    {
      id: 'html-basics',
      title: 'HTML Structure',
      emoji: '🏗️',
      description: 'Tags, elements, and HTML document structure.',
      difficulty: 'beginner',
      xpReward: 100,
      estimatedMinutes: 20,
      prerequisites: [],
      lessons: [
        {
          id: 'html-intro',
          title: 'HTML Elements & Tags',
          content: [
            {
              type: 'explanation',
              title: 'What is HTML?',
              text: 'HTML (HyperText Markup Language) is the skeleton of every web page. It uses "tags" to mark up content — telling the browser what each piece of content is.',
            },
            {
              type: 'code',
              lang: 'html',
              label: 'Basic HTML Document',
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a paragraph.</p>
  <a href="https://example.com">Click me</a>
  <img src="image.jpg" alt="Description">
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</body>
</html>`,
            },
            {
              type: 'quiz',
              question: 'What does the <title> tag do?',
              options: ['Shows text on the page', 'Sets the browser tab text', 'Makes text bold', 'Creates a heading'],
              correct: 1,
              explanation: 'The <title> tag in the <head> section sets the text shown in the browser tab/window title. It\'s also what shows up in search engine results.',
            },
          ],
        },
      ],
      challenges: [
        {
          id: 'html-ch-1',
          title: 'Tag Matching',
          type: 'multiple_choice',
          difficulty: 'easy',
          xpReward: 25,
          instructions: 'Which tag creates a hyperlink?',
          options: ['<link>', '<href>', '<a>', '<url>'],
          correctIndex: 2,
          explanation: 'The <a> (anchor) tag creates hyperlinks. The `href` attribute specifies the destination: <a href="https://google.com">Google</a>.',
        },
      ],
    },
    {
      id: 'css-basics',
      title: 'CSS Styling',
      emoji: '🎨',
      description: 'Colors, fonts, layouts, and visual design.',
      difficulty: 'beginner',
      xpReward: 120,
      estimatedMinutes: 30,
      prerequisites: ['html-basics'],
      lessons: [
        {
          id: 'css-intro',
          title: 'CSS Selectors & Properties',
          content: [
            {
              type: 'explanation',
              title: 'What is CSS?',
              text: 'CSS (Cascading Style Sheets) controls the visual appearance of HTML. While HTML is the structure, CSS is the design — colors, fonts, spacing, layout.',
            },
            {
              type: 'code',
              lang: 'css',
              label: 'CSS Basics',
              code: `/* Select elements and apply styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

h1 {
  color: #333;
  font-size: 2rem;
}

/* Class selector (.) */
.highlight {
  background: yellow;
  padding: 4px 8px;
}

/* ID selector (#) */
#main-title {
  text-align: center;
  font-weight: bold;
}`,
            },
          ],
        },
      ],
      challenges: [],
    },
  ],
};

const SQL_COURSE = {
  id: 'sql',
  name: 'SQL',
  emoji: '🗃️',
  color: '#336791',
  colorDark: '#275478',
  description: 'Query databases to find, filter, and analyze data.',
  topics: [
    {
      id: 'sql-basics',
      title: 'SQL Fundamentals',
      emoji: '🗃️',
      description: 'SELECT, WHERE, ORDER BY, and basic queries.',
      difficulty: 'beginner',
      xpReward: 120,
      estimatedMinutes: 30,
      prerequisites: [],
      lessons: [
        {
          id: 'sql-select',
          title: 'SELECT Queries',
          content: [
            {
              type: 'explanation',
              title: 'What is SQL?',
              text: 'SQL (Structured Query Language) lets you talk to databases. You write queries to SELECT (get), INSERT (add), UPDATE (change), or DELETE data.',
            },
            {
              type: 'code',
              lang: 'sql',
              label: 'Basic SELECT',
              code: `-- Get all columns from users table
SELECT * FROM users;

-- Get specific columns
SELECT name, email, age FROM users;

-- Filter with WHERE
SELECT * FROM users WHERE age > 18;

-- Multiple conditions
SELECT * FROM users 
WHERE age > 18 AND city = 'Paris';

-- Sort results
SELECT name, age FROM users 
ORDER BY age DESC;

-- Limit results
SELECT * FROM users LIMIT 10;`,
            },
            {
              type: 'quiz',
              question: 'Which SQL keyword filters rows based on a condition?',
              options: ['FILTER', 'WHERE', 'IF', 'HAVING'],
              correct: 1,
              explanation: 'WHERE filters rows before grouping. HAVING filters after grouping (used with GROUP BY). For basic row filtering, use WHERE.',
            },
          ],
        },
      ],
      challenges: [
        {
          id: 'sql-ch-1',
          title: 'Write a Query',
          type: 'multiple_choice',
          difficulty: 'easy',
          xpReward: 35,
          instructions: 'Which query gets all users older than 25, sorted by name?',
          options: [
            'SELECT * FROM users FILTER age > 25 SORT name',
            'SELECT * FROM users WHERE age > 25 ORDER BY name',
            'GET * FROM users IF age > 25 BY name',
            'FIND * IN users WHERE age > 25 ORDER name',
          ],
          correctIndex: 1,
          explanation: 'Correct SQL: SELECT (what) FROM (where) WHERE (filter) ORDER BY (sort). SQL is very readable — almost like English!',
        },
      ],
    },
    {
      id: 'sql-joins',
      title: 'JOINs',
      emoji: '🔗',
      description: 'Combine data from multiple tables.',
      difficulty: 'intermediate',
      xpReward: 200,
      estimatedMinutes: 45,
      prerequisites: ['sql-basics'],
      lessons: [],
      challenges: [
        {
          id: 'sql-ch-join-1',
          title: 'Join Types',
          type: 'multiple_choice',
          difficulty: 'medium',
          xpReward: 55,
          instructions: 'What does an INNER JOIN return?',
          options: [
            'All rows from both tables',
            'Only rows where the join condition matches in BOTH tables',
            'Only rows from the left table',
            'Only rows from the right table',
          ],
          correctIndex: 1,
          explanation: 'INNER JOIN returns only rows where there\'s a match in BOTH tables. LEFT JOIN returns all left rows + matching right rows. RIGHT JOIN is the reverse. FULL JOIN returns everything.',
        },
      ],
    },
  ],
};

// All courses registry
const COURSES = {
  javascript: JS_COURSE,
  python: PYTHON_COURSE,
  c: C_COURSE,
  cpp: CPP_COURSE,
  java: JAVA_COURSE,
  html: HTML_COURSE,
  sql: SQL_COURSE,
};

if (typeof module !== 'undefined') {
  module.exports = { C_COURSE, CPP_COURSE, JAVA_COURSE, HTML_COURSE, SQL_COURSE, COURSES };
}
