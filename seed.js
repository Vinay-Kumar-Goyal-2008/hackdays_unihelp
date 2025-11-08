const mongoose = require("mongoose");
const Model = require("./studentschema"); // your schema file

mongoose.connect("mongodb://127.0.0.1:27017/unihelpdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = [
  {
    userid: "u101",
    password: "pass101",
    name: "Vinay Kumar",
    Branch: "CSE",
    complaints: [
      {
        complaintid: "C001",
        title: "Wi-Fi not working in lab",
        department: "academic-it",
        status: "Pending",
        remarks: "",
      },
      {
        complaintid: "C002",
        title: "Fan not working in classroom",
        department: "academic-cse",
        status: "Resolved",
        remarks: "Replaced motor",
      },
    ],
  },
  {
    userid: "u102",
    password: "pass102",
    name: "Divya Sharma",
    Branch: "ECE",
    complaints: [
      {
        complaintid: "C003",
        title: "Projector issue in seminar hall",
        department: "academic-ece",
        status: "In Progress",
        remarks: "Under repair",
      },
    ],
  },
  {
    userid: "u103",
    password: "pass103",
    name: "Rohan Mehta",
    Branch: "ME",
    complaints: [
      {
        complaintid: "C004",
        title: "Lab equipment not calibrated",
        department: "academic-me",
        status: "Pending",
        remarks: "",
      },
    ],
  },
  {
    userid: "u104",
    password: "pass104",
    name: "Priya Singh",
    Branch: "EE",
    complaints: [
      {
        complaintid: "C005",
        title: "Power fluctuation in lab",
        department: "academic-ee",
        status: "Pending",
        remarks: "",
      },
    ],
  },
  {
    userid: "u105",
    password: "pass105",
    name: "Ankit Yadav",
    Branch: "MCE",
    complaints: [
      {
        complaintid: "C006",
        title: "Broken chair in lecture hall",
        department: "academic-mce",
        status: "Resolved",
        remarks: "Chair replaced",
      },
    ],
  },
  {
    userid: "u106",
    password: "pass106",
    name: "Nisha Verma",
    Branch: "CSE",
    complaints: [
      {
        complaintid: "C007",
        title: "Printer out of ink",
        department: "academic-it",
        status: "Pending",
        remarks: "",
      },
    ],
  },
  {
    userid: "u107",
    password: "pass107",
    name: "Rahul Gupta",
    Branch: "ME",
    complaints: [
      {
        complaintid: "C008",
        title: "Water leakage in hostel bathroom",
        department: "hostel",
        status: "In Progress",
        remarks: "Plumber assigned",
      },
    ],
  },
  {
    userid: "u108",
    password: "pass108",
    name: "Sneha Kapoor",
    Branch: "EE",
    complaints: [
      {
        complaintid: "C009",
        title: "Medical assistance needed",
        department: "healthcentre",
        status: "Pending",
        remarks: "",
      },
    ],
  },
  {
    userid: "u109",
    password: "pass109",
    name: "Aman Jain",
    Branch: "EP",
    complaints: [
      {
        complaintid: "C010",
        title: "Scholarship reimbursement delay",
        department: "finance",
        status: "Resolved",
        remarks: "Amount credited",
      },
    ],
  },
  {
    userid: "u110",
    password: "pass110",
    name: "Kritika Malhotra",
    Branch: "SE",
    complaints: [
      {
        complaintid: "C011",
        title: "Event permission delay",
        department: "student-affairs",
        status: "Pending",
        remarks: "",
      },
    ],
  },
];

async function seedDB() {
  try {
    await Model.deleteMany({});
    await Model.insertMany(seedData);
    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
