import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const POSTS_PATH = path.join(ROOT, "public", "blog-posts.json");

const topics = [
  {
    key: "sat-study-plan",
    topic: "SAT Prep",
    title: "How To Build A Weekly SAT Study Plan That Actually Works",
    excerpt: "A practical SAT plan students can stick to without burning out or wasting hours. Written by a UMD CS student who scored 1500+.",
    query: "SAT exam student studying",
    sections: [
      {
        heading: "Start With A Baseline, Not Guesswork",
        paragraph: "When I started studying for the SAT, my biggest mistake was opening a prep book to page one and reading through it sequentially. This is a massive waste of time. You need to take a timed, official diagnostic test first. Once you have a starting score, analyze every single mistake. Did you miss a question because you didn't know the math formula (a concept gap), did you misread the question (a careless mistake), or did you run out of time? Grouping your errors this way tells you exactly what to study, so you can spend your hours on your weakest areas instead of reviewing things you already know."
      },
      {
        heading: "Use A 4-Day Weekly SAT Structure",
        paragraph: "Cramming for 6 hours on Sunday is the fastest way to forget everything by the next week. Instead, space your prep into four days, doing 45 to 60 minutes per session. Day 1 should focus on math concepts and targeted drills. Day 2 should be dedicated to Reading & Writing strategies, practicing with short, timed passages. On Day 3, take a mixed timed section to simulate actual test pressure and build pacing. Finally, Day 4 is for deep error review—redo every question you got wrong and explain in writing why the correct answer is right. This consistent habit is how you build real test-taking reflexes."
      },
      {
        heading: "Track Progress The Smart Way",
        paragraph: "Don't judge your progress by a single diagnostic score. Standardized test scores naturally fluctuate, which can be discouraging if you have a bad day. Instead, track your accuracy percentages by topic over time. If your punctuation accuracy goes from 60% to 90%, you are making real progress, even if your total score doesn't show it immediately. Keep a dedicated error log where you write down the question, your wrong answer, the correct answer, and the key takeaway. Before every study session, review your error log so you don't repeat the same mistakes."
      }
    ],
    cta: "SAT scores improve fastest when your plan is specific, consistent, and heavily focused on error analysis rather than volume."
  },
  {
    key: "college-list-strategy",
    topic: "College Admissions",
    title: "How To Build A Balanced College List (Reach, Target, Likely)",
    excerpt: "A step-by-step way for students to build a realistic and competitive college list that balances academic fit and financial constraints.",
    imageUrl: "https://milkenroar.com/wp-content/uploads/2022/06/Untitled-design-900x655.jpg",
    imageAttribution: "Image source: Milken Roar",
    query: "college campus students admission",
    sections: [
      {
        heading: "Know Your Academic Profile First",
        paragraph: "Before you look at college rankings, write down your GPA trend, standardized test scores, course rigor (APs/IBs), and key activities. Use resources like the Common Data Set for each college to see where your stats land relative to their middle 50% of admitted students. Be honest with yourself: if a school's average GPA is a 3.9 and your GPA is a 3.5, it belongs in the reach category, regardless of how much you want to go. Building a list on solid data rather than prestige ensures you have options when decisions come out."
      },
      {
        heading: "Use A 30/40/30 Mix",
        paragraph: "A healthy college list should have about 8 to 10 schools: 2-3 reaches, 3-4 targets, and 2-3 likelies. The most common mistake I see is students loading up on 8 reach schools and adding 1 'safety' they hate. Every single school on your list should be a place you would be genuinely excited to attend. If you wouldn't walk onto a likely campus with a smile on your face, remove it from your list. Also, discuss college budgets with your family early—financial safety is just as important as academic safety."
      },
      {
        heading: "Stress-Test Your Final List",
        paragraph: "Once you have your list, research deadlines (Early Action, Early Decision, Regular Decision) and look at the essay requirements. Some schools have 3 or 4 supplemental essays, while others have none. If your list of 10 colleges requires a total of 25 supplemental essays, you may want to swap some out to avoid burnout during senior fall. Ensure you have a clear timeline to get recommendations, transcripts, and financial aid forms submitted well ahead of the deadlines."
      }
    ],
    cta: "A good college list is balanced, affordable, and aligned with your real academic and lifestyle goals."
  },
  {
    key: "activities-impact",
    topic: "College Admissions",
    title: "Activities That Matter: How To Show Impact, Not Just Participation",
    excerpt: "How students can turn clubs and personal projects into stronger admissions stories that stand out to readers.",
    query: "high school students project teamwork",
    sections: [
      {
        heading: "Depth Beats Random Breadth",
        paragraph: "Admissions officers are tired of seeing resumes with 10 different clubs where the student was just a member who showed up to meetings. They want to see depth. It is far better to be deeply committed to 2 or 3 activities than to have shallow participation in a dozen. Focus on activities where you can demonstrate sustained involvement, take on leadership, and create actual projects. When you dedicate yourself to a few areas, you build the experiences that make for memorable college essays."
      },
      {
        heading: "Track Results, Not Just Titles",
        paragraph: "When describing your activities on the Common App, focus on quantifiable results. Did you organize an event? How many students attended? Did you run a social media account? By what percentage did you grow the engagement? Did you raise funds? What was the exact dollar amount, and how was it spent? Keep a Google Doc where you write down these numbers throughout high school. Having concrete data makes your achievements feel real and proves you took initiative."
      },
      {
        heading: "Translate Work Into Application Language",
        paragraph: "The way you write about your activities matters. Instead of writing 'helped organize club events,' write 'coordinated 4 school-wide community service projects, managing a team of 15 volunteers.' Use action verbs and lead with the outcome. Make it clear what your specific contribution was and why the activity mattered to your school or local community. This shows admissions readers that you are a contributor who will bring value to their college campus."
      }
    ],
    cta: "Admissions readers remember impact and initiative. Focus on depth and metrics rather than building a long, shallow activity list."
  },
  {
    key: "umd-cs-admissions",
    topic: "College Admissions",
    title: "Demystifying STEM Admissions: What Got Me Into UMD CS",
    excerpt: "A first-hand look at what top-tier Computer Science and STEM programs look for in applicants, written by a current UMD CS student.",
    query: "computer coding student library",
    sections: [
      {
        heading: "The Reality of STEM Selectivity",
        paragraph: "Applying as a Computer Science or engineering major is a completely different game than applying for other fields. The competition is intense, and having a high GPA is just the baseline. I applied to the University of Maryland for Computer Science, and I quickly realized that colleges want to see specific academic preparation. You need to demonstrate strong math readiness—taking AP Calculus BC or AP Statistics and doing well is crucial. If your school doesn't offer these, seek out dual enrollment or online classes to prove you can handle college-level math."
      },
      {
        heading: "Show, Don't Just Tell, Your Technical Interest",
        paragraph: "Lots of students write that they love programming, but very few have projects to show for it. I built personal coding projects, participated in local hackathons, and published simple web tools. You don't need to build the next Facebook. Even a simple React app, a Python script that automates a task, or a coding club project shows that you are self-motivated. Put your code on GitHub and include a link in your application. It proves you have actual coding experience and curiosity."
      },
      {
        heading: "The Power of a Cohesive Application Theme",
        paragraph: "Your application should tell a clear story. For me, my activities, coursework, and essays all pointed toward my interest in technology and education. I didn't try to look like a varsity athlete who also plays violin and runs debate if that wasn't who I was. I doubled down on CS and mentorship. This cohesion made it easy for admissions readers to understand exactly who I was and what I would bring to UMD. Find your 'spike'—the one or two areas you excel at—and build your application theme around them."
      }
    ],
    cta: "STEM programs value rigorous math preparation, self-motivated coding projects, and a cohesive application theme over a generic, well-rounded profile."
  },
  {
    key: "common-app-essay-pitfalls",
    topic: "College Admissions",
    title: "How to Write a Common App Essay That Doesn't Sound Like Everyone Else's",
    excerpt: "How to avoid common essay cliches and find a unique, authentic voice that admissions officers will remember.",
    imageUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*oyotWR2_Vfj30RKJsFWPwQ.jpeg",
    imageAttribution: "Image via Medium",
    query: "writing student college desk",
    sections: [
      {
        heading: "Avoid the Big Cliches",
        paragraph: "Admissions officers read thousands of essays, and most of them fall into three categories: the sports injury where the student works hard and wins the big game, the mission trip where the student realizes how lucky they are, and the general resume-list essay. I advise students to completely avoid these topics. If you write about a sports injury, you are competing with thousands of other students writing the exact same story. Instead, write about something specific, small, and unique to your daily life."
      },
      {
        heading: "Focus on the 'Small' Moments",
        paragraph: "Some of the best essays I've read are about incredibly mundane things: baking sourdough bread, working a weekend shift at a grocery store, or building a shelf. The magic isn't in the topic; it's in how you write about it. Use sensory details and focus on your internal thought process. Explain how a small, daily interaction shaped your perspective or taught you how to solve problems. This reveals your personality and maturity in a way that a grand story about a trip never can."
      },
      {
        heading: "The 80/20 Rule of Essay Writing",
        paragraph: "Your essay should be 80% about you and only 20% about the event or context. I often see essays where the student spends four paragraphs describing their grandfather or their chemistry teacher, and only one paragraph about themselves. The admissions committee isn't admitting your grandfather—they are admitting you. Make sure your thoughts, reflections, actions, and growth take up the majority of the word count. Keep the focus entirely on your character."
      }
    ],
    cta: "Write about small, specific moments, focus on your own reflections, and avoid generic resume-listing to create an authentic essay that stands out."
  },
  {
    key: "sat-error-log",
    topic: "SAT Prep",
    title: "The Digital SAT Secret: How a Physical Error Log Boosts Your Score",
    excerpt: "The exact technique of keeping a physical error log to target your mistakes and score higher on the Digital SAT.",
    imageUrl: "https://m.media-amazon.com/images/I/716nKw-6UxL._AC_UF1000,1000_QL80_.jpg",
    imageAttribution: "Image via Amazon",
    query: "notebook open with pen math",
    sections: [
      {
        heading: "Why Practice Tests Aren't Enough",
        paragraph: "Many students think that the secret to a high SAT score is taking 20 practice tests. They take a test, look at their score, get frustrated, and then take another test hoping it goes up. This doesn't work. If you don't fix the underlying mistakes, you will keep getting the same score. The secret is to study your errors deeply. Every time you get a question wrong, it is an opportunity to learn. If you don't document and review your mistakes, you are wasting your practice tests."
      },
      {
        heading: "How to Build a Physical Error Log",
        paragraph: "Get a blank physical notebook. For every single question you miss on a practice test or homework assignment, write down: 1) The source of the question and the full question text, 2) The answer you chose and why you chose it, 3) The correct answer, and 4) The specific concept or rule you forgot. Doing this by hand forces your brain to process the error. It prevents you from simply looking at the explanation, saying 'oh, that makes sense,' and immediately forgetting it."
      },
      {
        heading: "Review Before You Practice",
        paragraph: "Your error log is your personalized study guide. Before you open Bluebook or start a new prep set, read through your error log. Remind yourself of the grammar rules you missed or the algebra traps you fell into. Redo the questions in your log without looking at the solutions. If you can get them right three times in a row on different days, you have officially mastered that concept. This targeted approach is how I and many of my students scored 1500+."
      }
    ],
    cta: "Stop taking endless practice tests without review. Keep a detailed physical error log and master your mistakes to see real score improvements."
  },
  {
    key: "ap-class-balance",
    topic: "College Admissions",
    title: "Managing the AP Grind: Balancing Rigor and Mental Health",
    excerpt: "Practical tips on how to choose the right number of Advanced Placement classes without burning out or sacrificing your GPA.",
    imageUrl: "https://www.pinecrestmiddlehigh.org/ourpages/auto/2022/11/7/57521163/AP-Feature-Image.png?rnd=1667805010164",
    imageAttribution: "Photo via pinecrestmiddlehigh.org",
    query: "tired student studying library",
    sections: [
      {
        heading: "Rigor vs. GPA: The Golden Balance",
        paragraph: "High school students are constantly told they need to take every AP class their school offers to get into a top college. But here is the reality: a transcript with 3 AP classes and a 3.9 GPA looks much better than a transcript with 7 AP classes and a 3.2 GPA. You must balance rigor with your ability to perform. Admissions officers want to see that you challenged yourself, but they also want to see that you succeeded. Take APs in subjects you are strong in or care about, and don't overwhelm yourself with classes that will tank your grades."
      },
      {
        heading: "Learn to Drop Low-Impact Commitments",
        paragraph: "If you are taking 4 AP classes, studying for the SAT, and playing a sport, you cannot also be in 6 different school clubs. You will burn out. I had to learn how to audit my commitments. I dropped the clubs where I was just showing up for attendance and focused entirely on the 2 activities that actually mattered to me. This freed up hours of study time each week, reduced my stress, and allowed me to focus on my classes. Be protective of your time."
      },
      {
        heading: "Build a High-Velocity Study Routine",
        paragraph: "AP classes require active study habits, not just passive reading. Use active recall and spaced repetition. Make flashcards for vocabulary-heavy classes like AP Biology or AP US History. For math and physics, do practice problems without looking at the formulas. Study in focused blocks of 45 minutes with a 5-minute break (the Pomodoro technique). This keeps your brain fresh and prevents the late-night study sessions that ruin your sleep and concentration."
      }
    ],
    cta: "Focus on academic success in key AP subjects rather than volume, protect your study time, and use active study methods to avoid burnout."
  },
  {
    key: "teacher-recommendations",
    topic: "College Admissions",
    title: "How to Secure Outstanding Teacher Letters of Recommendation",
    excerpt: "How to build relationships with your teachers and compile a brag sheet that helps them write specific, memorable letters.",
    query: "teacher student classroom speaking",
    sections: [
      {
        heading: "Choose the Right Teachers",
        paragraph: "When selecting teachers for your college recommendations, don't just pick the teacher who gave you an A+. Pick the teacher who knows you best. Often, a letter from a teacher in a class where you struggled but worked hard, asked questions, and showed improvement is much more powerful than a generic letter from a class where you got an easy A. Admissions readers want to know about your character, classroom presence, and intellectual curiosity."
      },
      {
        heading: "Ask Early and Professionally",
        paragraph: "Teachers are busy, and they write recommendations on their own time. Ask them at the end of your junior year or the very start of your senior year. Ask them in person first, and follow up with a polite email. This shows respect for their time and ensures they aren't rushed. A rushed letter is usually a generic template—giving your teacher weeks of lead time allows them to write a thoughtful, personalized story about your achievements."
      },
      {
        heading: "Create a High-Impact Brag Sheet",
        paragraph: "When your teacher agrees to write your letter, provide them with a 'brag sheet.' This shouldn't just be a copy of your resume. Instead, write down: 1) The specific projects or papers you were proud of in their class, 2) A challenge you faced and how you overcame it, and 3) Why you enjoyed their class. This gives the teacher specific anecdotes to reference, ensuring your recommendation letter is filled with concrete details rather than generic praise."
      }
    ],
    cta: "Select teachers who know your character, ask them early, and supply a specific brag sheet to help them write a memorable, anecdotal letter."
  },
  {
    key: "scholarships-merit",
    topic: "College Admissions",
    title: "How to Secure Merit Scholarships: Earning $200K+ in College Aid",
    excerpt: "Learn how to build a strategic list and write compelling essays to win generous merit aid from colleges, written by a scholarship recipient.",
    query: "diploma money graduation student",
    sections: [
      {
        heading: "Target the Right Schools",
        paragraph: "The secret to winning large merit scholarships is choosing colleges where your academic profile places you in the top 10% of their applicant pool. If you apply to Ivy League or highly selective schools, they do not offer merit aid at all—only need-based aid. But many excellent top-50 and state flagship universities offer massive, full-tuition merit scholarships to attract top-tier students. Target these schools early in your process to build a financially realistic list."
      },
      {
        heading: "Apply for Honors Colleges",
        paragraph: "Most major merit scholarships are tied to honors colleges or specific scholars programs. These programs often require a separate application, a earlier deadline (often November 1st), and extra essays. Do not ignore these! Joining an honors college not only grants you tuition scholarships, but it also gives you priority class registration, smaller seminars, and dedicated research opportunities."
      },
      {
        heading: "Write Passionate, Specific Scholarship Essays",
        paragraph: "Scholarship committees want to fund leaders who will make an impact on their campus. When writing scholarship essays, highlight your concrete achievements and outline a clear vision of how you plan to contribute to their college. Explain what research projects you want to join, what clubs you want to lead, and how you will represent their school. This specific, forward-looking enthusiasm is what sets winning applications apart."
      }
    ],
    cta: "Target generous schools where your profile places you in the top 10%, apply early for honors programs, and write highly specific, impact-focused essays."
  },
  {
    key: "sat-grammar-hacks",
    topic: "SAT Prep",
    title: "SAT Grammar Hacks: The Essential Rules for Easy Writing Points",
    excerpt: "Master the high-yield grammar rules that appear on every Digital SAT Reading & Writing section to quickly boost your score.",
    query: "books library study math grammar",
    sections: [
      {
        heading: "Master Punctuation Rules",
        paragraph: "Punctuation questions represent some of the fastest points you can gain on the SAT. You must know how to use semicolons, colons, and dashes. A semicolon is used to connect two independent clauses (complete sentences). A colon must be preceded by a complete sentence, but can be followed by a list, explanation, or quote. Dashes are used to offset non-essential clauses in pairs, or as a single dash for emphasis. Memorizing these exact rules eliminates guesswork."
      },
      {
        heading: "Memorize Transition Word Categories",
        paragraph: "Transition questions ask you to select the best connecting word between two sentences. Categorize transitions into three groups: Cause & Effect (therefore, thus), Contrast (however, despite), and Addition (furthermore, in addition). Read the sentence before and after the blank, determine their logical relationship, and match it to the correct category. If two answer choices mean the same thing (e.g. 'furthermore' and 'in addition'), they are both wrong."
      },
      {
        heading: "Understand Subject-Verb and Pronoun Agreement",
        paragraph: "The SAT loves to insert long prepositional phrases between a subject and its verb to trick you. For example, in the sentence 'The cluster of stars is visible,' the subject is 'cluster' (singular), not 'stars' (plural), so the verb must be 'is' (singular). Cross out the middle descriptors when reading the sentence to locate the true subject. Ensure that verbs and pronouns match their singular or plural subjects consistently."
      }
    ],
    cta: "Memorize the exact punctuation, transition, and agreement rules to turn the Writing section into a predictable source of high score gains."
  }
];

