/**
 * PROFILE — single source of truth for all portfolio content.
 * Update your experience, skills and stats here; the page renders from this.
 *
 * NOTE: years of experience is NOT stored here — it is computed from
 * `careerStart` (first role per CV) so it never goes stale.
 */
const PROFILE = {
  name: "Atif Khan",
  title: "Staff Fullstack Engineer",
  email: "atifkhan161@gmail.com",
  location: "Pune, India",
  github: "https://github.com/atifkhan161",
  linkedin: "https://www.linkedin.com/in/atifkhan161/",
  sourceUrl: "https://github.com/atifkhan161/atifkhan161.github.io",
  resumeUrl: "cv/atif_cv.pdf",

  /** First day at first role (per CV) — drives the dynamic years-of-experience. */
  careerStart: "2013-04-01",

  /** Hero typewriter rotation. */
  typewriterRoles: [
    "Staff Fullstack Engineer",
    "Angular Specialist",
    "Go & Node.js Backend Dev",
    "SaaS Architect",
    "Figma-to-Pixel Perfectionist",
  ],

  /** Infinite tech strip (rendered twice for the seamless loop). */
  marqueeTech: [
    "Angular", "TypeScript", "Node.js", "Go Lang", ".NET", "Java",
    "MongoDB", "Cassandra", "MySQL", "Couchbase", "Swagger", "Backbone.js",
  ],

  /** About-section stat cards. `dynamic: "years"` is computed at runtime. */
  stats: [
    { dynamic: "years", label: "Years of experience" },
    { value: "5", label: "Companies, 3 product-led" },
    { value: "6×", label: "Faster adapter onboarding" },
    { value: "4", label: "Backend languages" },
  ],

  /** Skills bento grid. `span: 2` tiles are double-width; `featured` chips highlight. */
  skillGroups: [
    {
      icon: "🎨", title: "Frontend", span: 2,
      featured: ["Angular (1.x → 16+)", "TypeScript"],
      chips: ["JavaScript", "HTML", "CSS / SCSS", "Backbone.js", "jQuery", "Figma → Pixel-perfect UI"],
      note: "High-fidelity designs turned into responsive, accessible interfaces.",
    },
    {
      icon: "⚙️", title: "Backend", span: 2,
      featured: ["Go Lang", "Node.js"],
      chips: ["ASP .NET", "C#", "Java", "VB.Net", "REST APIs", "Swagger v2.0"],
      note: "Scalable, maintainable services with typed data models end-to-end.",
    },
    {
      icon: "🗄️", title: "Databases", span: 2,
      featured: [],
      chips: ["MySQL", "MongoDB", "Cassandra", "Couchbase", "SQL Server"],
      note: "Relational & NoSQL — schema design, migrations, and data security.",
    },
    {
      icon: "🛡️", title: "Security", span: 1,
      note: "CSRF attack prevention, XFS with nonce tokens, and secure data-management systems for enterprise wallets.",
    },
    {
      icon: "🚀", title: "Impact", span: 1,
      note: "Cut adapter onboarding from 6 months → a few weeks; onboarded SAP HANA, MySQL, MariaDB & CockroachDB in record time.",
    },
  ],
};

/** Work history, newest first. `points` may contain inline <strong> markup. */
PROFILE.experience = [
  {
    role: "Staff Software Engineer",
    company: "Cohesity",
    url: "https://www.cohesity.com/",
    period: "May 2019 – Present",
    location: "Pune, India",
    points: [
      "Spearheaded the <strong>Universal Data Adapters framework</strong>, reducing adapter onboarding time from <strong>6 months to a few weeks</strong>.",
      "Onboarded <strong>SAP HANA, MySQL, MariaDB, and CockroachDB</strong> adapters in record time.",
      "Key contributor to frontend stacks for <strong>Salesforce, Cassandra, Couchbase, MongoDB, and Office 365</strong> adapters using <strong>Angular 15+</strong>.",
      "Engineered RESTful API endpoints with <strong>Go Lang</strong>, enhancing client-server data transfer efficiency.",
      "Authored API documentation in <strong>Swagger v2.0</strong>, enabling consistent data models in <strong>TypeScript and Go</strong>.",
      "Delivered a full-stack <strong>.NET + Angular</strong> application for data security and management systems.",
    ],
  },
  {
    role: "Fullstack Developer",
    company: "Imanis Data",
    url: "https://www.linkedin.com/company/imanisdata/",
    period: "Sep 2017 – May 2019",
    location: "Pune, India",
    points: [
      "Modernized UI projects from <strong>Backbone.js/Java</strong> to <strong>Angular/.NET</strong>.",
      "Pivotal in developing REST servers in <strong>Java</strong> and SPAs in <strong>Backbone.js</strong>.",
    ],
  },
  {
    role: "Senior Software Developer",
    company: "Altimetrik",
    url: "https://www.altimetrik.com/",
    period: "Aug 2016 – Sep 2017",
    location: "Pune, India",
    points: [
      "Developed the frontend stack for the <strong>MasterPass wallet (MasterCard)</strong> using Angular.js.",
      "Key developer for <strong>phoenix-core</strong> components reused across multiple wallets.",
      "Built core frameworks for custom wallets with <strong>CSRF prevention</strong> and <strong>XFS + nonce token</strong> security.",
    ],
  },
  {
    role: "Senior Software Developer",
    company: "Persistent Systems",
    url: "https://www.persistent.com/",
    period: "Oct 2015 – Aug 2016",
    location: "Nagpur, India",
    points: [
      "Developed the frontend stack for <strong>EngageMD</strong> using AngularJS.",
      "Led modernization of EngageMD from <strong>PHP/jQuery</strong> to an SPA with <strong>AngularJS 1.x</strong>.",
      "Built modules to manage and track patient journeys, <strong>boosting conversion rates and practice revenue</strong>.",
      "Created a reusable AngularJS service using <strong>prototype inheritance</strong> for all AJAX calls — adopted by other Persistent projects.",
    ],
  },
  {
    role: "Software Developer",
    company: "E-Forum Systems Pvt Ltd",
    url: null,
    period: "Apr 2013 – Oct 2015",
    location: "Nagpur, India",
    points: [
      "Full-stack solution for the <strong>Payroll Budgeting module</strong> in PowerPlan ERP using <strong>ASP.NET, jQuery, AngularJS, C#</strong>.",
      "Created <strong>PowerLink</strong> service utility for data transfer between text/CSV files and SQL Server.",
      "Modernized legacy <strong>VB.NET</strong> desktop software to web, later advancing to an SPA with <strong>AngularJS and Bootstrap</strong>.",
    ],
  },
];
