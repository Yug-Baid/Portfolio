// index.js
export const servicesData = [
  {
    title: "FullStack Development",
    description:
      "Your business deserves a fast, secure, and future-proof digital foundation. I develop custom web apps with clean architecture, optimized databases, and seamless integrations—ensuring reliability at every layer.",
    items: [
      {
        title: "Backend Engineering",
        description: "(REST/GraphQL APIs, Auth Systems)",
      },
      {
        title: "Frontend Excellence",
        description: "(React, Next.js, TypeScript, Interactive UI/UX)",
      },
      {
        title: "Database Design",
        description: "(SQL/NoSQL Optimization, Scalable Structures)",
      },
    ],
  },
  {
    title: "DevOps & Cloud Solutions",
    description:
      "Deploying software shouldn't be a gamble. I automate infrastructure, enforce security, and leverage cloud platforms (AWS/Azure) to keep your app running smoothly—24/7, at any scale.",
    items: [
      {
        title: "CI/CD Pipelines",
        description: "(GitHub Actions, Docker, Kubernetes)",
      },
      {
        title: "Server Management ",
        description: "(Linux, Load Balancing)",
      },
      {
        title: "Performance Tuning",
        description: "(Caching, Compression)",
      },
    ],
  },
  {
    title: "UI/UX Design & Development",
    description:
      "Beautiful design meets flawless functionality. I create intuitive, pixel-perfect interfaces with smooth animations and interactions that keep users engaged and convert visitors into customers.",
    items: [
      {
        title: "Responsive Design",
        description: "(Mobile-first, Adaptive Layouts, Cross-browser)",
      },
      {
        title: "Interactive UI",
        description: "(GSAP Animations, Framer Motion, Micro-interactions)",
      },
      {
        title: "Design Systems",
        description: "(Component Libraries, Webflow, Figma to Code)",
      },
    ],
  },
  {
    title: "API Development & Integration",
    description:
      "Seamless data flow is the backbone of modern apps. I build robust RESTful and GraphQL APIs, integrate third-party services, and ensure your systems communicate efficiently and securely.",
    items: [
      {
        title: "Custom REST APIs",
        description: "(REST/GraphQL, Authentication, Rate Limiting)",
      },
      {
        title: "Third-party Integration",
        description: "(Payment Gateways, Social Auth, Cloud Services)",
      },
      {
        title: "Real-time Features",
        description: "(WebSockets, Live Updates, Chat Systems)",
      },
    ],
  },
];
export const projects = [
  {
    id: 1,
    slug: "wanderlust",
    category: "Marketplace",
    name: "WanderLust",
    description:
      "A full-stack vacation rental marketplace similar to Airbnb connecting hosts with travelers through unique accommodations worldwide.",
    longDescription: "WanderLust is a comprehensive vacation rental platform that allows users to discover unique accommodations, view locations on interactive maps, and share experiences through reviews. Built with EJS templating and powered by Mapbox for geolocation, it provides a seamless experience for both hosts and travelers.",
    href: "https://github.com/yug-baid/wander-lust",
    liveUrl: "https://wander-lust-yug.vercel.app/listings",
    image: "/project3_1.jpg",
    bgImage: "/project3_1.jpg",
    frameworks: [
      { id: 1, name: "EJS" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "Bootstrap 5" },
      { id: 6, name: "Mapbox" },
      { id: 7, name: "Cloudinary" },
      { id: 8, name: "Passport.js" },
    ],
    year: "2024",
    client: "Personal Project",
    duration: "2 Months",
    role: "Full Stack Developer",
    gallery: [
      "/project3_1.jpg",
      "/project3_2.jpg",
      "/project3_3.jpg",
      "/project3_4.jpg"
    ],
    challenges: [
      {
        title: "Geolocation & Mapping",
        description: "Integrating Mapbox for accurate property location display and providing visual context for travelers browsing listings."
      },
      {
        title: "Image Management",
        description: "Handling multiple property images efficiently with upload, storage, and optimization for fast loading times."
      },
      {
        title: "Review System Integrity",
        description: "Ensuring authentic reviews by implementing user verification and preventing spam or fake feedback."
      }
    ],
    solutions: [
      {
        title: "Mapbox GL JS Integration",
        description: "Implemented interactive maps with custom markers and geocoding to pinpoint exact property locations with visual appeal."
      },
      {
        title: "Cloudinary + Multer",
        description: "Used Multer for file handling and Cloudinary for cloud storage, enabling automatic image optimization and CDN delivery."
      },
      {
        title: "Passport.js Authentication",
        description: "Secured the platform with session-based authentication ensuring only verified users can post reviews and listings."
      }
    ],
    results: [
      { value: "CRUD", metric: "Operations", description: "Full property management" },
      { value: "Mapbox", metric: "Maps", description: "Interactive location" },
      { value: "⭐", metric: "Reviews", description: "Star rating system" },
      { value: "Passport", metric: "Auth", description: "Secure login" }
    ]
  },
  {
    id: 2,
    slug: "forever-ecommerce",
    category: "E-Commerce",
    name: "Forever E-Commerce",
    description:
      "A comprehensive full-stack e-commerce solution featuring a responsive storefront for customers and a dedicated admin dashboard for management.",
    longDescription: "Forever E-Commerce is a complete e-commerce platform with dual interfaces - a customer-facing storefront and a secure admin panel. Built with modern technologies, it supports secure authentication, real-time product updates, and multi-provider payment processing including Stripe, Razorpay, and Cash on Delivery.",
    href: "https://github.com/yug-baid/forever",
    image: "/project1_1.jpg",
    bgImage: "/project1_1.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "Tailwind CSS" },
      { id: 6, name: "Cloudinary" },
      { id: 7, name: "Stripe" },
      { id: 8, name: "Razorpay" },
    ],
    year: "2024",
    client: "Personal Project",
    duration: "2 Months",
    role: "Full Stack Developer",
    gallery: [
      "/project1_1.jpg",
      "/project1_2.jpg",
      "/project1_3.jpg",
      "/project1_4.jpg",
      "/project1_5.jpg"
    ],
    challenges: [
      {
        title: "Dual-Interface Architecture",
        description: "Designing separate but integrated interfaces for customers and admins while maintaining code reusability and security."
      },
      {
        title: "Multi-Payment Integration",
        description: "Integrating multiple payment gateways (Stripe, Razorpay) with different APIs and handling various payment scenarios including COD."
      },
      {
        title: "Real-time Order Management",
        description: "Implementing real-time order status updates and synchronization between customer and admin interfaces."
      }
    ],
    solutions: [
      {
        title: "Role-Based Access Control",
        description: "Implemented JWT-based authentication with role-based access control to separate customer and admin functionalities securely."
      },
      {
        title: "Unified Payment Interface",
        description: "Created an abstraction layer for payment processing that handles multiple providers seamlessly with fallback mechanisms."
      },
      {
        title: "Cloudinary Integration",
        description: "Leveraged Cloudinary for efficient image storage and optimization, reducing server load and improving performance."
      }
    ],
    results: [
      { value: "100%", metric: "Responsive", description: "Mobile-first design" },
      { value: "3", metric: "Payment Options", description: "Stripe, Razorpay, COD" },
      { value: "JWT", metric: "Security", description: "Secure authentication" },
      { value: "2", metric: "Interfaces", description: "Customer & Admin" }
    ]
  },
  {
    id: 3,
    slug: "Version Control System",
    category: "Developer Tools",
    name: "Version Control System",
    description:
      "A functional clone of a distributed version control system implementing core git mechanics from scratch with a modern React UI.",
    longDescription: "SourceCode is a custom-built version control system that replicates core git functionality including init, add, commit, push, and pull operations. Built with Node.js backend and React frontend, it features cloud-native storage with AWS S3, issue tracking, and contribution heatmaps for developer activity visualization.",
    href: "https://github.com/yug-baid/version-control-system",
    image: "/project2_1.jpg",
    bgImage: "/project2_1.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "AWS S3" },
      { id: 6, name: "Mongoose" },
      { id: 7, name: "Yargs" },
    ],
    year: "2024",
    client: "Personal Project",
    duration: "3 Months",
    role: "Full Stack Developer",
    gallery: [
      "/project2_1.jpg",
      "/project2_2.jpg",
      "/project2_3.jpg",
      "/project2_4.jpg"
    ],
    challenges: [
      {
        title: "Git Mechanics Implementation",
        description: "Replicating complex git operations (commit, push, pull, branching) from scratch while maintaining data integrity and version history."
      },
      {
        title: "Cloud Storage Integration",
        description: "Efficiently managing large repository files and implementing delta compression for storage optimization on AWS S3."
      },
      {
        title: "Real-time Collaboration",
        description: "Handling concurrent operations and merge conflicts when multiple users interact with the same repository."
      }
    ],
    solutions: [
      {
        title: "Custom Git Engine",
        description: "Developed a custom git engine using Node.js that implements core version control algorithms including SHA-1 hashing and tree structures."
      },
      {
        title: "AWS S3 Architecture",
        description: "Designed an efficient blob storage system using AWS S3 with metadata stored in MongoDB for fast retrieval and version tracking."
      },
      {
        title: "Contribution Heatmap",
        description: "Implemented a visual heatmap using D3.js to track and display developer activity patterns and contribution history."
      }
    ],
    results: [
      { value: "5", metric: "Git Commands", description: "Core operations" },
      { value: "AWS S3", metric: "Cloud Storage", description: "Scalable storage" },
      { value: "100%", metric: "Custom Built", description: "From scratch" },
      { value: "JWT", metric: "Authentication", description: "Secure access" }
    ]
  },
];
export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/ali.sanatidev/reels/" },
  {
    name: "Youtube",
    href: "https://www.youtube.com/channel/UCZhtUWTtk3bGJiMPN9T4HWA",
  },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/ali-sanati/" },
  { name: "GitHub", href: "https://github.com/Ali-Sanati" },
];

// Helper function to get project by slug
export const getProjectBySlug = (slug) => {
  return projects.find(project => project.slug === slug);
};