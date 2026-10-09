import type { Lesson, Subject } from "@/types/education";

type LessonSeed = {
  id: string;
  title: string;
  summary: string;
  explanation: string;
  example: string;
  question: string;
  options: string[];
  correctIndex: number;
  answerExplanation: string;
};

function buildLesson(seed: LessonSeed): Lesson {
  const sections = [
    {
      heading: "Learning objective",
      content: seed.summary,
    },
    {
      heading: "Understand the concept",
      content: seed.explanation,
    },
    {
      heading: "Example",
      content: seed.example,
    },
    {
      heading: "Remember",
      content: `${seed.summary} Try explaining this concept in your own words before moving to the quiz.`,
    },
  ];

  const transcript = sections
    .map((section) => `${section.heading}. ${section.content}`)
    .join("\n\n");

  return {
    id: seed.id,
    title: seed.title,
    duration: "5 min",
    summary: seed.summary,
    sections,
    quiz: {
      question: seed.question,
      options: seed.options,
      correctIndex: seed.correctIndex,
      explanation: seed.answerExplanation,
    },
    transcript,
    signLanguageAvailable: false,
  };
}

export const subjects: Subject[] = [
  {
    id: "mathematics",
    title: "Mathematics",
    description:
      "Explore numbers, fractions, geometry, patterns, and everyday problem-solving.",
    icon: "Calculator",
    color: "blue",
    lessons: [
      buildLesson({
        id: "number-basics",
        title: "Understanding Numbers",
        summary: "Recognise numbers and understand their value.",
        explanation:
          "Numbers help us count, measure, compare, and describe quantities. A place-value system tells us what each digit means. In the number 352, the 3 represents three hundreds, the 5 represents five tens, and the 2 represents two ones.",
        example:
          "If you have 3 bags containing 10 apples each and 2 extra apples, you have 32 apples.",
        question: "In the number 352, what does the digit 5 represent?",
        options: ["Five hundreds", "Five tens", "Five ones", "Fifty hundreds"],
        correctIndex: 1,
        answerExplanation:
          "The digit 5 is in the tens place, so its value is 50.",
      }),
      buildLesson({
        id: "addition-subtraction",
        title: "Addition and Subtraction",
        summary: "Learn how addition combines amounts and subtraction finds the difference.",
        explanation:
          "Addition combines two or more quantities. Subtraction removes a quantity or compares two amounts. The plus sign (+) means addition, while the minus sign (−) means subtraction.",
        example:
          "If you have 7 pencils and receive 3 more, 7 + 3 = 10. If you give away 4 pencils, 10 − 4 = 6 remain.",
        question: "What is 12 − 5?",
        options: ["5", "6", "7", "8"],
        correctIndex: 2,
        answerExplanation: "Twelve minus five equals seven.",
      }),
      buildLesson({
        id: "multiplication-division",
        title: "Multiplication and Division",
        summary: "Understand equal groups and sharing quantities equally.",
        explanation:
          "Multiplication is repeated addition of equal groups. Division splits a quantity into equal groups or finds how many groups fit into a quantity.",
        example:
          "Four groups of 3 objects make 4 × 3 = 12 objects. Sharing 12 objects equally among 4 people gives 12 ÷ 4 = 3 each.",
        question: "What is 5 × 4?",
        options: ["9", "15", "20", "25"],
        correctIndex: 2,
        answerExplanation: "Five groups of four make twenty.",
      }),
      buildLesson({
        id: "fractions",
        title: "Introduction to Fractions",
        summary: "Understand fractions as equal parts of a whole.",
        explanation:
          "A fraction represents part of a whole that has been divided into equal parts. The numerator is the top number and tells how many parts are being considered. The denominator is the bottom number and tells how many equal parts make the whole.",
        example:
          "If a pizza is divided into 4 equal slices and you eat 1 slice, you have eaten 1/4 of the pizza.",
        question: "In the fraction 3/4, what does the denominator 4 tell you?",
        options: [
          "Three parts are selected",
          "The whole has four equal parts",
          "There are four whole pizzas",
          "The fraction equals four",
        ],
        correctIndex: 1,
        answerExplanation:
          "The denominator tells you that the whole is divided into four equal parts.",
      }),
      buildLesson({
        id: "basic-geometry",
        title: "Basic Shapes and Geometry",
        summary: "Identify common two-dimensional shapes and their properties.",
        explanation:
          "Geometry studies shapes, sizes, positions, and space. A triangle has three sides, a square has four equal sides, and a circle has a curved boundary with no straight sides.",
        example:
          "A standard square has four equal sides and four right angles. A rectangle also has four right angles, but its adjacent sides do not have to be equal.",
        question: "How many sides does a triangle have?",
        options: ["Two", "Three", "Four", "Five"],
        correctIndex: 1,
        answerExplanation: "A triangle has three sides and three corners.",
      }),
    ],
  },
  {
    id: "science",
    title: "Science",
    description:
      "Discover living things, matter, energy, the human body, and our planet.",
    icon: "FlaskConical",
    color: "green",
    lessons: [
      buildLesson({
        id: "living-nonliving",
        title: "Living and Non-living Things",
        summary: "Distinguish living organisms from non-living objects.",
        explanation:
          "Living things carry out life processes such as growth, using energy, and responding to their environment. Non-living objects do not carry out all these processes independently.",
        example:
          "A plant grows and needs water and light. A rock does not grow or reproduce.",
        question: "Which of these is a living thing?",
        options: ["A rock", "A glass cup", "A growing plant", "A wooden table"],
        correctIndex: 2,
        answerExplanation: "A growing plant is a living organism.",
      }),
      buildLesson({
        id: "states-of-matter",
        title: "States of Matter",
        summary: "Learn about solids, liquids, and gases.",
        explanation:
          "Matter is anything that has mass and occupies space. Solids generally keep their shape, liquids flow and take the shape of their container, and gases spread to fill the available space.",
        example:
          "Ice is solid water, liquid water flows in a glass, and water vapour is a gas.",
        question: "Which state of matter takes the shape of its container but keeps a fixed volume?",
        options: ["Solid", "Liquid", "Gas", "None of these"],
        correctIndex: 1,
        answerExplanation:
          "A liquid flows to take the shape of its container while keeping a nearly fixed volume.",
      }),
      buildLesson({
        id: "plant-life",
        title: "How Plants Grow",
        summary: "Understand what plants need to grow and survive.",
        explanation:
          "Most green plants use sunlight, water, and carbon dioxide to make food through photosynthesis. Roots absorb water and minerals, while leaves are the main site of photosynthesis.",
        example:
          "A bean seed can sprout when it has suitable moisture, warmth, and air. The young plant then needs light to grow well.",
        question: "What is the process by which green plants make food using light?",
        options: ["Digestion", "Photosynthesis", "Evaporation", "Condensation"],
        correctIndex: 1,
        answerExplanation:
          "Photosynthesis uses light energy to help plants make sugars.",
      }),
      buildLesson({
        id: "human-body",
        title: "The Human Body",
        summary: "Identify the roles of the heart, lungs, and brain.",
        explanation:
          "The heart pumps blood around the body. The lungs exchange oxygen and carbon dioxide. The brain processes information and helps coordinate movement, memory, and many body functions.",
        example:
          "When you exercise, your heart rate and breathing rate usually increase to help deliver more oxygen to working muscles.",
        question: "Which organ pumps blood around the body?",
        options: ["Brain", "Lungs", "Heart", "Stomach"],
        correctIndex: 2,
        answerExplanation: "The heart pumps blood through the circulatory system.",
      }),
      buildLesson({
        id: "earth-environment",
        title: "Earth and Our Environment",
        summary: "Explore natural resources and ways to care for the environment.",
        explanation:
          "Earth provides resources such as water, air, soil, and sunlight. Pollution and excessive waste can harm ecosystems. Conserving resources and reducing waste help protect the environment.",
        example:
          "Using a reusable water bottle reduces the need for single-use plastic bottles.",
        question: "Which action helps reduce waste?",
        options: [
          "Throwing litter into rivers",
          "Burning plastic outdoors",
          "Reusing suitable items",
          "Leaving taps running",
        ],
        correctIndex: 2,
        answerExplanation:
          "Reusing suitable items reduces the amount of waste we produce.",
      }),
    ],
  },
  {
    id: "computer-science",
    title: "Computer Science",
    description:
      "Build digital literacy through computer basics, algorithms, coding, and online safety.",
    icon: "Monitor",
    color: "purple",
    lessons: [
      buildLesson({
        id: "computer-basics",
        title: "Computer Fundamentals",
        summary: "Identify the main parts of a computer and their roles.",
        explanation:
          "A computer accepts input, processes information, and produces output. Hardware is the physical equipment. Software is the set of programs and instructions that tell the equipment what to do.",
        example:
          "A keyboard provides input, a processor performs calculations, and a monitor displays output.",
        question: "Which item is an example of hardware?",
        options: ["A web browser program", "A keyboard", "A digital document", "A password"],
        correctIndex: 1,
        answerExplanation: "A keyboard is a physical computer component, so it is hardware.",
      }),
      buildLesson({
        id: "internet-basics",
        title: "Understanding the Internet",
        summary: "Learn how websites and internet connections help people share information.",
        explanation:
          "The internet is a global network of connected computer systems. A web browser requests web content from servers. A website can contain text, images, audio, video, and interactive features.",
        example:
          "When you open an educational website, your browser requests the page's content from a server and displays it.",
        question: "What is a web browser mainly used for?",
        options: [
          "Displaying and accessing websites",
          "Charging a laptop",
          "Printing electricity",
          "Replacing every computer component",
        ],
        correctIndex: 0,
        answerExplanation:
          "A browser lets you access and interact with websites.",
      }),
      buildLesson({
        id: "algorithms",
        title: "Introduction to Algorithms",
        summary: "Understand algorithms as clear, ordered steps for solving a problem.",
        explanation:
          "An algorithm is a finite sequence of instructions designed to solve a problem or complete a task. Good algorithms have clear steps and produce the intended result when followed correctly.",
        example:
          "A simple algorithm for making tea could be: boil water, place a tea bag in a cup, pour in the water, and wait.",
        question: "What is an algorithm?",
        options: [
          "A computer screen",
          "A sequence of steps to solve a problem",
          "A type of keyboard",
          "An internet cable",
        ],
        correctIndex: 1,
        answerExplanation:
          "An algorithm describes ordered instructions for completing a task.",
      }),
      buildLesson({
        id: "coding-basics",
        title: "Your First Steps in Coding",
        summary: "Learn how programming instructions tell a computer what to do.",
        explanation:
          "Programming is the process of writing instructions in a language a computer system can execute. Variables store values, conditions allow decisions, and loops repeat instructions.",
        example:
          "A program could store a person's age in a variable and use a condition to decide whether they meet an age requirement.",
        question: "What is a variable commonly used for in programming?",
        options: [
          "Storing a value",
          "Cleaning a screen",
          "Connecting a chair",
          "Increasing internet speed automatically",
        ],
        correctIndex: 0,
        answerExplanation: "A variable is a named place for holding a value.",
      }),
      buildLesson({
        id: "online-safety",
        title: "Staying Safe Online",
        summary: "Recognise basic ways to protect accounts and personal information.",
        explanation:
          "Online safety includes using strong, unique passwords, enabling multifactor authentication when available, checking links before opening them, and avoiding unnecessary sharing of personal information.",
        example:
          "If a message urgently asks for your password through an unfamiliar link, do not enter it. Visit the service through its official app or website instead.",
        question: "What should you do with a suspicious link asking for your password?",
        options: [
          "Enter your password immediately",
          "Forward it to everyone",
          "Avoid the link and verify the request",
          "Reuse your password on the page",
        ],
        correctIndex: 2,
        answerExplanation:
          "Avoid suspicious links and verify requests through a trusted official channel.",
      }),
    ],
  },
  {
    id: "english",
    title: "English",
    description:
      "Strengthen vocabulary, grammar, reading comprehension, and everyday communication.",
    icon: "BookOpen",
    color: "orange",
    lessons: [
      buildLesson({
        id: "parts-of-speech",
        title: "Parts of Speech",
        summary: "Recognise nouns, verbs, adjectives, and adverbs.",
        explanation:
          "A noun names a person, place, thing, or idea. A verb expresses an action or state. An adjective describes a noun, while an adverb often describes a verb, adjective, or another adverb.",
        example:
          "In 'The quick runner moves swiftly,' runner is a noun, quick is an adjective, moves is a verb, and swiftly is an adverb.",
        question: "Which word is a verb in the sentence 'Birds fly high'?",
        options: ["Birds", "Fly", "High", "The"],
        correctIndex: 1,
        answerExplanation: "'Fly' expresses the action performed by the birds.",
      }),
      buildLesson({
        id: "sentence-structure",
        title: "Building Clear Sentences",
        summary: "Learn how words combine to express a complete thought.",
        explanation:
          "A basic English sentence often contains a subject and a predicate. The subject tells us who or what the sentence is about, and the predicate tells us something about the subject.",
        example:
          "In 'The student reads,' 'The student' is the subject and 'reads' is the predicate.",
        question: "Which sentence is grammatically complete?",
        options: [
          "Because the student",
          "Running down the road",
          "The teacher explains the lesson.",
          "When the bell rings",
        ],
        correctIndex: 2,
        answerExplanation:
          "The sentence has a subject and a predicate and expresses a complete thought.",
      }),
      buildLesson({
        id: "vocabulary",
        title: "Growing Your Vocabulary",
        summary: "Use context clues and word relationships to understand new words.",
        explanation:
          "Vocabulary is the collection of words a person understands and uses. Context clues are hints in nearby words or sentences. Synonyms have similar meanings, while antonyms have opposite meanings.",
        example:
          "In 'The exhausted runner needed rest,' the word exhausted suggests being extremely tired.",
        question: "Which word is closest in meaning to 'begin'?",
        options: ["Finish", "Start", "Forget", "Stop"],
        correctIndex: 1,
        answerExplanation: "'Start' is a synonym of 'begin.'",
      }),
      buildLesson({
        id: "reading-comprehension",
        title: "Reading for Understanding",
        summary: "Identify the main idea and supporting details in a passage.",
        explanation:
          "The main idea is the central point of a passage. Supporting details explain, describe, or provide evidence for that point. Readers can ask who, what, when, where, why, and how to understand a text.",
        example:
          "If a paragraph describes how regular exercise improves fitness, its main idea may be the benefits of exercise.",
        question: "What does the main idea of a passage tell you?",
        options: [
          "The central point",
          "Only the last word",
          "The number of paragraphs",
          "The font used",
        ],
        correctIndex: 0,
        answerExplanation: "The main idea communicates what the passage is mostly about.",
      }),
      buildLesson({
        id: "everyday-communication",
        title: "Everyday Communication",
        summary: "Practise communicating clearly, respectfully, and with purpose.",
        explanation:
          "Effective communication means expressing information so others can understand it. Clear language, listening, appropriate questions, and awareness of different communication needs all help conversations.",
        example:
          "Instead of saying 'Give me that,' you could say 'Could you please pass me the notebook?'",
        question: "Which approach supports clear and respectful communication?",
        options: [
          "Using unclear instructions",
          "Ignoring the other person",
          "Making a clear and polite request",
          "Speaking over everyone",
        ],
        correctIndex: 2,
        answerExplanation:
          "A clear and polite request makes the intended action easier to understand.",
      }),
    ],
  },
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description:
      "Learn about geography, history, civic life, health, and everyday awareness.",
    icon: "Globe2",
    color: "teal",
    lessons: [
      buildLesson({
        id: "world-geography",
        title: "World Geography",
        summary: "Understand continents, oceans, and basic world geography.",
        explanation:
          "Geography studies Earth's places, environments, and how people interact with them. The world is commonly divided into seven continents and five named oceans.",
        example:
          "Asia is the largest continent by land area. The Pacific Ocean is the largest ocean.",
        question: "Which is the largest ocean on Earth?",
        options: ["Indian Ocean", "Arctic Ocean", "Pacific Ocean", "Southern Ocean"],
        correctIndex: 2,
        answerExplanation: "The Pacific Ocean is the largest ocean on Earth.",
      }),
      buildLesson({
        id: "india-basics",
        title: "Getting to Know India",
        summary: "Learn key facts about India's government, capital, and national symbols.",
        explanation:
          "India is a country in South Asia. New Delhi is its capital. India is a parliamentary democratic republic, and the Constitution establishes the framework for its government and citizens' rights.",
        example:
          "The Constitution of India came into effect on 26 January 1950, a date celebrated annually as Republic Day.",
        question: "What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Chennai", "Kolkata"],
        correctIndex: 1,
        answerExplanation: "New Delhi is the capital of India.",
      }),
      buildLesson({
        id: "history-timelines",
        title: "Understanding History",
        summary: "Learn how timelines help organise historical events.",
        explanation:
          "History examines past events using sources such as documents, objects, photographs, and oral accounts. Timelines place events in chronological order, helping us understand what happened before or after something else.",
        example:
          "A timeline of your school years could list the year you started school before the year you graduated.",
        question: "What does a historical timeline help you understand?",
        options: [
          "The order of events over time",
          "How to measure temperature",
          "How to draw a circle",
          "How to calculate speed only",
        ],
        correctIndex: 0,
        answerExplanation:
          "A timeline displays events in chronological order.",
      }),
      buildLesson({
        id: "civic-awareness",
        title: "Civic Awareness",
        summary: "Understand how citizens participate in their communities.",
        explanation:
          "Civic awareness includes understanding public institutions, community responsibilities, and how people participate in society. Participation can include voting when eligible, following laws, helping communities, and raising concerns through appropriate channels.",
        example:
          "Reporting a broken streetlight to the relevant local authority is one way to contribute to community safety.",
        question: "Which action is an example of civic participation?",
        options: [
          "Damaging public property",
          "Reporting a community safety issue",
          "Ignoring every public concern",
          "Spreading unverified rumours",
        ],
        correctIndex: 1,
        answerExplanation:
          "Reporting a community issue through an appropriate channel helps address a public concern.",
      }),
      buildLesson({
        id: "health-and-hygiene",
        title: "Health and Personal Hygiene",
        summary: "Learn everyday habits that support health and hygiene.",
        explanation:
          "Personal hygiene includes washing hands with soap, brushing teeth, keeping clothing clean, and handling food safely. Adequate sleep, balanced nutrition, and regular physical activity also support general well-being.",
        example:
          "Washing your hands with soap before eating helps remove dirt and many germs.",
        question: "Which habit helps maintain hand hygiene?",
        options: [
          "Washing hands with soap",
          "Sharing unwashed utensils",
          "Touching food with dirty hands",
          "Avoiding water all day",
        ],
        correctIndex: 0,
        answerExplanation:
          "Washing hands with soap helps remove dirt and many germs.",
      }),
    ],
  },
];

export function getSubject(subjectId: string): Subject | undefined {
  return subjects.find((subject) => subject.id === subjectId);
}

export function getLesson(
  subjectId: string,
  lessonId: string,
): Lesson | undefined {
  return getSubject(subjectId)?.lessons.find((lesson) => lesson.id === lessonId);
}

export function getAllLessons(): Array<{
  subject: Subject;
  lesson: Lesson;
  lessonIndex: number;
}> {
  return subjects.flatMap((subject) =>
    subject.lessons.map((lesson, lessonIndex) => ({
      subject,
      lesson,
      lessonIndex,
    })),
  );
}