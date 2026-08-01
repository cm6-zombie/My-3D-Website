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
  fallbackProjects: [
    {title:"QKart QA",date:"July 2025 - Present",description:"End-to-end Selenium and TestNG automation for registration, login, product search, cart and checkout flows.",skills:["Java","Selenium","TestNG","XPath","Apache POI","POM","Gradle"]},
    {title:"Flipkart Automation",date:"July 2025 - Present",description:"Automated product search, filtering, sorting and validation of ratings, reviews, discounts and image URLs.",skills:["Java","Selenium","TestNG","XPath","POM","Gradle"]},
    {title:"Project Tango AC Buenos Aires",date:"PwC",description:"Validated and reconciled 2,500+ learner accounts during a large-scale LMS migration while preserving learning history.",skills:["Data validation","LMS migration","Reconciliation","Audit"]},
    {title:"New LMS Application Onboarding",date:"PwC",description:"Supported end-to-end LMS migration and integrations with HRMS, Active Directory and content providers.",skills:["LMS","HRMS","Incident management","SOPs"]}
  ]
};

export const assistantKnowledge = [
  `Mainak Chandra is a ${profile.title}.`, profile.summary,
  `Technical skills: ${profile.technicalSkills.join(", ")}.`,
  `Soft skills: ${profile.softSkills.join(", ")}.`,
  `Leadership skills: ${profile.leadershipSkills.join(", ")}.`,
  ...profile.experience.flatMap(e => [`${e.role} at ${e.company}, ${e.period}.`, ...e.points]),
  ...profile.fallbackProjects.map(p => `${p.title}: ${p.description} Skills: ${p.skills.join(", ")}.`)
];