function loadPosts() {
  if (!fs.existsSync(POSTS_PATH)) return [];
  return JSON.parse(fs.readFileSync(POSTS_PATH, "utf-8"));
}

function savePosts(posts) {
  fs.writeFileSync(POSTS_PATH, `${JSON.stringify(posts, null, 2)}\n`, "utf-8");
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function nextTopic(posts) {
  const usedKeys = new Set(posts.map((p) => p.generatorKey).filter(Boolean));
  for (const topic of topics) {
    if (!usedKeys.has(topic.key)) return topic;
  }
  return topics[Math.floor(Math.random() * topics.length)];
}

async function fetchWikimediaImage(searchQuery) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(
    searchQuery,
  )}&gsrlimit=5&prop=pageimages&piprop=thumbnail&pithumbsize=1280&origin=*`;

  try {
    const response = await fetch(apiUrl, { headers: { "user-agent": "FutureReadyPrepBlogBot/1.0" } });
    if (!response.ok) throw new Error("Image fetch failed");
    const data = await response.json();
    const pages = Object.values(data?.query?.pages ?? {});
    for (const page of pages) {
      if (page?.thumbnail?.source) return page.thumbnail.source;
    }
  } catch {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/School_building.jpg/1280px-School_building.jpg";
  }

  return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/School_building.jpg/1280px-School_building.jpg";
}

async function main() {
  const posts = loadPosts();
  const selectedTopic = nextTopic(posts);
  const date = new Date().toISOString().slice(0, 10);

  let title = selectedTopic.title;
  let excerpt = selectedTopic.excerpt;
  let sections = selectedTopic.sections;
  let cta = selectedTopic.cta;

  // Apply dynamic variations if the topic has already been used to prevent duplicate title matches
  const usedKeys = new Set(posts.map((p) => p.generatorKey).filter(Boolean));
  if (usedKeys.has(selectedTopic.key)) {
    const variations = [
      {
        titleSuffix: " — A Freshman Guide",
        excerptPrefix: "Specifically for younger students: ",
      },
      {
        titleSuffix: " (2026 Edition)",
        excerptPrefix: "Updated for the latest cycle: ",
      },
      {
        titleSuffix: " — Mentor Insights",
        excerptPrefix: "First-hand advice: ",
      }
    ];
    const variation = variations[Math.floor(Math.random() * variations.length)];
    title = `${title}${variation.titleSuffix}`;
    excerpt = `${variation.excerptPrefix}${excerpt}`;
  }

  let slug = slugify(`${title}-${date}`);
  const slugs = new Set(posts.map((p) => p.slug));
  let counter = 2;
  while (slugs.has(slug)) {
    slug = slugify(`${title}-${date}-${counter}`);
    counter += 1;
  }

  const imageUrl = selectedTopic.imageUrl ?? (await fetchWikimediaImage(selectedTopic.query));

  const newPost = {
    slug,
    title,
    excerpt,
    topic: selectedTopic.topic,
    publishedAt: date,
    readTimeMinutes: 6,
    imageUrl,
    imageAttribution: selectedTopic.imageAttribution ?? "Photo via Wikimedia Commons (open license)",
    sections,
    cta,
    generatorKey: selectedTopic.key
  };

  const duplicateTitle = posts.some((post) => post.title.trim().toLowerCase() === newPost.title.trim().toLowerCase());
  if (duplicateTitle) {
    console.log("Duplicate title detected; skipping creation.");
    return;
  }

  posts.unshift(newPost);
  savePosts(posts);
  console.log(`Created blog post: ${newPost.slug}`);
}

main();
