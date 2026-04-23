import pfp from "./assets/pfp.jpeg";
import sclearn from "./assets/scikit-learn.png";
import tensorflow from "./assets/tensorflow.png"; 

import myNewsWire_thumbnail from "./assets/projectThumbnails/mynewswirethumbnail.jpg"; 
import RSDB_thumbnail from "./assets/projectThumbnails/RSDB.png"; 
import cse20_thumbnail from "./assets/projectThumbnails/cse20thumbnail.gif"; 
import cogs107a_thumbnail from "./assets/projectThumbnails/cogs107Athumbnail.gif";
import cse150b_thumbnail from "./assets/projectThumbnails/cse150bthumbnail.jpg"; 
import howTheyVibe_thumbnail from "./assets/projectThumbnails/howTheyVibe_thumbnail.gif"; 
import outageAnalysis_thumbnail from "./assets/projectThumbnails/outageAnalysis_thumbnail.gif"; 
import mit_1402_thumbnail from "./assets/projectThumbnails/mit_1402_thumbnail.png"; 
import agntcity_thumbnail from "./assets/projectThumbnails/agntcity_thumbnail.gif"; 
import solarify_thumbnail from "./assets/projectThumbnails/solarify_thumbnail.gif"; 
import candles_thumbnail from "./assets/projectThumbnails/candles_thumbnail.gif"; 

export {pfp}; 

export const latestUpdate = {
  date: "Apr 23, 2026",
  text: "Added a “Latest update” section on the homepage.",
};

export const teaching_experiences = [
  {
    institution: "Halıcıoğlu Data Science Institute",
    role: "Instructional Assistant",
    period: "2024 - Ongoing",
    courses: [
      {
        
          name: "DSC 10",
          details: [
            "Supported 200+ students in learning core data science techniques including querying, grouping, and statistical analysis",
            "Proctored and beta tested exams to ensure quality assessment materials",
            "Hosted weekly office hours and review sessions covering key topics like data visualization, sampling, and hypothesis testing",
            "Contributed to course-specific BabyPandas Documentation (https://dsc-courses.github.io/bpd-reference/) with Docusaurus."
          ]
        
      },
      {
        name: "DSC 40A",
        details: [
          "Supported 200+ students in understanding core theoretical concepts through interactive groupwork and weekly office hours",
          "Conducted review sessions for complex mathematical concepts like Gradient Descent, Linear Algebra, and Bayes' Theorem",
          "Assisted in developing and reviewing course materials for topics including Multiple Linear Regression, Feature Engineering, and Naïve Bayes"
        ]
      }
    ]
  },
  {
    institution: "CodePath",
    role: "Tech Fellow",
    period: "2023 - Ongoing",
    courses: [
        {
          name: "IOS 101: Intro to iOS Development",
          details: [
            "Led comprehensive iOS development workshops for 200+ students, focusing on Swift programming and mobile app architecture",
            "Conducted systematic code reviews and debugging sessions to improve code quality and best practices",
          ]
        },
        {
          name: "TIPS 102 S4: Technical interview Prep",
          details: [
            "Ongoing!",
          ]
        },
      
    ]
  },
  {
    institution: "4S Foundation",
    role: "Mentor",
    period: "2022 - Ongoing",
    courses: [
      {
        name: "College essay preparation",
        details: [
          "Provided strategic guidance to students throughout the college application process, from financial aid applications to scholarship opportunities",
          "Conducted personalized mentoring sessions to refine compelling personal statements that effectively communicated students' academic and personal narratives"
        ]
      }
    ]
  },
];
export const general_stack = [
  { icon: "js", label: "JavaScript" },
  { icon: "c++", label: "C++" },
  { icon: "python", label: "Python" },
  { icon: "java", label: "Java" },
  { icon: "swift", label: "Swift" },
  { icon: "vim", label: "Vim" },
  { icon: "vscode", label: "VSCode" },
]
export const webdev_stack = [
  { icon: "reactjs", label: "ReactJS & React Native" },
  { icon: "tailwindcss", label: "TailwindCSS" },
  { icon: "postman", label: "Postman" },
  { icon: "typescript", label: "TypeScript" },
  { icon: "firebase", label: "Firebase" },
  { icon: "nodejs", label: "NodeJS" },
  { icon: "vitejs", label: "ViteJS" },
  { icon: "materialui", label: "Material UI" },
  { icon: "docusaurus", label: "Docusaurus" },
]
export const ml_stack = [
  { icon: "streamlit", label: "streamlit" },
  { icon: "pytorch", label: "pytorch" },
  { icon: sclearn, label: "sclearn" },
  { icon: tensorflow, label: "tensorflow"},
]
export const design_stack = [
  { icon: "figma", label: "figma" },
  { icon: "canva", label: "canva" },
]

