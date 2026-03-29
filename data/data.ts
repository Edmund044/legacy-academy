export const coaches = [
    {
      id: 1, name: "Julian Nagelsmann", role: "Tactical Analysis Specialist", license: "UEFA Pro License",
      bio: "Former professional focused on data-driven tactical periodization and youth elite development. Leading Elite Division since 2021.",
      stats: { experience: 12, teams: 8, winRate: 68 },
      teams: ["Under-19 (Elite Division · 24 players)", "Under-16 (Regional League · 18 players)"],
      rating: 4.9, skills: [{ name: "Tactics implementation", pct: 95 }, { name: "Youth Development", pct: 88 }, { name: "Video Analysis", pct: 92 }],
      upcoming: [{ date: "OCT 24", title: "U-19 Tactical Training", time: "15:00–17:30", venue: "Pitch 3" }, { date: "OCT 26", title: "U-16 Match vs FC Lions", time: "10:30", venue: "Main Stadium" }]
    },
    {
      id: 2, name: "Sarah Jenkins", role: "Speed & Agility Coach", license: "UEFA A Candidate",
      bio: "Specialising in explosive movement and athletic development for youth players.",
      stats: { experience: 5, teams: 3, winRate: 74 },
      teams: ["Under-10 (Weekend Clinic · 30 players)"],
      rating: 4.8, skills: [{ name: "Speed & Agility", pct: 96 }, { name: "Physical Conditioning", pct: 90 }, { name: "Youth Development", pct: 85 }],
      upcoming: [{ date: "OCT 25", title: "Beginner Fundamentals", time: "10:00–12:00", venue: "Pitch 1" }]
    },
    {
      id: 3, name: "Marco Rossi", role: "Head of Attacking Development", license: "UEFA Pro",
      bio: "Elite striker program lead with over 400 sessions delivered across multiple age groups.",
      stats: { experience: 12, teams: 5, winRate: 72 },
      teams: ["U14 Elite (Advanced Training · 20 players)", "ALL (Academy Selection · 120 players)"],
      rating: 4.7, skills: [{ name: "Finishing & Positioning", pct: 98 }, { name: "Tactical Awareness", pct: 87 }, { name: "Player Mentorship", pct: 91 }],
      upcoming: [{ date: "OCT 24", title: "Elite Striker Camp", time: "09:00–11:30", venue: "Main Pitch" }]
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