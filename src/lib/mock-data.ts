import type {
  Project,
  TranscriptSegment,
  Highlight,
  GeneratedContent,
  ProjectResult,
} from "@/types";

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    user_id: "demo-user",
    title: "How to Build a Personal Brand in the MENA Region",
    sourceType: "youtube",
    sourceUrl: "https://youtube.com/watch?v=example1",
    status: "completed",
    createdAt: "2026-04-14T10:30:00Z",
    updatedAt: "2026-04-14T10:30:00Z",
  },
  {
    id: "proj-2",
    user_id: "demo-user",
    title: "Digital Marketing Trends 2026 - Arabic Market",
    sourceType: "youtube",
    sourceUrl: "https://youtube.com/watch?v=example2",
    status: "completed",
    createdAt: "2026-04-13T14:20:00Z",
    updatedAt: "2026-04-13T14:20:00Z",
  },
  {
    id: "proj-3",
    user_id: "demo-user",
    title: "Coaching Business Growth Strategies",
    sourceType: "upload",
    status: "processing",
    createdAt: "2026-04-15T08:00:00Z",
    updatedAt: "2026-04-15T08:00:00Z",
  },
];

export const mockTranscript: TranscriptSegment[] = [
  { start: 0, end: 5, text: "Welcome everyone. Today we're talking about building a personal brand in the MENA region." },
  { start: 5, end: 12, text: "The first thing you need to understand is that authenticity matters more than ever in our market." },
  { start: 12, end: 20, text: "Whether you're creating content in Arabic, French, or English, your audience can feel when you're being genuine." },
  { start: 20, end: 28, text: "I've worked with creators across Tunisia, Morocco, Egypt, and the Gulf states. The common thread is always the same." },
  { start: 28, end: 35, text: "People connect with stories. Not with polished corporate messaging, but with real human experiences." },
  { start: 35, end: 45, text: "Let me share three frameworks that have consistently worked for MENA creators building their presence online." },
  { start: 45, end: 55, text: "Framework number one: The Cultural Bridge. This is about positioning yourself at the intersection of local and global." },
  { start: 55, end: 65, text: "You speak the language of international business, but you understand the nuances of our culture. That's your superpower." },
  { start: 65, end: 75, text: "Framework number two: Consistency Over Perfection. I see too many creators waiting for the perfect video or the perfect post." },
  { start: 75, end: 85, text: "The algorithm rewards consistency. Post three times a week minimum. Your first 100 pieces of content are just practice." },
  { start: 85, end: 95, text: "Framework three: Community First. Build your community before you build your product. Engage with comments, DMs, and collaborations." },
  { start: 95, end: 105, text: "The creators who are winning in MENA right now are the ones who treat their audience like a community, not a customer list." },
  { start: 105, end: 115, text: "Now let's talk about platforms. LinkedIn is massively underrated in the Arab world right now." },
  { start: 115, end: 125, text: "The organic reach on LinkedIn in MENA markets is incredible. A well-crafted post can reach 50,000 people easily." },
  { start: 125, end: 135, text: "X, formerly Twitter, remains strong for thought leadership, especially in the Gulf and North Africa." },
  { start: 135, end: 145, text: "To wrap up: be authentic, be consistent, and build community. That's the formula for personal branding in MENA." },
];

export const mockHighlights: Highlight[] = [
  {
    id: "hl-1",
    title: "Authenticity in MENA Content Creation",
    startTime: 5,
    endTime: 20,
    summary: "Authenticity is the key differentiator for MENA creators across Arabic, French, and English content.",
    tags: ["authenticity", "multilingual", "MENA"],
  },
  {
    id: "hl-2",
    title: "The Cultural Bridge Framework",
    startTime: 45,
    endTime: 65,
    summary: "Positioning at the intersection of local culture and global business is a powerful strategy for MENA creators.",
    tags: ["framework", "strategy", "cultural"],
  },
  {
    id: "hl-3",
    title: "Consistency Over Perfection",
    startTime: 65,
    endTime: 85,
    summary: "Post at least three times per week. Your first 100 pieces of content are practice.",
    tags: ["consistency", "content strategy", "growth"],
  },
  {
    id: "hl-4",
    title: "LinkedIn's Untapped Potential in MENA",
    startTime: 105,
    endTime: 125,
    summary: "LinkedIn organic reach in MENA markets is exceptionally high, with posts easily reaching 50K+ people.",
    tags: ["LinkedIn", "organic reach", "opportunity"],
  },
];

