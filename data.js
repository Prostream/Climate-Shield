// 用于模拟的用户数据库
const users = [
    { username: 'HaoyangTan', password: '2233', email: 'jeff.tandev@gmail.com', phoneNumber: '7187914228' },
    { username: '999', password: '1234', email: 'user2@example.com', phoneNumber: '0987654321' },
];
  
  // 模拟数据库的帖子数组
const posts = [
    {
        id: 1,
        title: 'Need assist on purified water for a family',
        content: 'ZIP code xxxxxx, need assistance, contact: 123-456-8901',
        type: 'Need-emergency',
        tags: ['food', 'Emergency'],
        location: 'San Jose',
        category: 'community'
    },
    {
        id: 2,
        title: 'Wheelchair available for assistance',
        content: 'ZIP code xxxxxx, one wheelchair available, contact: 123-456-789',
        type: 'offer',
        tags: ['necessities', 'Regular'],
        location: 'San Jose',
        category: 'community'
    },
    {
        id: 3,
        title: 'Food packages available for donation',
        content: 'Offering non-perishable food items. ZIP code xxxxxx. Contact: 345-678-9012',
        type: 'offer',
        tags: ['food', 'Regular'],
        location: 'San Jose',
        category: 'community'
    },
    {
        id: 4,
        title: 'Urgent medical supplies needed',
        content: 'In need of bandages, antiseptics. ZIP code xxxxxx. Contact: 456-789-0123',
        type: 'Need-emergency',
        tags: ['medical', 'Emergency'],
        location: 'San Jose',
        category: 'community'
    },
    {
        id: 5,
        title: 'Urgent request for baby supplies',
        content: 'Need diapers and baby formula. ZIP code xxxxxx. Contact: 678-901-2345',
        type: 'Need-emergency',
        tags: ['baby care', 'Emergency'],
        location: 'San Jose',
        category: 'community'
    },
    {
        id: 6,
        title: 'Available carpool for school pick-ups',
        content: 'Offering carpool service in area xxxxxx. Contact: 789-012-3456',
        type: 'offer',
        tags: ['transportation', 'Regular'],
        location: 'San Jose',
        category: 'community'
    },
    {
        id: 7,
        title: 'Seeking support for temporary shelter',
        content: 'Urgently need temporary shelter. ZIP code xxxxxx. Contact: 890-123-4567',
        type: 'Need-regular',
        tags: ['housing'],
        location: 'San Jose',
        category: 'community'
    },
    {
        id: 8,
        title: 'Request for urgent flood relief supplies',
        content: 'Need relief supplies like blankets and canned food. ZIP code xxxxxx. Contact: 901-234-5678',
        type: 'Need-emergency',
        tags: ['relief', 'Emergency'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        id: 9,
        title: 'Offering furniture for families in need',
        content: 'Available used furniture for those affected by recent storms. ZIP code xxxxxx. Contact: 123-456-7890',
        type: 'offer',
        tags: ['furniture', 'Assistance'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        id: 10,
        title: 'Looking for temporary pet shelter',
        content: 'Need temporary shelter for pets during house repairs. ZIP code xxxxxx. Contact: 234-567-8901',
        type: 'Need-regular',
        tags: ['pet care', 'Assistance'],
        location: 'North Carolina',
    },
    {
        id: 11,
        title: 'Urgent blood donation needed',
        content: 'Requesting blood donations for local hospital patients. ZIP code xxxxxx. Contact: 345-678-9012',
        type: 'Need-emergency',
        tags: ['medical', 'Emergency'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        id: 12,
        title: 'Offering free child care for working parents',
        content: 'Free child care for families affected by recent events. ZIP code xxxxxx. Contact: 456-789-0123',
        type: 'offer',
        tags: ['child care', 'Support'],
        location: 'North Carolina',
        category: 'community'
    },
    {
        id: 13,
        title: 'Request Assistance for Cultural Heritage Preservation in San Jose',
        content: 'Looking for resources to help preserve cultural heritage sites in San Jose. If you have expertise or resources in historical preservation, please reach out to us.',
        type: 'Need-emergency',
        tags: ['cultural heritage', 'preservation', 'San Jose'],
        location: 'San Jose',
        category: 'official'
    },
    {
        id: 14,
        title: 'Long-term Provision of Water and Food by City Government',
        content: 'The city government of San Jose is providing long-term access to clean water and food supplies for residents in need. For more information on distribution locations and schedules, please contact the city helpline at 123-456-7890.',
        type: 'offer',
        tags: ['water', 'food', 'long-term assistance', 'San Jose'],
        location: 'San Jose',
        category: 'official'
    },
    {
        id: 15,
        title: 'National Emergency Response Agency Medical Aid Center in Santa Clara',
        content: 'The National Emergency Response Agency has set up a medical aid center in Santa Clara, providing free medications for conditions such as heart disease, asthma, and depression. Residents can visit the center for assistance or call 123-456-7890 for more information.',
        type: 'offer',
        tags: ['medical aid', 'free medication', 'heart disease', 'asthma', 'depression'],
        location: 'San Jose',
        category: 'official'
    },
    {
        id: 16,
        title: 'Long-term Provision of Water and Food by City Government',
        content: 'The city government of San Jose is providing long-term access to clean water and food supplies for residents in need. For more information on distribution locations and schedules, please contact the city helpline at 123-456-7890.',
        type: 'offer',
        tags: ['water', 'food', 'long-term assistance', 'North Carolina'],
        location: 'North Carolina',
        category: 'official'
    },
];

module.exports = { users, posts };