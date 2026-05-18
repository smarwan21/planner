import { Problem } from "../types/problem";

export const problems: Problem[] = [
  {
    id: "circlearea",
    title: "Circle Area",
    difficulty: "easy",
    category: "Math",
    description: `Write a program that calculates the area of a circle given its radius.`,
    sampleInputs: ["radius = 5"],
    sampleOutputs: ["78.54"],
    starterCode:
      'def circle_area(radius: float) -> float:\n    """Return the area of a circle given its radius."""\n    pass\n',
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    difficulty: "easy",
    category: "Conditionals",
    description: `Write a program that prints numbers from 1 to **n**. For multiples of 3, print "Fizz" instead of the number. For multiples of 5, print "Buzz". For numbers that are multiples of both 3 and 5, print "FizzBuzz".`,
    sampleInputs: ["n = 15"],
    sampleOutputs: [
      "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz",
    ],
    starterCode:
      'def fizzbuzz(n: int) -> None:\n    """Print FizzBuzz sequence up to n."""\n    pass\n',
  },
  {
    id: "palindrome",
    title: "Palindrome Checker",
    difficulty: "easy",
    category: "Strings",
    description: `Given a string **s**, determine if it is a palindrome. A palindrome reads the same forwards and backwards. Ignore case, spaces, and non-alphanumeric characters.`,
    sampleInputs: ["s = 'A man, a plan, a canal: Panama'"],
    sampleOutputs: ["True"],
    starterCode:
      'def is_palindrome(s: str) -> bool:\n    """Return True if s is a palindrome."""\n    pass\n',
  },
  {
    id: "fibonacci",
    title: "Nth Fibonacci",
    difficulty: "easy",
    category: "Recursion",
    description: `Compute the **nth** Fibonacci number. The Fibonacci sequence starts with F(0)=0 and F(1)=1, and each subsequent term is the sum of the previous two.`,
    sampleInputs: ["n = 10"],
    sampleOutputs: ["55"],
    starterCode:
      'def fibonacci(n: int) -> int:\n    """Return the nth Fibonacci number."""\n    pass\n',
  },
  {
    id: "anagram",
    title: "Anagram Detector",
    difficulty: "medium",
    category: "Strings",
    description: `Given two strings **s** and **t**, determine if they are anagrams. Two strings are anagrams if they contain the same characters with the same frequencies. Ignore case and spaces.`,
    sampleInputs: ["s = 'listen'", "t = 'silent'"],
    sampleOutputs: ["True"],
    starterCode:
      'def is_anagram(s: str, t: str) -> bool:\n    """Return True if s and t are anagrams."""\n    pass\n',
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray Sum",
    difficulty: "medium",
    category: "Arrays",
    description: `Given an integer array **nums**, find the contiguous subarray (containing at least one number) with the largest sum and return its sum.`,
    sampleInputs: ["nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]"],
    sampleOutputs: ["6 (subarray [4, -1, 2, 1])"],
    starterCode:
      'def max_subarray(nums: list[int]) -> int:\n    """Return the maximum subarray sum."""\n    pass\n',
  },
  {
    id: "sieve",
    title: "Sieve of Eratosthenes",
    difficulty: "medium",
    category: "Algorithms",
    description: `Given an integer **n**, return a list of all prime numbers less than or equal to n using the Sieve of Eratosthenes algorithm.`,
    sampleInputs: ["n = 30"],
    sampleOutputs: ["[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]"],
    starterCode:
      'def sieve_of_eratosthenes(n: int) -> list[int]:\n    """Return list of primes up to n."""\n    pass\n',
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "medium",
    category: "Stacks",
    description: `Given a string **s** containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. A string is valid if brackets close in the correct order and are properly nested.`,
    sampleInputs: ["s = '({[]})'"],
    sampleOutputs: ["True"],
    starterCode:
      'def is_valid(s: str) -> bool:\n    """Return True if brackets are valid."""\n    pass\n',
  },
  {
    id: "merge-sorted",
    title: "Merge Sorted Arrays",
    difficulty: "medium",
    category: "Arrays",
    description: `Given two sorted integer arrays **nums1** and **nums2**, merge them into one sorted array.`,
    sampleInputs: ["nums1 = [1, 3, 5]", "nums2 = [2, 4, 6]"],
    sampleOutputs: ["[1, 2, 3, 4, 5, 6]"],
    starterCode:
      'def merge_sorted(nums1: list[int], nums2: list[int]) -> list[int]:\n    """Merge two sorted arrays."""\n    pass\n',
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    difficulty: "hard",
    category: "Data Structures",
    description: `Design an LRU (Least Recently Used) cache. It should support **get(key)** and **put(key, value)** operations in O(1) average time. When the cache reaches capacity, it should evict the least recently used item.`,
    sampleInputs: ["capacity = 2", "put(1, 1), put(2, 2), get(1), put(3, 3)"],
    sampleOutputs: ["get(1) → 1", "get(2) → -1 (evicted)"],
    starterCode:
      "class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass\n",
  },
  {
    id: "word-ladder",
    title: "Word Ladder",
    difficulty: "hard",
    category: "Graphs",
    description: `Given two words **beginWord** and **endWord**, and a dictionary **wordList**, find the length of the shortest transformation sequence from beginWord to endWord. You can change only one letter at a time, and each intermediate word must exist in wordList.`,
    sampleInputs: [
      "beginWord = 'hit'",
      "endWord = 'cog'",
      "wordList = ['hot','dot','dog','lot','log','cog']",
    ],
    sampleOutputs: ["5 (hit → hot → dot → dog → cog)"],
    starterCode:
      'def ladder_length(beginWord: str, endWord: str, wordList: list[str]) -> int:\n    """Return shortest transformation length."""\n    pass\n',
  },
];
