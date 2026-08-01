export const profile = {
  name: "Mainak Chandra",
  title: "QA Automation Engineer | SDET | Operations Support",
  summary: "IT professional with 7 years of experience in IT Operations and Application Support across BFSI and HR-LMS domains. Proven track record in incident management, production monitoring, RCA, SQL-based troubleshooting, release validation, and stakeholder communication — consistently ensuring application availability and SLA compliance. Complementing this, I have built hands-on expertise in Java, Selenium WebDriver, TestNG, SQL, Git, Gradle, and Page Object Model (POM) framework development. Seeking a QA Automation Engineer, SDET, or Software Test Engineer role to leverage a unique blend of production support depth and automation skills to deliver reliable, high-quality software",
  email: "subham.cm6@gmail.com",
  location: "Kolkata, India",
  links: {
    github: "https://github.com/cm6-zombie",
    leetcode: "https://leetcode.com/u/mainak000/",
    crio: "https://www.crio.do/learn/portfolio/subham-cm6/",
    resume: "/Mainak-Chandra-Resume.pdf"
  },
  technicalSkills: ["Core Java","SQL / T-SQL","Selenium WebDriver","TestNG","Page Object Model","Apache POI","Git","Gradle","MySQL","Microsoft SQL Server","AWS EC2","IAM","CloudWatch","CloudFormation","Ansible","Terraform","ServiceNow","Linux","Agile / Scrum","STLC","RCA","Incident Management"],
  softSkills: ["Stakeholder communication","Cross-functional collaboration","Problem solving","Incident ownership","Documentation","Risk assessment"],
  leadershipSkills: ["Primary escalation ownership","Go-live assurance","RCA leadership","Audit coordination","Process standardisation","Continuous improvement"],
  certifications: [
    {type:"Certification",title:"Microsoft Azure AI Fundamentals (AI-900)",issuer:"Microsoft",period:"Certified"},
    {type:"Professional Learning",title:"Masters in QA Automation",issuer:"Crio.Do Fellowship",period:"July 2025 – Present"},
    {type:"Education",title:"B.Tech in Electronics and Communication Engineering",issuer:"National Institute of Technology, Arunachal Pradesh",period:"2015 – 2019 | CGPA 7.32"}
  ],
  experience: [
    {
      company:"PricewaterhouseCoopers (PwC) Services LLP",
      role:"Senior Associate – Senior Operations Support Engineer",
      period:"July 2021 – Present | 5 years",
      points:[
        "Owned enterprise-wide operational stability for PwC's global LMS network as primary escalation authority for complex, multi-platform incidents — consistently exceeding SLA commitments and sustaining near-zero downtime across regions and time zones.",
        "Built production-grade AI agents in Microsoft Co-pilot Studio to automate ServiceNow ticket trend analysis, cutting manual reporting effort by up to 90%; delivered executive-level monthly and quarterly performance reports translating raw data into KPI summaries, trend analysis, and improvement roadmaps.",
        "Led systematic RCA for chronic incidents, coordinating cross-functional teams to measurably reduce recurrence; managed incident, change, and problem responses with audit-ready rigor — partnering with internal and external audit teams to validate SOP and governance compliance.",
        "Served as senior technical liaison across engineering, integration, and business teams during full-cycle LMS implementations — owning pre-launch validation, risk assessment, and go-live assurance; drove continuous improvement by automating workflows and standardizing procedures to reduce operational toil."
      ]
    },
    {
      company:"Tata Consultancy Services (TCS)",
      role:"Systems Engineer",
      period:"June 2019 – July 2021 | 2 years",
      points:[
        "Managed and supported AWS EC2 instances running RHEL, CentOS, and Ubuntu, performing system health monitoring (CPU, memory, disk), performance tuning, and capacity planning.",
        "Automated patch management using AWS Systems Manager Patch Manager; implemented infrastructure automation using Ansible, Terraform, and CloudFormation.",
        "Configured IAM roles, security groups, Linux firewalls, and auditing via CloudTrail and auditd to ensure secure and compliant infrastructure.",
        "Designed and maintained backup and disaster recovery strategies using AWS Backup, EBS snapshots, and Route 53 failover.",
        "Configured VPCs, subnets, gateways, and managed storage services (EFS, NFS, S3); set up monitoring and logging with AWS CloudWatch and Linux system logs."
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
    {title:"QKart QA",date:"July 2025 - Present",category:"Professional Project",description:"Developed an end-to-end Selenium WebDriver automation framework for the QKart e-commerce application, covering registration, login, product search, cart management and checkout workflows.",scope:["Automated registration, login, product search, cart and checkout workflows.","Implemented dynamic XPath, waits, Apache POI data-driven testing, TestNG parameterisation, grouping and listeners.","Created reusable Page Object Model components and screenshot capture for debugging."],skills:["Java","Selenium WebDriver","TestNG","XPath","Apache POI","Page Object Model","Gradle"]},
    {title:"Project Tango AC Buenos Aires",date:"PwC",category:"Professional Project",description:"Validated and reconciled 2,500+ learner accounts during a large-scale LMS migration while preserving learning history and progress.",scope:["Merged victim and survivor learner profiles using completion precedence.","Migrated training records while ensuring zero progress loss and learning-history continuity."],skills:["Data Validation","LMS Migration","Reconciliation","Audit"]},
    {title:"New LMS Application Onboarding",date:"PwC",category:"Professional Project",description:"Managed operational support for LMS data migration and integration with HRMS, Active Directory and third-party content providers.",scope:["Coordinated user-record and learning-history migration.","Supported integrations with HRMS, Active Directory and content providers.","Maintained runbooks, SOPs and knowledge articles while driving incident escalation and compliance."],skills:["LMS","HRMS","Incident Management","SOPs","Data Migration"]}
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
