// 用于模拟的用户数据库
const users = [
    { username: 'HaoyangTan', password: '2233', email: 'jeff.tandev@gmail.com', phoneNumber: '7187914228' },
    { username: '999', password: '1234', email: 'user2@example.com', phoneNumber: '0987654321' },
];
  
  // 模拟数据库的帖子数组
const posts = [
    {
        title: 'Free Eye Checkup in San Jose',
        content: 'Offering free eye exams this weekend in San Jose. Contact: 111-222-3333',
        type: 'offer',
        tags: ['health', 'vision'],
        location: 'San Jose',
        category: 'official'
    },
    {
        title: 'Need Help with Evacuation Transport',
        content: 'We need urgent transport for elderly residents. Please help if you can.',
        type: 'Need-emergency',
        tags: ['transport', 'Emergency'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        title: 'Volunteers Needed for Food Packing',
        content: 'Join our food packing drive for affected families.',
        type: 'Need-regular',
        tags: ['volunteer', 'food'],
        location: 'San Jose',
        category: 'community'
    },
    {
        title: 'Offering Temporary Storage Space',
        content: 'Garage space available for storing flood-affected items.',
        type: 'offer',
        tags: ['storage', 'support'],
        location: 'San Jose',
        category: 'community'
    },
    {
        title: 'Free Mental Health Counseling Hotline',
        content: 'Call our 24/7 support hotline for emotional wellness. 800-999-1234',
        type: 'offer',
        tags: ['mental health', 'hotline'],
        location: 'North Carolina',
        category: 'official'
    },
    {
        title: 'Urgent Request for Baby Wipes and Diapers',
        content: 'Newborns in shelters need urgent supplies. Call 456-123-7890',
        type: 'Need-emergency',
        tags: ['baby care', 'Emergency'],
        location: 'San Jose',
        category: 'community'
    },
    {
        title: 'Clothing Donations Accepted in Santa Clara',
        content: 'Winter clothing donations now accepted at local center.',
        type: 'offer',
        tags: ['clothing', 'donation'],
        location: 'Santa Clara',
        category: 'official'
    },
    {
        title: 'Request for Educational Materials for Kids',
        content: 'Families displaced need books, games, and supplies for children.',
        type: 'Need-regular',
        tags: ['education', 'kids'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        title: 'Community Yoga Classes Every Morning',
        content: 'Free yoga sessions in the park to relieve stress.',
        type: 'offer',
        tags: ['health', 'fitness'],
        location: 'San Jose',
        category: 'community'
    },
    {
        title: 'Flood Cleanup Tools Needed',
        content: 'Requesting mops, gloves, and trash bags for cleanup teams.',
        type: 'Need-emergency',
        tags: ['cleaning', 'Emergency'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        title: 'Tech Donations for Remote Learning',
        content: 'Old tablets or laptops welcome for students learning from shelters.',
        type: 'Need-regular',
        tags: ['education', 'tech'],
        location: 'San Jose',
        category: 'community'
    },
    {
        title: 'Blood Donation Camp Open in Santa Clara',
        content: 'Come donate blood this weekend at local Red Cross.',
        type: 'offer',
        tags: ['medical', 'donation'],
        location: 'Santa Clara',
        category: 'official'
    },
    {
        title: 'Offering Meals to College Students',
        content: 'Free hot meals for students stuck on campus.',
        type: 'offer',
        tags: ['food', 'student'],
        location: 'San Jose',
        category: 'community'
    },
    {
        title: 'Need Pet Carriers for Displaced Animals',
        content: 'Looking for pet carriers and supplies for evacuated pets.',
        type: 'Need-regular',
        tags: ['pet care', 'housing'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        title: 'City Hall Offers COVID Testing Booths',
        content: 'Pop-up testing stations now active near City Hall.',
        type: 'offer',
        tags: ['medical', 'testing'],
        location: 'San Jose',
        category: 'official'
    },
    {
        title: 'Request for Wheelchairs and Crutches',
        content: 'People recovering from injuries in need of mobility support.',
        type: 'Need-emergency',
        tags: ['mobility', 'Emergency'],
        location: 'Santa Clara',
        category: 'community'
    },
    {
        title: 'Legal Aid Open for Insurance Claims',
        content: 'Free legal guidance for residents with flood damage.',
        type: 'offer',
        tags: ['legal', 'housing'],
        location: 'San Jose',
        category: 'official'
    },
    {
        title: 'Offer: Free WiFi at Public Libraries',
        content: 'WiFi now accessible to all without login at city libraries.',
        type: 'offer',
        tags: ['tech', 'internet'],
        location: 'San Jose',
        category: 'official'
    },
    {
        title: 'Urgent Request for First Aid Kits',
        content: 'Shelters need stocked first aid kits urgently.',
        type: 'Need-emergency',
        tags: ['medical', 'Emergency'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        title: 'Local Business Offers Free Laundry Services',
        content: 'Free laundry for displaced families at SoapHub Laundromat.',
        type: 'offer',
        tags: ['clothing', 'support'],
        location: 'San Jose',
        category: 'community'
    },

    // 更多 20 条继续追加
    {
        title: 'Mobile Vaccination Bus in San Jose',
        content: 'Get flu and COVID shots for free near city park.',
        type: 'offer',
        tags: ['health', 'vaccination'],
        location: 'San Jose',
        category: 'official'
    },
    {
        title: 'Request for Warm Blankets and Socks',
        content: 'Shelters request thermal socks and fleece blankets.',
        type: 'Need-regular',
        tags: ['clothing', 'support'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        title: 'City Offers Free Parking for Emergency Workers',
        content: 'Designated lots opened for medical/fire/police staff.',
        type: 'offer',
        tags: ['transport', 'official'],
        location: 'San Jose',
        category: 'official'
    },
    {
        title: 'Pet Vaccination Drive This Weekend',
        content: 'Bring your pets for free shots at downtown shelter.',
        type: 'offer',
        tags: ['pet care', 'medical'],
        location: 'Santa Clara',
        category: 'official'
    },
    {
        title: 'Request for Bicycles for Teen Commuters',
        content: 'Displaced teens need bikes for school and work.',
        type: 'Need-regular',
        tags: ['transport', 'youth'],
        location: 'San Jose',
        category: 'community'
    },
    {
        title: 'Job Matching Service for Flood-Affected Workers',
        content: 'Connects jobseekers with open positions in local businesses.',
        type: 'offer',
        tags: ['employment', 'support'],
        location: 'North Carolina',
        category: 'official'
    },
    {
        title: 'Offer: Free Repair for Home Generators',
        content: 'Certified electricians providing service at cost of parts only.',
        type: 'offer',
        tags: ['power', 'repair'],
        location: 'San Jose',
        category: 'community'
    },
    {
        title: 'Request for Board Games for Families in Shelters',
        content: 'Lighthearted fun needed for mental wellness in long-term shelters.',
        type: 'Need-regular',
        tags: ['recreation', 'family'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        title: 'Disaster Relief Orientation for Volunteers',
        content: 'Join our training session before field deployment.',
        type: 'offer',
        tags: ['volunteer', 'training'],
        location: 'Santa Clara',
        category: 'official'
    },
    {
        title: 'Urgent: Help Needed for Document Replacement',
        content: 'Residents need help replacing lost ID, insurance and legal docs.',
        type: 'Need-emergency',
        tags: ['legal', 'documents'],
        location: 'San Jose',
        category: 'community'
    },
    {
        title: 'Offer: Free Transportation to Medical Appointments',
        content: 'We provide rides to clinics for elderly residents.',
        type: 'offer',
        tags: ['medical', 'transport'],
        location: 'San Jose',
        category: 'community'
    },
    {
        title: 'School Supply Donations Welcome',
        content: 'Notebooks, pens, bags welcome at education relief center.',
        type: 'Need-regular',
        tags: ['education', 'supplies'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        title: 'Community Kitchen Needs Volunteers',
        content: 'Help cook and serve 300+ meals/day in San Jose.',
        type: 'Need-regular',
        tags: ['volunteer', 'food'],
        location: 'San Jose',
        category: 'community'
    },
    {
        title: 'Community Garden Seeds Available for Free',
        content: 'Pick up vegetable seeds from City Hall garden team.',
        type: 'offer',
        tags: ['food', 'urban garden'],
        location: 'San Jose',
        category: 'official'
    },
    {
        title: 'Help Request: Furniture for New Housing Units',
        content: 'We need chairs, beds and tables for low-income housing.',
        type: 'Need-regular',
        tags: ['housing', 'furniture'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        title: 'Offering Dance Therapy for Disaster Recovery',
        content: 'Join guided healing sessions every Saturday afternoon.',
        type: 'offer',
        tags: ['mental health', 'movement'],
        location: 'San Jose',
        category: 'community'
    }
];

module.exports = { users, posts };