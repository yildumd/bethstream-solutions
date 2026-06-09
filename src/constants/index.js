export const COMPANY = {
  name: "Bethstream Solutions",
  tagline: "Smart Networking & Surveillance Solutions",
  address: "7 Obafemi Awolowo Way, Opposite Ikeja Local Government, Ikeja, Lagos, Nigeria",
  phones: ["08032659464", "08059822144"],
  email: "info@bethstreamsolutions.com",
  whatsapp: "2348032659464",
  hours: {
    weekdays: "Monday – Friday: 8:00 AM – 6:00 PM",
    saturday: "Saturday: 9:00 AM – 4:00 PM",
    sunday: "Sunday: Closed",
  },
  social: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  coords: { lat: 6.6018, lng: 3.3515 },
};

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Categories", path: "/categories" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const PRODUCT_CATEGORIES = [
  {
    id: "networking",
    label: "Networking",
    icon: "router",
    color: "purple",
    subcategories: ["Switches", "Routers", "Access Points"],
    description: "Enterprise-grade networking infrastructure for seamless connectivity.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
  },
  {
    id: "cctv",
    label: "CCTV & Surveillance",
    icon: "camera",
    color: "sky",
    subcategories: ["Analogue Cameras", "IP Cameras", "PTZ Cameras", "Solar Cameras"],
    description: "Advanced surveillance cameras for complete security coverage.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=80",
  },
  {
    id: "recorders",
    label: "Recorders",
    icon: "dvr",
    color: "lemon",
    subcategories: ["DVR", "NVR"],
    description: "High-capacity digital and network video recorders for continuous recording.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&q=80",
  },
  {
    id: "storage",
    label: "Storage",
    icon: "storage",
    color: "purple",
    subcategories: ["Hard Drives", "Memory Cards"],
    description: "Reliable storage solutions designed for surveillance and network systems.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80",
  },
];

export const BRANDS = [
  "Hikvision", "Dahua", "Cisco", "Ubiquiti", "TP-Link",
  "Seagate", "Western Digital", "Axis", "Hanwha", "Bosch"
];

export const SERVICES = [
  {
    id: "cctv-installation",
    title: "CCTV Installation",
    icon: "MdOutlineCameraAlt",
    color: "sky",
    description: "Professional installation of CCTV systems for homes, offices, and enterprises. Our certified technicians ensure optimal camera placement and configuration.",
    benefits: ["360° Coverage Planning", "IP & Analog Systems", "Night Vision Setup", "Remote Monitoring"],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
  },
  {
    id: "cctv-maintenance",
    title: "CCTV Maintenance",
    icon: "MdBuildCircle",
    color: "purple",
    description: "Regular maintenance and servicing of existing CCTV systems to ensure uninterrupted surveillance and extended equipment lifespan.",
    benefits: ["Preventive Checks", "Lens Cleaning", "Firmware Updates", "24/7 Support"],
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
  },
  {
    id: "networking-setup",
    title: "Networking Setup",
    icon: "MdRouter",
    color: "lemon",
    description: "End-to-end network design and deployment for businesses of all sizes. From small office LANs to enterprise-grade infrastructure.",
    benefits: ["LAN/WAN Design", "Wi-Fi Optimization", "Switch Configuration", "VPN Setup"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    id: "structured-cabling",
    title: "Structured Cabling",
    icon: "MdCable",
    color: "sky",
    description: "Professional cable management and structured cabling solutions that form the backbone of your network infrastructure.",
    benefits: ["Cat5e / Cat6 / Cat6A", "Fiber Optic Cabling", "Rack Installation", "Cable Management"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
  },
  {
    id: "access-control",
    title: "Access Control",
    icon: "MdLock",
    color: "purple",
    description: "Smart access control systems to restrict and monitor entry to your premises, ensuring only authorized personnel gain access.",
    benefits: ["Biometric Systems", "Card Reader Setup", "Door Lock Integration", "Audit Trails"],
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80",
  },
  {
    id: "enterprise-security",
    title: "Enterprise Security",
    icon: "MdSecurity",
    color: "lemon",
    description: "Comprehensive security solutions for large enterprises, combining networking, surveillance, and access control into one unified system.",
    benefits: ["Custom Architecture", "Multi-Site Integration", "Scalable Design", "SLA Guarantee"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
];

export const STATS = [
  { value: "500+", label: "Projects Completed", icon: "check" },
  { value: "200+", label: "Happy Clients", icon: "smile" },
  { value: "10+", label: "Years Experience", icon: "calendar" },
  { value: "24/7", label: "Support Available", icon: "clock" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Emeka Okonkwo",
    role: "IT Director",
    company: "Lagos Tech Hub",
    text: "Bethstream Solutions transformed our entire network infrastructure. The team was professional, fast, and delivered beyond expectations. Our network uptime improved by 99.9%.",
    rating: 5,
    avatar: "EO",
  },
  {
    id: 2,
    name: "Aisha Bello",
    role: "Operations Manager",
    company: "Luxury Suites Ikeja",
    text: "We had Bethstream install CCTV across all 5 floors of our hotel. The quality of cameras and professionalism of installation was outstanding. Highly recommended.",
    rating: 5,
    avatar: "AB",
  },
  {
    id: 3,
    name: "Tunde Adeyemi",
    role: "CEO",
    company: "Adeyemi Group",
    text: "From quote to installation, the process was seamless. They set up a complete security system for our 3 office locations in Lagos. Top-notch service.",
    rating: 5,
    avatar: "TA",
  },
  {
    id: 4,
    name: "Dr. Ngozi Obi",
    role: "Clinic Director",
    company: "Obi Medical Centre",
    text: "Our clinic needed secure, reliable networking for our medical equipment. Bethstream understood our needs perfectly and delivered a HIPAA-compliant solution.",
    rating: 5,
    avatar: "NO",
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: "shield",
    title: "Certified Professionals",
    desc: "Our team holds industry certifications from Cisco, Hikvision, and Dahua.",
    color: "purple",
  },
  {
    icon: "clock",
    title: "Fast Deployment",
    desc: "We complete most installations within 24–72 hours of project approval.",
    color: "sky",
  },
  {
    icon: "headset",
    title: "24/7 Support",
    desc: "Round-the-clock technical support and remote monitoring for your peace of mind.",
    color: "lemon",
  },
  {
    icon: "tag",
    title: "Competitive Pricing",
    desc: "Enterprise-grade solutions at prices that make sense for Nigerian businesses.",
    color: "purple",
  },
  {
    icon: "award",
    title: "Quality Guarantee",
    desc: "All products come with manufacturer warranty and our installation guarantee.",
    color: "sky",
  },
  {
    icon: "map",
    title: "Lagos-Based",
    desc: "Locally based in Ikeja for rapid on-site response and physical consultations.",
    color: "lemon",
  },
];

export const PROJECT_TYPES = [
  "CCTV Installation",
  "Networking Setup",
  "Structured Cabling",
  "Access Control",
  "Enterprise Security",
  "CCTV Maintenance",
  "Network Upgrade",
  "Custom Project",
];

export const BUDGET_RANGES = [
  "Below ₦100,000",
  "₦100,000 – ₦500,000",
  "₦500,000 – ₦1,000,000",
  "₦1,000,000 – ₦5,000,000",
  "Above ₦5,000,000",
  "Flexible / Open Budget",
];