export const projectsData = [
  {
    image: solarify_thumbnail, 
    name:"Solarify", 
    shortDescription:"Winnter Best Use of Databricks Challenge @ Datahack2026",
    link:"https://devpost.com/software/name-yqj3mw", 
    keywords:["Hackathon", "Front End", "ML"], 
    time: "SP 2025"
  },
  {
    image: agntcity_thumbnail,
    name: "AGNTCITY",
    shortDescription: "Winner of Multi-Agent Systems Challenge @ SanDHack2026",
    link: "https://devpost.com/software/agntcity", 
    keywords: ["Hackathon", "Front End", "ML"],
    time: "WI 2025"
  },
  {
    image: candles_thumbnail,
    name: "Candles",
    shortDescription: "Candles is an interactive map application where you can place emotional markers on a global map, each representing a feeling or experience to create a visual tapestry of emotions across the world.",
    link: "https://candles-auk.pages.dev/", 
    keywords: ["Front End", "Data Analysis", "Long Term Project"],
    time: "SP 2024 - Ongoing"
  },
  {
    image: mit_1402_thumbnail,
    name: "MIT 1402 Macroeconomics",
    shortDescription: "Class notes for MIT open courseware 1402 principles of macroeconomics",
    link: "https://rc-woshimao.notion.site/25b1b338692f80b89bfbef15f152c16e?v=25b1b338692f80dda09d000c0dec97e4", 
    keywords: ["Notes", "Coursework"],
    time: "SM 2025"
  },
  {
    image: outageAnalysis_thumbnail,
    name: "Electrical Infrastructure Resilience Analysis",
    shortDescription: "An analysis on how electric generation infrastructure and guel diversity influence grid resilience across U.S. states.",
    link: "https://rcwoshimao.github.io/infrastructure-resilience-analysis/", 
    keywords: ["ML", "Data Analysis"],
    time: "SP 2025"
  },
  {
    image: cse150b_thumbnail,
    name: "CSE 150B",
    shortDescription: "Introduction to Artificial Intelligence: Search and Reasoning",
    link: "https://rc-woshimao.notion.site/CSE-150B-notes-1d21b338692f80f984d7fd5925060d18",
    keywords: ["Notes", "ML", "Coursework"],
    time: "SP 2025"
  },
  {
      image: cse20_thumbnail,
      name: "CSE 20",
      shortDescription: "Discrete Mathematics",
      link: "/projects/cse20map",
      keywords: ["Coursework", "Concept Map", "Notes"],
      time: "SP 2023"
  },
  {
      image: "https://lh3.googleusercontent.com/iZwB2p3rX7D7h-4QWSmKXy-_4FBRVCB8A8vrGwQduZzqfU-1ZMewoumgw3HOTiOsrN3Ax_vnOuUGRFnWuIbGoOWpAnpCoxGqvxg",
      name: "CSE 101",
      shortDescription: "Design and Analysis of Algorithms",
      link: "/projects/cse101map",
      keywords: ["Coursework", "Concept Map", "Notes"],
      time: "FA 2024"
  },

  {
      image: cogs107a_thumbnail,
      name: "COGS 107A/B",
      shortDescription: "Neuroanatomy and Physiology/ Systems Neuroscience ",
      link: "https://www.canva.com/design/DAGbfErBzVw/fuuDI_q8lPQpraYUFEDCfw/view?utm_content=DAGbfErBzVw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h08dfbf0273",
      keywords: ["Coursework", "Concept Map", "NeuroSci", "Notes"],
      time: "WI 2025"
  },
  {
      image: "https://assets3.cbsnewsstatic.com/hub/i/2017/10/17/15e5a319-1728-4485-8516-3b1682feb51c/171016-nasa-gravitational-waves-promo.gif?v=9e5c48f1b04ac2a564e8a4c51250ac89",
      name: "SMASH-hack GW detector",
      shortDescription: "A machine learning hackathon that focuses on using various models to detect gravitational waves from abnormal activities in the universe.",
      link: "https://github.com/EliteApex/SMASH-hackathon?tab=readme-ov-file",
      keywords: ["Hackathon", "ML"],
      time: "WI 2025"
  },
  {
      image: RSDB_thumbnail,
      name: "Recommendation for Business owners (RSDB)",
      shortDescription: "A hybrid recommender system with collaborative filters and content-based filtering. The model uses features of locations, the interaction of location and user, and the temporal evolution of the interaction to predict a user's rating of a business.",
      link: "https://github.com/KevinBian107/RSDB", 
      keywords: ["ML", "Data Analysis"],
      time: "FA 2024"
  },
  {
      image: "https://camo.githubusercontent.com/8d3bc6e10c19d04d70ffa5682901e0b570c953125a4780b99702d4cd921e1485/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f31382f62312f37372f31386231373766363562643131313963653431313836643064303935393931302e676966",
      name: "Campus Coffee Space Utilization",
      shortDescription: "Cogs 13 final project. Study on Patterns in On-campus Coffee Shop: How Students Utilize the Space of Starbucks at UCSD Price Center.",
      link: "https://github.com/rcwoshimao/Campus-Coffee-Space-Utilization", 
      keywords: ["ML", "Data Analysis"],
      time: "WI 2025"
  },
  {
      image: "https://digiday.com/wp-content/uploads/sites/3/2021/11/ecommerce-changes-2.gif?w=1030&h=579&crop=1",
      name: "Sentiment-GDP analysis",
      shortDescription: "Cogs 108 final project. Analysis on how consumer sentiment evolved in response to economic shifts.",
      link: "https://github.com/rcwoshimao/sentiment-gdp-analysis", 
      keywords: ["ML", "Data Analysis"],
      time: "WI 2025"
  },
  {
    image: howTheyVibe_thumbnail,
    name: "Traction",
    shortDescription: "Hackathon project to measure the online reception to a new song by analyzing the sentiment using agentic AI conversations trained to simulate and reflect public online discourse.",
    link: "https://github.com/rcwoshimao/several-ducks-datahacks25",
    keywords: ["Hackathon", "Front End"],
    time: "SP 2025"
},
  {
      image: myNewsWire_thumbnail,
      name: "MyNewsWire",
      shortDescription: "My first ever hackathon project. I was invited to join by my dear friend Jacob.",
      link: "https://devpost.com/software/mynewswire-45dlzk", 
      keywords: ["Hackathon", "Front End"],
      time: "WI 2023"
  }, 

];

