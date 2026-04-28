export const defaultPortfolioData = {
    navbar: {
        logo: "<Portfolio />",
        links: [
            { name: "Home", href: "#home" },
            { name: "Projects", href: "#professional-experience" },
            { name: "Skills", href: "#skills" },
            { name: "About", href: "#about" },
            { name: "Contact", href: "#contact" }
        ]
    },
    footer: {
        logo: "<Portfolio />",
        links: [
            { name: "Home", href: "#home" },
            { name: "Projects", href: "#professional-experience" },
            { name: "Skills", href: "#skills" },
            { name: "Contact", href: "#contact" }
        ]
    },
    sectionTitles: {
        projects: "// Professional Experience",
        skills: "// Technical Skills",
        aboutSelfDev: "// Self-Development",
        aboutAwards: "// Awards & Achievements",
        aboutLeadership: "// Leadership & Activities",
        contact: "// Contact"
    },
    profile: {
        name: "Your Name",
        title: "Your Professional Title",
        image: "https://via.placeholder.com/150/0a0a0f/00d4ff?text=Photo",
        bio: "A passionate professional ready to showcase skills and achievements. Welcome to my portfolio! Click 'Enable Edit Mode' to customize this text and add your projects."
    },
    professional: {
        production: [],
        competition: [],
        academic: [],
        personal: [],
        opensource: []
    },
    selfdev: {
        certifications: [],
        workshops: []
    },
    awards: {
        competitions: [],
        honors: []
    },
    leadership: {
        activities: []
    },
    skills: [
        {
            title: "Frontend Development",
            items: [
                { id: "s1", name: "React.js / Next.js", level: "92%" },
                { id: "s2", name: "JavaScript (ES6+)", level: "90%" },
                { id: "s3", name: "CSS3 / Tailwind CSS", level: "95%" }
            ]
        },
        {
            title: "Backend & DevOps",
            items: [
                { id: "s4", name: "Node.js / Express", level: "80%" },
                { id: "s5", name: "MongoDB / PostgreSQL", level: "75%" }
            ]
        }
    ]
};
