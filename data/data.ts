export const coaches = [
  {
    id: 1,
    name: "John Kamau",
    role: "Head Coach",
    license: "UEFA Pro",
    bio: "Experienced head coach with a strong track record in youth development and competitive football.",
    stats: {
      experience: 12,
      teams: 5,
      win_rate: 68,
    },
    teams: ["U18 Lions", "Nairobi FC"],
    rating: 4.7,
    skills: [
      { name: "Tactics", pct: 90 },
      { name: "Leadership", pct: 88 },
      { name: "Player Development", pct: 85 },
    ],
  },
  {
    id: 2,
    name: "David Otieno",
    role: "Assistant Coach",
    license: "CAF A",
    bio: "Specializes in defensive organization and match analysis.",
    stats: {
      experience: 8,
      teams: 3,
      win_rate: 61,
    },
    teams: ["City Stars", "U21 Squad"],
    rating: 4.3,
    skills: [
      { name: "Defense", pct: 87 },
      { name: "Analysis", pct: 82 },
      { name: "Communication", pct: 80 },
    ],
  },
  {
    id: 3,
    name: "Brian Mwangi",
    role: "Fitness Coach",
    license: "FIFA Fitness Trainer",
    bio: "Focuses on player conditioning, injury prevention, and recovery.",
    stats: {
      experience: 6,
      teams: 4,
      win_rate: 70,
    },
    teams: ["Elite Academy", "Senior Team"],
    rating: 4.6,
    skills: [
      { name: "Endurance Training", pct: 92 },
      { name: "Rehabilitation", pct: 85 },
      { name: "Nutrition", pct: 78 },
    ],
  },
  {
    id: 4,
    name: "Samuel Kiptoo",
    role: "Goalkeeping Coach",
    license: "CAF B",
    bio: "Former professional goalkeeper turned elite goalkeeping coach.",
    stats: {
      experience: 10,
      teams: 6,
      win_rate: 65,
    },
    teams: ["National Youth Team", "Rift Valley FC"],
    rating: 4.5,
    skills: [
      { name: "Shot Stopping", pct: 91 },
      { name: "Positioning", pct: 89 },
      { name: "Reflex Training", pct: 88 },
    ],
  },
]

export const equipment = [
  { name: "FIFA Pro Match Ball", category: "Balls", stock: 120, assigned: 90, condition: "Excellent", cost: "$120.00" },
  { name: "Agility Training Cones", category: "Training Gear", stock: 500, assigned: 450, condition: "Good", cost: "$5.50" },
  { name: "Portable Goal Post (U10)", category: "Field Equipment", stock: 12, assigned: 12, condition: "Needs Repair", cost: "$850.00" },
  { name: "Training Bibs (Neon Green)", category: "Training Gear", stock: 200, assigned: 80, condition: "Excellent", cost: "$12.99" },
  { name: "Pro Stopwatches", category: "Training Gear", stock: 30, assigned: 5, condition: "Fair", cost: "$45.00" },
]  


export const sessions = [
  { id: 1, name: "Elite Striker Camp", type: "Advanced Training", team: "U14", date: "Oct 24, 2023", time: "09:00 AM - 11:30 AM", coach: "Marco Rossi", enrollment: 17, total: 20, revenue: "KES 4,250", status: "active" },
  { id: 2, name: "Beginner Fundamentals", type: "Weekend Clinic", team: "U10", date: "Oct 25, 2023", time: "10:00 AM - 12:00 PM", coach: "Sarah Jenkins", enrollment: 30, total: 30, revenue: "KES 3,000", status: "upcoming" },
  { id: 3, name: "Goalkeeper Masterclass", type: "Specialized Training", team: "PRO", date: "Oct 26, 2023", time: "03:00 PM - 05:00 PM", coach: "David Miller", enrollment: 4, total: 10, revenue: "KES 1,600", status: "upcoming" },
  { id: 4, name: "Summer Open Tryouts", type: "Academy Selection", team: "ALL", date: "Oct 20, 2023", time: "08:00 AM - 04:00 PM", coach: "Marco Rossi", enrollment: 120, total: 120, revenue: "KES 12,000", status: "completed" },
  { id: 5, name: "U16 Technical Excellence", type: "Technical Training", team: "U16", date: "Oct 24, 2023", time: "04:00 PM - 05:30 PM", coach: "Julian Nagelsmann", enrollment: 18, total: 22, revenue: "KES 3,600", status: "active" },
]