export const mockGeneratedContent: GeneratedContent = {
  linkedinPost: `Building a personal brand in the MENA region requires a different playbook.

After working with creators across Tunisia, Morocco, Egypt, and the Gulf, I've identified 3 frameworks that consistently deliver results:

1. The Cultural Bridge
Position yourself at the intersection of local culture and global business. You speak international, but you understand the nuances. That's your edge.

2. Consistency Over Perfection
Stop waiting for the perfect post. The algorithm rewards showing up. 3x per week minimum. Your first 100 posts are practice.

3. Community First
Build community before product. Engage with every comment and DM. The winners in MENA treat their audience like a community, not a customer list.

The opportunity is massive. LinkedIn organic reach in MENA is unlike anything in Western markets right now. A well-crafted post can reach 50,000+ people.

What's your experience building a brand in the MENA market? I'd love to hear your story.

#PersonalBranding #MENA #ContentCreation #DigitalMarketing #Tunisia #Morocco #Egypt`,

  xThread: [
    "I've worked with creators across MENA for 3 years. Here are the 3 frameworks that actually work for building a personal brand in the region. A thread:",
    "1/ The Cultural Bridge\n\nPosition yourself at the intersection of local and global. You understand Western business language AND local cultural nuances. That combination is rare and valuable.",
    "2/ Consistency Over Perfection\n\nStop waiting for the perfect video. Post 3x per week minimum. Your first 100 pieces of content are just practice. The algorithm rewards showing up.",
    "3/ Community First\n\nBuild your community before your product. Reply to every comment. Engage in DMs. The creators winning in MENA treat their audience like community, not customers.",
    "Bonus insight: LinkedIn is massively underrated in MENA.\n\nOrganic reach is 10x what you'd get in Western markets. A single well-crafted post can reach 50K+ people. The window is now.",
    "The formula is simple:\n\n- Be authentic\n- Be consistent\n- Build community\n\nThe MENA market rewards creators who show up with real value. Start today.",
  ],

  blogOutline: [
    {
      heading: "Why Personal Branding Matters in the MENA Region",
      points: [
        "The growing creator economy in North Africa and the Gulf",
        "Multilingual advantage: Arabic, French, and English positioning",
        "Cultural authenticity as a competitive edge",
      ],
    },
    {
      heading: "Framework 1: The Cultural Bridge",
      points: [
        "Bridging local culture with global business language",
        "Examples of successful MENA creators using this approach",
        "Practical steps to find your unique intersection",
      ],
    },
    {
      heading: "Framework 2: Consistency Over Perfection",
      points: [
        "Why the algorithm favors consistent creators",
        "The 3x per week minimum posting cadence",
        "Your first 100 posts are practice - embrace the learning curve",
      ],
    },
    {
      heading: "Framework 3: Community First",
      points: [
        "Building community before building products",
        "Engagement strategies for MENA audiences",
        "Converting community into sustainable business",
      ],
    },
    {
      heading: "Platform-Specific Strategies for MENA",
      points: [
        "LinkedIn's untapped organic reach in Arab markets",
        "X/Twitter for thought leadership in the Gulf and North Africa",
        "Cross-platform content repurposing strategies",
      ],
    },
  ],

  blogDraft: `# How to Build a Personal Brand in the MENA Region: 3 Proven Frameworks

The creator economy in the MENA region is exploding. From Tunis to Dubai, from Casablanca to Cairo, a new generation of creators, coaches, and agencies is reshaping how brands communicate with their audiences.

But building a personal brand in this region requires a different playbook than what works in Western markets. After working with dozens of creators across North Africa and the Gulf, I've distilled the approach into three frameworks that consistently deliver results.

## Framework 1: The Cultural Bridge

The most successful MENA creators share one trait: they position themselves at the intersection of local culture and global business.

They speak the language of international markets. They understand Western business concepts, marketing frameworks, and tech trends. But they also understand the cultural nuances that make our region unique - the importance of relationships, the role of family in business decisions, the communication styles that resonate.

This intersection is your superpower. Very few people can bridge both worlds authentically. If you can, you become indispensable.

## Framework 2: Consistency Over Perfection

This is where most MENA creators struggle. The desire for perfection - the perfect video, the perfect post, the perfect angle - becomes the enemy of progress.

The truth is simple: the algorithm rewards consistency. Whether you're on LinkedIn, X, Instagram, or YouTube, the platforms want creators who show up regularly.

My recommendation: post a minimum of three times per week. And accept that your first 100 pieces of content are practice. They're not supposed to be masterpieces. They're supposed to help you find your voice.

## Framework 3: Community First

Don't build a product and then look for customers. Build a community first, and the product opportunities will reveal themselves.

This means engaging with every comment on your posts. Responding to DMs. Collaborating with other creators. Showing up in other people's communities before asking them to join yours.

The creators who are winning in MENA right now are the ones who treat their audience like a community, not a customer list. The trust and loyalty this builds is incomparable.

## The Platform Opportunity

A word about LinkedIn: it is massively underrated in the Arab world right now. The organic reach available to MENA creators on LinkedIn is extraordinary. A well-crafted post can easily reach 50,000 people without any paid promotion.

X remains a powerful platform for thought leadership, particularly in the Gulf states and North Africa. The real-time nature of the platform suits the fast-moving conversations happening in our markets.

## The Bottom Line

Building a personal brand in the MENA region comes down to three things: authenticity, consistency, and community. Master these three frameworks, and you'll be ahead of 95% of creators in the market.

The window of opportunity is open right now. The question is: are you going to step through it?`,

  hooks: [
    "I've helped 50+ MENA creators build their brand. Here's what actually works.",
    "Most advice about personal branding doesn't apply in the Arab world. Here's why.",
    "LinkedIn in MENA is a goldmine right now. Let me explain.",
    "Stop waiting for the perfect post. The algorithm doesn't care about perfect.",
    "The creators winning in MENA all do this one thing differently.",
    "Your bilingual ability is a business superpower. Here's how to use it.",
  ],

  hashtags: [
    "#PersonalBranding",
    "#MENA",
    "#ContentCreation",
    "#DigitalMarketing",
    "#Tunisia",
    "#Morocco",
    "#Egypt",
    "#ArabCreators",
    "#LinkedInMENA",
    "#ContentStrategy",
    "#CreatorEconomy",
    "#NorthAfrica",
  ],

  captions: [
    "3 frameworks for building your brand in MENA. Framework 1 changed everything for me.",
    "Authenticity + Consistency + Community = The MENA creator formula",
    "LinkedIn organic reach in MENA is 10x Western markets. Here's how to capitalize.",
    "Your first 100 posts are practice. Stop waiting for perfection and start creating.",
    "The Cultural Bridge: when your bilingual ability becomes your biggest business asset.",
  ],
};

export function getMockProjectResult(projectId: string): ProjectResult {
  const project = mockProjects.find((p) => p.id === projectId) ?? {
    ...mockProjects[0],
    id: projectId,
  };

  return {
    project,
    transcript: mockTranscript,
    highlights: mockHighlights,
    content: mockGeneratedContent,
  };
}