export const courses = [

  {
    name: "PHYS 5: Stars and Black Holes", 
    quarter: "22 FA", 
    status: "Enrolled", 
    gradingOption: "P/NP", 
    grade: "P",
    reason: "Hobby", 
    professor: "Quinn Konopacky", 
    oneLiner: "Polaris is 30 degrees above the Northern horizon.", 
    description: " I love looking up at stars. When I raise my head and check out the stuff above, I get some breathing room from all the depressing things that happens down here on the earth. Freshman year college, I have no idea what to take, since most CSE classes were hard to get in with no priority, so I chose this one. It taught me some basic knowledge of stars and galaxies, and I enjoy it fairly. My favorite memory for this class was an optional extra credit Planetarium Show. Me and several other students joined the staff in Price center east ball room in a doom that simulates stars, and we got to see the awfully beautiful night sky simulated for if there are no light polution in SD. The milky way was just above us. It was calming and fun."
  },
  {
    name: "Math 20B: Calculus/Science & Engineering", 
    quarter: "22 FA", 
    status: "Enrolled", 
    gradingOption: "Letter Grade", 
    grade: "A",
    reason: "Major Req", 
    professor: "David James Quarfoot", 
    oneLiner:"Most intimidating mario player in class.", 
    description: "My first quarter with my favorite math professor, what good times. This is one of the courses that, after going to lecture, I rarely had any questions, because all knowledge necessary to understand the material were all covered rigidly by his lecture slides and his top-tier manim visualization. I was very lucky to have him. (I audited Math 181A, twice, because of him- this is just how much I love his teaching style - he is *that* good! More about that in Math 181A section.)"
  },
  {
    name: "Math 20C: Calculus and Analytic Geometry for Science and Engineering | Math 20E: Vector Calculus", 
    quarter: "22 WI & 23 SP ", 
    status: "Enrolled", 
    gradingOption: "Letter Grade", 
    grade: "A",
    reason: "Major Req", 
    professor: "Quang Bach", 
    oneLiner:"I'm sorry, professor.",
    description: "I mentioned David Quarfoot as my favorite math professor at UCSD, but I also absolutely enjoy professor Bach in a completely different way- it'll be unfair to compare them. I followed through his Math 20 series to the end of my major requirements. After a while you start to get used to his accent, and you start to think in his accent. He also provides great visualizations hand drawn visualizations and very much cares about his students. It's always fun seeing him pop around our student arranged 20E discord server. However, there's one thing I regret. During one of the lectures, when I didn't understand a concept, I asked my friend Kevin, who is always kind enough to explain things to me - we were sitting in the first row, and as I got loud, Prof. Bach looked at us, and said, 'can you guys please quiet down?' at that moment, i felt utter embarrassment, both for that I was the one to blame for asking the question and I accidentally made my dear friend a co-culprit, and that I managed to disturb a class I really love. Prof. Bach won't be able to see this, but I am sorry, professor. I have changed and learn to be more respectful towards the course environment, and I hope future students continue to enjoy his teaching. He is the goat! "
  }, 
  {
    name: "Math 18: Linear Algebra", 
    quarter: "WI 23", 
    status: "Enrolled", 
    gradingOption: "Letter Grade", 
    grade: "B+",
    reason: "Major Req", 
    professor: "Todd Kemp",
    oneLiner:"Absolute fuckup.", 
    description: "I am here to talk about this course, not because I enjoyed it, but it's one of the biggest academic challenges I have faced, and that I absolutely fucked this course up. For some reason, linear algebra does not make sense to me- I struggled so much, tried so hard, but for some reason, it just does not, does not work. This is the course that devastated me.[talk more about it here]"
  }, 
  {
    name: "CSE 12: 	Basic Data Structure & Object Oriented Design", 
    quarter: "SP 2023", 
    status: "Enrolled", 
    gradingOption: "Letter Grade", 
    grade: "B-",
    reason: "Minor Req", 
    professor: "Greg Miranda",
    oneLiner:"Could have gotten that A+! Lesson learned from not keeping an eye on ddls.", 
    description: "Standard data structure course; Prof. Miranda made the course structure fairly straight forward and nice. But the moral of the story here is to not miss that deadline. In our course, we use a website called stepik, for weekly course readings and excercises worth 20% of our grade; I was decently fast at finishing them, and I was good at the course. However, at the end of the quarter, I fudged up and didn't submit the form that gives the link to my stepik account- and that 20% worth of grade? Gone. I achieved perfect grade on everything else, so this resulted in an 80%, which is still not the end of the world- and there's no use to look back. The only thing left now to do is to move forward and make sure I don't forget to fill things in first and formost! "
  }, 
  
  {
    name: "CAT 3: Culture, Art, and Technology 3 ", 
    quarter: "SP 2023", 
    status: "Enrolled", 
    gradingOption: "Letter Grade", 
    grade: "A",
    reason: "College Writing Course", 
    professor: "Romain Delaville, ZiYang Li",
    oneLiner:"My favorite CAT course!", 
    description: "CAT 3 was an interdisciplinary writing course that explored AI, labor, ethics, and social issues through group work and research. I still have such vivid memories of my amazing team, some of the team members I am still in contact with today (as of 2025). — we designed a concept app called Prospera, that focused on personalized financial planning and eliminating intergenerational poverty. Our section was super enjoyable, thanks to our wonderful TA, Ziyang Li, who always had great outfit choices and made thoughtful assignments that really helped with team bonding and motivation. It was such a fun project, and we all put in a lot of effort — and in the end, it really paid off. Definitely my favorite course in the entire CAT series. Good times!"
  }, 
/*
  {
    name: "CSE 150B", 
    quarter: "SP 25", 
    status: "Enrolled", 
    gradingOption: "Letter Grade", 
    grade: "N/A",
    reason: "Minor Req", 
    professor: "Gao Si Chun",
    oneLiner:"Sharpen your organic intelligence.", 
    description: "One of my favorite courses I took at UCSD. Good times spent with the professor in office hours, and I still remember whispering under my breath uncontrollably, "this is so cool!" Whenver a cool concept was introduced in class. I think I barely scratched the surface of the course content, and there's just so much more to explore."
  }, 

  {
    name: "", 
    quarter: "", 
    status: "", 
    gradingOption: "", 
    grade: "",
    reason: "", 
    professor: "",
    oneLiner:"", 
    description: ""
  }, */

]