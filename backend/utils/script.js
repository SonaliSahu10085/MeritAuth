
const users = [
  { fullName: "Rahul Yadav", email: "rahul.yadav@gmail.com", password: "@Rahul30" },
  { fullName: "Amit Sharma", email: "amit.sharma@gmail.com", password: "@Amit30" },
  { fullName: "Priya Singh", email: "priya.singh@gmail.com", password: "@Priya30" },
  { fullName: "Neha Verma", email: "neha.verma@gmail.com", password: "@Neha30" },
  { fullName: "Rohit Kumar", email: "rohit.kumar@gmail.com", password: "@Rohit30" },
  { fullName: "Anjali Gupta", email: "anjali.gupta@gmail.com", password: "@Anjali30" },
  { fullName: "Vikas Mishra", email: "vikas.mishra@gmail.com", password: "@Vikas30" },
  { fullName: "Sneha Patel", email: "sneha.patel@gmail.com", password: "@Sneha30" },
  { fullName: "Arjun Mehta", email: "arjun.mehta@gmail.com", password: "@Arjun30" },
  { fullName: "Pooja Nair", email: "pooja.nair@gmail.com", password: "@Pooja30" },

  { fullName: "Karan Malhotra", email: "karan.malhotra@gmail.com", password: "@Karan30" },
  { fullName: "Ritu Saxena", email: "ritu.saxena@gmail.com", password: "@Ritu30" },
  { fullName: "Manish Jain", email: "manish.jain@gmail.com", password: "@Manish30" },
  { fullName: "Swati Agarwal", email: "swati.agarwal@gmail.com", password: "@Swati30" },
  { fullName: "Deepak Chauhan", email: "deepak.chauhan@gmail.com", password: "@Deepak30" },
  { fullName: "Kavya Iyer", email: "kavya.iyer@gmail.com", password: "@Kavya30" },
  { fullName: "Nitin Joshi", email: "nitin.joshi@gmail.com", password: "@Nitin30" },
  { fullName: "Rashmi Roy", email: "rashmi.roy@gmail.com", password: "@Rashmi30" },
  { fullName: "Suresh Pandey", email: "suresh.pandey@gmail.com", password: "@Suresh30" },
  { fullName: "Ayesha Khan", email: "ayesha.khan@gmail.com", password: "@Ayesha30" },

  { fullName: "Mohit Bansal", email: "mohit.bansal@gmail.com", password: "@Mohit30" },
  { fullName: "Ishita Sen", email: "ishita.sen@gmail.com", password: "@Ishita30" },
  { fullName: "Varun Kapoor", email: "varun.kapoor@gmail.com", password: "@Varun30" },
  { fullName: "Simran Kaur", email: "simran.kaur@gmail.com", password: "@Simran30" },
  { fullName: "Aditya Tripathi", email: "aditya.tripathi@gmail.com", password: "@Aditya30" },
  { fullName: "Mehul Shah", email: "mehul.shah@gmail.com", password: "@Mehul30" },
  { fullName: "Nisha Kulkarni", email: "nisha.kulkarni@gmail.com", password: "@Nisha30" },
  { fullName: "Rakesh Tiwari", email: "rakesh.tiwari@gmail.com", password: "@Rakesh30" },
  { fullName: "Tanvi Deshpande", email: "tanvi.d@gmail.com", password: "@Tanvi30" },
  { fullName: "Abhishek Rawat", email: "abhishek.rawat@gmail.com", password: "@Abhi30" }
];

users.forEach(async({fullName, email, password}) => {
    await fetch(`https://meritauth.onrender.com/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
    });
    console.log("Done")
})

