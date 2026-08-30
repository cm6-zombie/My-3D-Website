export const profile = {
  name: "Mainak Chandra",
  title: "Engineering Professional | Test Automation | Production Reliability",
  summary: "Engineering professional with 7 years of experience across test automation, production reliability, cloud/Linux systems, and release validation. Hands-on with Java, Python, Selenium WebDriver, TestNG, SQL, APIs, and debugging. At PwC, validated 350,000+ learner accounts and built AI automation that reduced manual reporting effort by up to 95%. Built production-grade automation and software projects spanning semantic search, API integrations, CI/CD, and web engineering.",
  email: "subham.cm6@gmail.com",
  location: "Kolkata, India",
  links: {
    github: "https://github.com/cm6-zombie",
    leetcode: "https://leetcode.com/u/mainak000/",
    crio: "https://www.crio.do/learn/portfolio/subham-cm6/",
    resume: "/Mainak-Chandra-Resume.pdf"
  },
  technicalSkills: ["Java","Python","TypeScript","SQL / T-SQL","Selenium WebDriver","TestNG","pytest","Page Object Model (POM)","Apache POI","Data-Driven Testing","XPath","Assertions","Explicit Waits","Test Listeners","REST APIs","Next.js API Routes","JSON","API Integration","Data Validation","Error Handling","Data Normalization","Caching","Fallback Strategies","Sentence Transformers","Text Embeddings","Semantic Search","Cosine Similarity","Ranking & Scoring Algorithms","Resume Parsing","MySQL","Microsoft SQL Server","AWS EC2","IAM","CloudWatch","S3","VPC","Linux","Debugging","Root Cause Analysis (RCA)","Production Monitoring","Release Validation","Next.js","React","Microsoft Copilot Studio","Git","GitHub Actions","Gradle","OOP","Agile / Scrum","STLC"],
  softSkills: ["Cross-functional collaboration","Stakeholder coordination","Structured problem solving","Technical documentation","Risk assessment","Audit-ready execution"],
  leadershipSkills: ["Pre-launch validation & go-live assurance","Large-scale migration validation","RCA leadership","Cross-functional issue resolution","Workflow standardisation","AI automation delivery"],
  certifications: [
    {type:"Education",title:"B.Tech in Electronics and Communication Engineering",issuer:"National Institute of Technology, Arunachal Pradesh",period:"2015 - 2019 | CGPA 7.32"}
  ],
  experience: [
    {
      company:"PricewaterhouseCoopers (PwC) Services LLP",
      role:"Senior Associate",
      period:"July 2021 - Present",
      points:[
        "Led pre-launch validation, risk assessment, and go-live assurance for global LMS implementations and integrations spanning HRMS, Active Directory, and third-party content providers; coordinated engineering, integration, and business stakeholders across release cycles.",
        "Validated and reconciled 350,000+ learner accounts during a large-scale LMS migration, applying completion-precedence rules and migrating exclusive training records to preserve learning-history continuity.",
        "Investigated complex multi-platform production issues through structured RCA and SQL-based troubleshooting; drove cross-functional resolution and recurrence-reduction actions while maintaining SLA and audit requirements.",
        "Built AI agents in Microsoft Copilot Studio to automate ServiceNow ticket trend analysis, reducing manual reporting effort by up to 95% and producing KPI and trend outputs for monthly and quarterly reviews.",
        "Standardized support workflows, SOPs, runbooks, and operational procedures to improve repeatability across incident, change, problem, release, and go-live activities."
      ]
    },
    {
      company:"Tata Consultancy Services (TCS)",
      role:"Systems Engineer",
      period:"June 2019 - July 2021",
      points:[
        "Managed Linux systems on AWS EC2 across RHEL, CentOS, and Ubuntu; monitored CPU, memory, disk, CloudWatch metrics, and Linux system logs to diagnose reliability and performance issues.",
        "Automated patch management and infrastructure provisioning using AWS Systems Manager Patch Manager, Ansible, Terraform, and CloudFormation.",
        "Configured IAM, security groups, firewalls, VPC/networking, storage, and backup/disaster-recovery controls using AWS Backup, EBS snapshots, and Route 53 failover."
      ]
    }
  ],
  crioFallbackProjects: [
    {
      title:"QTrip QA",
      date:"Jul 2026",
      category:"Professional Project",
      featured:true,
      description:"Automated the QTrip travel application using a maintainable Selenium and TestNG framework. Designed and automated key user flows with Page Object Model and Page Factory, used Apache POI for data-driven testing, grouped TestNG test cases, implemented reusable wrapper methods, and generated customised Extent Reports.",
      scope:["Automated key QTrip user journeys end to end.","Implemented Page Object Model and Page Factory components.","Used Apache POI for data-driven testing.","Added reusable wrapper methods, TestNG grouping and customised Extent Reports."],
      skills:["Java","Selenium WebDriver","TestNG","Page Object Model","Page Factory","XPath","Apache POI","Data-Driven Testing","Extent Reports","Wrapper Methods"]
    },
    {
      title:"YouTube Automation",
      date:"May - Jun 2026",
      category:"Professional Project",
      featured:true,
      description:"Automated YouTube browsing and video-validation workflows and asserted visible properties such as views, likes and related video information using stable Selenium locators and TestNG validations.",
      scope:["Automated YouTube browsing workflows.","Validated video metadata, views, likes and related video information.","Used stable locators, waits and TestNG assertions."],
      skills:["Java","Selenium WebDriver","TestNG","XPath","Assertions","Dynamic Element Handling"]
    },
    {
      title:"LeetCode Automation",
      date:"May - Jun 2026",
      category:"Professional Project",
      featured:true,
      description:"Automated the LeetCode problems page to validate the latest problem entries and verify that solution submission is blocked for users who are not signed in.",
      scope:["Validated the latest problem entries on the LeetCode problems page.","Verified unauthenticated users cannot submit solutions.","Implemented dynamic XPath, explicit waits and assertions."],
      skills:["Java","Selenium WebDriver","Dynamic XPath","Explicit Waits","Assertions","TestNG"]
    },
    {
      title:"Flipkart Automation",
      date:"Jul 2025 - Present",
      category:"Professional Project",
      featured:true,
      description:"Developed an end-to-end automation framework for Flipkart covering product search, filtering, sorting and validation of titles, ratings, reviews, discounts and image URLs using robust XPath locators and explicit waits.",
      scope:["Automated product search, filtering and sorting.","Extracted and validated ratings, reviews, discounts, titles and image URLs.","Used explicit waits, assertions, wrapper methods and dynamic element handling."],
      skills:["Java","Selenium WebDriver","TestNG","XPath","Page Object Model","WebDriverManager","Gradle","Assertions","Explicit Waits","Wrapper Methods"]
    },
    {
      title:"Google Form Automation",
      date:"Crio Project",
      category:"Professional Project",
      description:"This project involves automating a Google Form end to end with a variety of inputs such as checkboxes, dropdowns, radio buttons, text fields, date fields and time fields.",
      scope:["Navigated to the Google Form.","Filled text in a text box.","Used date-time operations to enter a dynamic value in a text area.","Selected experience from a radio-button input.","Selected skills from a checklist.","Selected a value from a dropdown menu.","Calculated the date dynamically.","Provided the time dynamically.","Submitted the form and printed the final confirmation message."],
      skills:["Selenium WebDriver","XPath","TestNG","Java","Dynamic Date and Time Handling"]
    },
    {
      title:"Video Sharing Platform Automation (XFlix)",
      date:"Feb 2026",
      category:"Professional Project",
      description:"Automated the XFlix video-sharing platform to verify URLs, retrieve uploaded-video details, validate video-upload functionality and check data persistence.",
      scope:["Verified the XFlix homepage URL.","Verified search functionality.","Verified filter functionality.","Verified video-upload functionality.","Verified like-counter functionality.","Checked persistence of uploaded-video data."],
      skills:["Selenium WebDriver","Java","XPath","TestNG"]
    },
    {
      title:"Wikipedia Automation",
      date:"Crio Project",
      category:"Professional Project",
      description:"Automated Wikipedia search functionality to validate factual data, including founders of organisations, and to verify core navigation and hyperlink behaviour.",
      scope:["Verified the Wikipedia homepage URL.","Verified the Wikipedia header and footer.","Verified search functionality.","Validated hyperlink functionality.","Verified the About Wikipedia link and URL in the dropdown."],
      skills:["Selenium WebDriver","Java","XPath","Window Handling"]
    },
    {
      title:"Amazon Store Automation",
      date:"Dec 2025",
      category:"Professional Project",
      featured:true,
      description:"Automated the Amazon store search feature and validated the resulting data. Navigation-menu features and footer elements were also verified.",
      scope:["Verified the homepage URL.","Verified search functionality.","Verified the navigation menu."],
      skills:["Selenium WebDriver","Java","XPath","TestNG"]
    },
    {
      title:"XQuiz",
      date:"Crio Project",
      category:"Mini Project",
      description:"Built a command-line quiz application in Java using object-oriented programming. The application displays a quiz, accepts user choices, evaluates the answers and provides a score.",
      scope:["Created Java classes using OOP concepts.","Implemented quiz and question display.","Implemented functionality for users to attempt the quiz.","Evaluated answers and calculated the score.","Performed unit tests to verify correctness."],
      skills:["Java","Object-Oriented Programming","Unit Testing"]
    },
    {
      title:"QCalc",
      date:"Oct 2025",
      category:"Mini Project",
      featured:true,
      description:"Built a simple calculator in Java using Gradle, implemented arithmetic operations, fixed compilation and logical issues, and verified the application with unit tests.",
      scope:["Generated a Java Gradle project using the command line.","Implemented basic arithmetic operations.","Ran unit tests to verify functionality.","Fixed syntax, import and compilation errors.","Resolved logical issues and corrected method definitions based on required data types.","Executed unit tests after debugging."],
      skills:["Java","Gradle","Unit Testing","Debugging"]
    }
  ],
  fallbackProjects: [
    {
      title:"Semantic Job Matcher",
      date:"2026",
      category:"Software Engineering Project",
      featured:true,
      githubUrl:"https://github.com/cm6-zombie/semantic-job-matcher",
      description:"Built a multi-source Python job aggregation and semantic-ranking pipeline integrating public ATS APIs, official company career portals, and Gmail job alerts into a standardized job schema.",
      scope:[
        "Integrated public ATS APIs, official company career portals, and Gmail job alerts into a standardized job schema.",
        "Engineered fault-isolated source processing and cross-source deduplication so individual source failures do not disrupt the pipeline.",
        "Implemented semantic job ranking with Sentence Transformers and cosine similarity, using weighted scoring across job title, skills, and experience requirements.",
        "Automated scheduled matching runs and batched Gmail notifications with persistent notification state; containerized the application with Docker and added pytest coverage."
      ],
      skills:["Python","Sentence Transformers","Text Embeddings","Semantic Search","Cosine Similarity","REST APIs","Gmail Integration","Data Normalization","Deduplication","Docker","pytest"]
    },
    {
      title:"3D Dynamic Portfolio Platform",
      date:"2026",
      category:"Software Engineering Project",
      featured:true,
      demoUrl:"https://mainak-portfolio-chi.vercel.app/",
      githubUrl:"https://github.com/cm6-zombie/My-3D-Website",
      description:"Built and deployed a production-grade interactive portfolio using Next.js 14, TypeScript, React, React Three Fiber/Three.js, Framer Motion, and Vercel, with live developer-data integrations and graceful fallbacks.",
      scope:[
        "Built a responsive interactive 3D experience with React Three Fiber/Three.js and Framer Motion.",
        "Implemented SEO metadata, analytics, and automated Vercel redeployment.",
        "Designed server-side API routes to synchronize GitHub activity, LeetCode statistics, and Crio projects with caching, validation, deduplication, and fallback handling.",
        "Developed a resume-grounded assistant using local retrieval with optional OpenAI-backed responses and verified local fallback context."
      ],
      skills:["Next.js 14","TypeScript","React","React Three Fiber","Three.js","Framer Motion","Vercel","REST APIs","Caching","Data Validation","Deduplication","OpenAI API","SEO","Analytics"]
    },
    {
      title:"QKart QA Automation",
      date:"2025 - Present",
      category:"QA Automation Project",
      featured:true,
      description:"Built an end-to-end Java/Selenium/TestNG automation framework for the QKart e-commerce application covering registration, login, product search, cart, and checkout workflows.",
      scope:[
        "Automated registration, login, product search, cart, and checkout flows using Selenium WebDriver and TestNG.",
        "Implemented reusable Page Object Model components, dynamic XPath, and explicit waits.",
        "Added Apache POI data-driven testing, parameterization, grouping, assertions, and listener-based screenshots for failure diagnosis."
      ],
      skills:["Java","Selenium WebDriver","TestNG","Page Object Model (POM)","Dynamic XPath","Explicit Waits","Apache POI","Data-Driven Testing","Assertions","Test Listeners","Gradle"]
    },
    {title:"Project Tango AC Buenos Aires",date:"PwC",category:"Professional Project",description:"Validated and reconciled learner accounts during a large-scale LMS migration while preserving learning history and progress.",scope:["Applied completion-precedence rules during learner-account reconciliation.","Migrated exclusive training records to preserve learning-history continuity."],skills:["Data Validation","LMS Migration","Reconciliation","Audit"]},
    {title:"New LMS Application Onboarding",date:"PwC",category:"Professional Project",description:"Managed operational support for LMS data migration and integration with HRMS, Active Directory and third-party content providers.",scope:["Coordinated user-record and learning-history migration.","Supported integrations with HRMS, Active Directory and third-party content providers.","Maintained runbooks, SOPs and knowledge articles while driving incident escalation and compliance."],skills:["LMS","HRMS","Incident Management","SOPs","Data Migration"]}
  ]
};

export const assistantKnowledge = [
  `Mainak Chandra is a ${profile.title}.`, profile.summary,
  `Technical skills: ${profile.technicalSkills.join(", ")}.`,
  `Soft skills: ${profile.softSkills.join(", ")}.`,
  `Leadership skills: ${profile.leadershipSkills.join(", ")}.`,
  ...profile.experience.flatMap(e => [`${e.role} at ${e.company}, ${e.period}.`, ...e.points]),
  ...[...profile.crioFallbackProjects, ...profile.fallbackProjects].map(p => `${p.title}: ${p.description} Skills: ${p.skills.join(", ")}.`)
];
