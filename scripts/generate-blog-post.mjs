import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const POSTS_PATH = path.join(ROOT, "public", "blog-posts.json");

const topics = [
  {
    key: "sat-study-plan",
    topic: "SAT Prep",
    title: "How To Build A Weekly SAT Study Plan That Actually Works",
    excerpt:
      "A practical SAT plan students can stick to without burning out or wasting hours.",
    query: "SAT exam student studying",
    sections: [
      {
        heading: "Start With A Baseline, Not Guesswork",
        points: [
          "Take one timed diagnostic before planning anything.",
          "Split errors by type: concept gaps, careless mistakes, or timing.",
          "Prioritize the top 2 score blockers first."
        ]
      },
      {
        heading: "Use A 4-Day Weekly SAT Structure",
        points: [
          "Day 1: Math concepts + focused drill.",
          "Day 2: Reading/Writing strategy + timed set.",
          "Day 3: Mixed timed practice + review.",
          "Day 4: Deep error analysis and corrections."
        ]
      },
      {
        heading: "Track Progress The Smart Way",
        points: [
          "Measure accuracy by question type every week.",
          "Retake only missed question categories after review.",
          "Aim for consistency before adding more hours."
        ]
      }
    ],
    cta: "SAT scores improve fastest when your plan is specific, consistent, and review-heavy."
  },
  {
    key: "college-list-strategy",
    topic: "College Admissions",
    title: "How To Build A Balanced College List (Reach, Target, Likely)",
    excerpt:
      "A step-by-step way for students to build a realistic and competitive college list.",
    imageUrl: "https://milkenroar.com/wp-content/uploads/2022/06/Untitled-design-900x655.jpg",
    imageAttribution: "Image source: Milken Roar",
    query: "college campus students admission",
    sections: [
      {
        heading: "Know Your Academic Profile First",
        points: [
          "List your GPA trend, rigor, SAT/ACT range, and key activities.",
          "Compare yourself to each college's middle 50% data.",
          "Do not build your list using prestige alone."
        ]
      },
      {
        heading: "Use A 30/40/30 Mix",
        points: [
          "About 30% reach schools, 40% target schools, 30% likely schools.",
          "Ensure at least 2-3 schools you would truly be happy attending.",
          "Keep financial fit in the conversation early."
        ]
      },
      {
        heading: "Stress-Test Your Final List",
        points: [
          "Check deadlines, essay load, and testing requirements.",
          "Remove schools that do not match your goals or budget.",
          "Finalize by early fall of senior year."
        ]
      }
    ],
    cta: "A good college list is balanced, affordable, and aligned with your real goals."
  },
  {
    key: "activities-impact",
    topic: "College Admissions",
    title: "Activities That Matter: How To Show Impact, Not Just Participation",
    excerpt:
      "How students can turn clubs and projects into stronger admissions stories.",
    query: "high school students project teamwork",
    sections: [
      {
        heading: "Depth Beats Random Breadth",
        points: [
          "Choose fewer activities and go deeper in each.",
          "Stay long enough to produce measurable outcomes.",
          "Build a consistent theme across your top commitments."
        ]
      },
      {
        heading: "Track Results, Not Just Titles",
        points: [
          "Document metrics: people helped, events run, funds raised, projects shipped.",
          "Keep before/after evidence where possible.",
          "Save links, screenshots, and supervisor feedback."
        ]
      },
      {
        heading: "Translate Work Into Application Language",
        points: [
          "Use action verbs and specific outcomes.",
          "Explain why the work mattered to your community.",
          "Connect activities to growth and future goals."
        ]
      }
    ],
    cta: "Admissions readers remember impact and initiative more than long activity lists."
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

  let slug = slugify(`${selectedTopic.title}-${date}`);
  const slugs = new Set(posts.map((p) => p.slug));
  let counter = 2;
  while (slugs.has(slug)) {
    slug = slugify(`${selectedTopic.title}-${date}-${counter}`);
    counter += 1;
  }

  const imageUrl = selectedTopic.imageUrl ?? (await fetchWikimediaImage(selectedTopic.query));

  const newPost = {
    slug,
    title: selectedTopic.title,
    excerpt: selectedTopic.excerpt,
    topic: selectedTopic.topic,
    publishedAt: date,
    readTimeMinutes: 6,
    imageUrl,
    imageAttribution: selectedTopic.imageAttribution ?? "Photo via Wikimedia Commons (open license)",
    sections: selectedTopic.sections,
    cta: selectedTopic.cta,
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
