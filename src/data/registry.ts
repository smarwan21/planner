import { Problem } from "../types/problem";

export const problems: Problem[] = [
  {
    id: "number-guessing-game",
    title: "Number Guessing Game",
    difficulty: "easy",
    category: "Conditionals",
    description:
      "Implement a number guessing game with range input, hints, and limited attempts.",
    markdown: `Build a number guessing game where the player defines a range and tries to guess the secret number within 4 attempts.

**How the Game Works:**

At the start of the game, the program prompts the user to define the range of numbers (for example, 1 - 50). The computer randomly selects a secret integer within that user-specified range. The user will start to guess. After each incorrect guess, the computer will tell the player if their guess was too high or too low to help them narrow it down. The user has exactly 4 guesses to find the secret number.

The user *wins* when they guess the correct number within 4 attempts. When they win, the computer will display:

\`You got it! The secret number was [input number].\`

The user *loses* if they have more than 4 attempts with incorrect guesses, and then the computer reveals the correct answer. When they lose, the computer will display:

\`Game Over! You ran out of guesses. The secret number was [input number].\`

**Winning Scenario:**

\`\`\`
Enter the minimum number: 1
Enter the maximum number: 20
I'm thinking of a number between 1 and 20. You have 4 guesses!

Guess #1: 10
Too low! Try again.

Guess #2: 15
Too high! Try again.

Guess #3: 13
You got it! The secret number was 13.
\`\`\`

**Losing Scenario:**

\`\`\`
Enter the minimum number: 10
Enter the maximum number: 100
I'm thinking of a number between 10 and 100. You have 4 guesses!

Guess #1: 50
Too high! Try again.

Guess #2: 25
Too low! Try again.

Guess #3: 35
Too low! Try again.

Guess #4: 40
Too low! Try again.

Game Over! You ran out of guesses. The secret number was 44.
\`\`\`

**Starter Code:**

\`\`\`python
import random

def play_guessing_game():
  """Run the number guessing game."""
  pass
\`\`\`

**Hints:**
- Use \`random.randint(minimum, maximum)\` to generate the secret number
- Use a loop with a counter to track the 4 attempts
- After each guess, compare with the secret and print "Too high!" or "Too low!"
- Use an if/else to determine win or lose after the loop ends`,
  },
  {
    id: "circlearea",
    title: "Circle Area",
    difficulty: "easy",
    category: "Math",
    description: "Calculate the area of a circle given its radius.",
    markdown: `Write a program that calculates the area of a circle given its radius.

**Formula:** area = pi * radius^2

**Examples:**

| Input | Output |
|-------|--------|
| radius = 5 | 78.54 |
| radius = 0 | 0.0 |

**Starter Code:**

\`\`\`python
def circle_area(radius: float) -> float:
    """Return the area of a circle given its radius."""
    pass
\`\`\`

**Hints:**
- Use \`math.pi\` for the value of pi
- Use \`round()\` to format the result to 2 decimal places`,
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    difficulty: "easy",
    category: "Conditionals",
    description: "Print numbers 1 to n with Fizz/Buzz replacements.",
    markdown: `Write a program that prints numbers from 1 to **n**. For multiples of 3, print "Fizz" instead of the number. For multiples of 5, print "Buzz". For numbers that are multiples of both 3 and 5, print "FizzBuzz".

**Examples:**

\`\`\`
n = 15

Output:
1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz
\`\`\`

**Starter Code:**

\`\`\`python
def fizzbuzz(n: int) -> None:
    """Print FizzBuzz sequence up to n."""
    pass
\`\`\`

**Hints:**
- Use the modulo operator (\`%\`) to check divisibility
- Check for "both 3 and 5" before checking individually`,
  },
  {
    id: "palindrome",
    title: "Palindrome Checker",
    difficulty: "easy",
    category: "Strings",
    description:
      "Determine if a string is a palindrome, ignoring case and non-alphanumeric characters.",
    markdown: `Given a string **s**, determine if it is a palindrome. A palindrome reads the same forwards and backwards.

**Rules:**
- Ignore case (treat 'A' and 'a' as the same)
- Ignore spaces and non-alphanumeric characters
- Return \`True\` if it is a palindrome, \`False\` otherwise

**Examples:**

| Input | Output |
|-------|--------|
| "A man, a plan, a canal: Panama" | True |
| "race a car" | False |
| "" | True |

**Starter Code:**

\`\`\`python
def is_palindrome(s: str) -> bool:
    """Return True if s is a palindrome."""
    pass
\`\`\`

**Hints:**
- Use \`str.isalnum()\` to filter non-alphanumeric characters
- Convert to lowercase with \`.lower()\`
- Compare the string to its reverse (\`s[::-1]\`)`,
  },
  {
    id: "fibonacci",
    title: "Nth Fibonacci",
    difficulty: "easy",
    category: "Recursion",
    description: "Compute the nth Fibonacci number.",
    markdown: `Compute the **nth** Fibonacci number. The Fibonacci sequence starts with F(0) = 0 and F(1) = 1, and each subsequent term is the sum of the previous two.

**Sequence:** 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

**Examples:**

| Input | Output |
|-------|--------|
| n = 0 | 0 |
| n = 1 | 1 |
| n = 10 | 55 |

**Starter Code:**

\`\`\`python
def fibonacci(n: int) -> int:
    """Return the nth Fibonacci number."""
    pass
\`\`\`

**Hints:**
- Handle the base cases F(0) and F(1) first
- Consider an iterative approach using a loop
- For a recursive solution, be aware of repeated work`,
  },
  {
    id: "anagram",
    title: "Anagram Detector",
    difficulty: "medium",
    category: "Strings",
    description: "Check if two strings are anagrams of each other.",
    markdown: `Given two strings **s** and **t**, determine if they are anagrams. Two strings are anagrams if they contain the same characters with the same frequencies. Ignore case and spaces.

**Examples:**

| Input | Output |
|-------|--------|
| s = "listen", t = "silent" | True |
| s = "hello", t = "world" | False |
| s = "Tom Marvolo Riddle", t = "I am Lord Voldemort" | True |

**Starter Code:**

\`\`\`python
def is_anagram(s: str, t: str) -> bool:
    """Return True if s and t are anagrams."""
    pass
\`\`\`

**Hints:**
- Strip spaces and convert both strings to lowercase before comparing
- Compare sorted versions of the strings, or use a character frequency counter
- Python's \`collections.Counter\` is perfect for this`,
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray Sum",
    difficulty: "medium",
    category: "Arrays",
    description: "Find the contiguous subarray with the largest sum.",
    markdown: `Given an integer array **nums**, find the contiguous subarray (containing at least one number) with the largest sum and return its sum.

**Examples:**

\`\`\`
Input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6

Explanation: The subarray [4, -1, 2, 1] has the largest sum = 6.
\`\`\`

**Edge Cases:**
- If all numbers are negative, return the largest (closest to zero) number
- A single-element array should return that element

**Starter Code:**

\`\`\`python
def max_subarray(nums: list[int]) -> int:
    """Return the maximum subarray sum."""
    pass
\`\`\`

**Hints:**
- Kadane's algorithm solves this in O(n) time
- Track \`current_sum\` and \`max_sum\` as you iterate
- Reset \`current_sum\` to 0 when it goes negative`,
  },
  {
    id: "sieve",
    title: "Sieve of Eratosthenes",
    difficulty: "medium",
    category: "Algorithms",
    description:
      "Find all prime numbers up to n using the Sieve of Eratosthenes.",
    markdown: `Given an integer **n**, return a list of all prime numbers less than or equal to n using the **Sieve of Eratosthenes** algorithm.

**Examples:**

\`\`\`
Input:  n = 30
Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
\`\`\`

**How the Sieve works:**
1. Create a boolean array of size n+1, all initially marked as prime
2. Start with the first prime number (2)
3. Mark all multiples of 2 as not prime
4. Move to the next unmarked number — it is prime
5. Repeat until you reach sqrt(n)

**Starter Code:**

\`\`\`python
def sieve_of_eratosthenes(n: int) -> list[int]:
    """Return list of primes up to n."""
    pass
\`\`\`

**Hints:**
- Initialize a list of \`True\` values with indices 0 through n
- You only need to sieve up to sqrt(n)
- 0 and 1 are not prime`,
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "medium",
    category: "Stacks",
    description:
      "Determine if a string of brackets is properly closed and nested.",
    markdown: `Given a string **s** containing just the characters \`(\`, \`)\`, \`{\`, \`}\`, \`[\` and \`]\`, determine if the input string is valid.

A string is valid if:
1. Every opening bracket has a corresponding closing bracket of the same type
2. Brackets close in the correct order and are properly nested

**Examples:**

| Input | Output |
|-------|--------|
| "({[]})" | True |
| "([)]" | False |
| "{" | False |
| "" | True |

**Starter Code:**

\`\`\`python
def is_valid(s: str) -> bool:
    """Return True if brackets are valid."""
    pass
\`\`\`

**Hints:**
- Use a stack data structure (Python list works as a stack with \`.append()\` and \`.pop()\`)
- Use a dictionary to map closing brackets to their matching opening brackets
- Push opening brackets onto the stack; pop and match when you see a closing bracket`,
  },
  {
    id: "merge-sorted",
    title: "Merge Sorted Arrays",
    difficulty: "medium",
    category: "Arrays",
    description: "Merge two sorted arrays into one sorted array.",
    markdown: `Given two sorted integer arrays **nums1** and **nums2**, merge them into one sorted array.

**Examples:**

\`\`\`
Input:  nums1 = [1, 3, 5], nums2 = [2, 4, 6]
Output: [1, 2, 3, 4, 5, 6]

Input:  nums1 = [], nums2 = [1, 2]
Output: [1, 2]
\`\`\`

**Starter Code:**

\`\`\`python
def merge_sorted(nums1: list[int], nums2: list[int]) -> list[int]:
    """Merge two sorted arrays."""
    pass
\`\`\`

**Hints:**
- Use two pointers, one for each array, and compare elements
- After one array is exhausted, append the remaining elements from the other
- Python's built-in \`sorted()\` works but is not the intended solution`,
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    difficulty: "hard",
    category: "Data Structures",
    description: "Design an LRU cache with O(1) get and put operations.",
    markdown: `Design an **LRU (Least Recently Used)** cache. It should support \`get(key)\` and \`put(key, value)\` operations in **O(1)** average time.

When the cache reaches its capacity, it should evict the least recently used item before inserting a new one.

**Operations:**
- \`get(key)\`: Return the value if the key exists, otherwise return -1
- \`put(key, value)\`: Insert or update the value. If the cache is full, evict the least recently used key

**Examples:**

\`\`\`
LRUCache cache = new LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
cache.get(1)    → returns 1
cache.put(3, 3) → evicts key 2
cache.get(2)    → returns -1 (evicted)
cache.put(4, 4) → evicts key 1
cache.get(1)    → returns -1 (evicted)
cache.get(3)    → returns 3
cache.get(4)    → returns 4
\`\`\`

**Starter Code:**

\`\`\`python
class LRUCache:
    def __init__(self, capacity: int):
        pass

    def get(self, key: int) -> int:
        pass

    def put(self, key: int, value: int) -> None:
        pass
\`\`\`

**Hints:**
- Combine a hash map with a doubly-linked list
- Python's \`collections.OrderedDict\` can simplify the implementation
- The hash map gives O(1) lookups; the linked list tracks access order`,
  },
  {
    id: "word-ladder",
    title: "Word Ladder",
    difficulty: "hard",
    category: "Graphs",
    description:
      "Find shortest transformation length from beginWord to endWord, changing one letter at a time.",
    markdown: `Given two words **beginWord** and **endWord**, and a dictionary **wordList**, find the length of the shortest transformation sequence from beginWord to endWord.

**Rules:**
- You can change only one letter at a time
- Each intermediate word must exist in wordList
- Return 0 if no transformation is possible

**Examples:**

\`\`\`
Input:  beginWord = "hit", endWord = "cog"
        wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5

Explanation: hit → hot → dot → dog → cog
\`\`\`

\`\`\`
Input:  beginWord = "hit", endWord = "cog"
        wordList = ["hot","dot","dog","lot","log"]
Output: 0 (cog is not in the word list)
\`\`\`

**Starter Code:**

\`\`\`python
def ladder_length(beginWord: str, endWord: str, wordList: list[str]) -> int:
    """Return shortest transformation length."""
    pass
\`\`\`

**Hints:**
- Model this as a **BFS** (breadth-first search) on an implicit graph
- Each word is a node; an edge exists if two words differ by one character
- Use a set for wordList for O(1) lookups
- BFS guarantees the shortest path in an unweighted graph`,
  },
];
