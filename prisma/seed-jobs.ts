import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const jobs = [
  // Computer Science Engineering
  { title: "Software Engineer", company: "Google", location: "Bangalore", type: "Full-time", experience: "0-2 Years", skills: JSON.stringify(["C++", "Java", "Python", "Data Structures"]), description: "Join our core engineering team to build scalable systems.", department: "Computer Science Engineering", isFuture: false },
  { title: "Backend Developer", company: "Amazon", location: "Hyderabad", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["Java", "Spring Boot", "AWS"]), description: "Design and implement scalable backend services.", department: "Computer Science Engineering", isFuture: false },
  { title: "Frontend Engineer", company: "Microsoft", location: "Noida", type: "Full-time", experience: "0-2 Years", skills: JSON.stringify(["React", "TypeScript", "Redux"]), description: "Create responsive user interfaces for global products.", department: "Computer Science Engineering", isFuture: false },
  { title: "Data Scientist", company: "Meta", location: "Gurgaon", type: "Full-time", experience: "2-4 Years", skills: JSON.stringify(["Python", "Machine Learning", "SQL"]), description: "Analyze massive datasets to extract actionable insights.", department: "Computer Science Engineering", isFuture: false },
  { title: "Machine Learning Engineer", company: "Apple", location: "Hyderabad", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["Python", "TensorFlow", "PyTorch"]), description: "Develop and deploy ML models into production environments.", department: "Computer Science Engineering", isFuture: false },
  { title: "Cloud Architect", company: "IBM", location: "Pune", type: "Full-time", experience: "3-5 Years", skills: JSON.stringify(["AWS", "Azure", "Kubernetes"]), description: "Design cloud infrastructures and migrate enterprise applications.", department: "Computer Science Engineering", isFuture: true },
  { title: "Cybersecurity Analyst", company: "Cisco", location: "Bangalore", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["Network Security", "Cryptography", "Ethical Hacking"]), description: "Protect company networks and secure systems from threats.", department: "Computer Science Engineering", isFuture: false },
  { title: "Full Stack Developer", company: "Atlassian", location: "Remote", type: "Remote", experience: "0-2 Years", skills: JSON.stringify(["React", "Node.js", "MongoDB"]), description: "Develop both client and server software.", department: "Computer Science Engineering", isFuture: false },
  { title: "DevOps Engineer", company: "Oracle", location: "Bangalore", type: "Full-time", experience: "2-4 Years", skills: JSON.stringify(["Docker", "Jenkins", "Linux"]), description: "Manage CI/CD pipelines and ensure high availability.", department: "Computer Science Engineering", isFuture: false },

  // Electronics & Communication Engineering (ECE)
  { title: "Embedded Systems Engineer", company: "Intel", location: "Bangalore", type: "Full-time", experience: "0-2 Years", skills: JSON.stringify(["C", "Microcontrollers", "RTOS"]), description: "Develop software for embedded devices and IoT systems.", department: "Electronics & Communication Engineering", isFuture: false },
  { title: "VLSI Design Engineer", company: "Qualcomm", location: "Hyderabad", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["Verilog", "VHDL", "SystemVerilog"]), description: "Design and verify complex digital circuits.", department: "Electronics & Communication Engineering", isFuture: false },
  { title: "Telecom Network Engineer", company: "Ericsson", location: "Gurgaon", type: "Full-time", experience: "0-2 Years", skills: JSON.stringify(["5G", "LTE", "Network Protocols"]), description: "Plan and optimize telecommunication networks.", department: "Electronics & Communication Engineering", isFuture: false },
  { title: "Hardware Engineer", company: "NVIDIA", location: "Pune", type: "Full-time", experience: "1-4 Years", skills: JSON.stringify(["PCB Design", "Circuit Analysis", "FPGA"]), description: "Design and test hardware components for next-gen GPUs.", department: "Electronics & Communication Engineering", isFuture: false },
  { title: "RF Engineer", company: "Samsung", location: "Noida", type: "Full-time", experience: "2-5 Years", skills: JSON.stringify(["RF Design", "Antenna Design", "MATLAB"]), description: "Develop radio frequency modules for mobile devices.", department: "Electronics & Communication Engineering", isFuture: false },
  { title: "IoT Solutions Architect", company: "Bosch", location: "Coimbatore", type: "Full-time", experience: "2-4 Years", skills: JSON.stringify(["IoT", "Sensors", "Wireless Comm"]), description: "Design end-to-end IoT solutions for smart homes and industries.", department: "Electronics & Communication Engineering", isFuture: true },
  { title: "Signal Processing Engineer", company: "Texas Instruments", location: "Bangalore", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["DSP", "MATLAB", "C++"]), description: "Implement algorithms for digital signal processing.", department: "Electronics & Communication Engineering", isFuture: false },

  // Electrical & Electronics Engineering (EEE)
  { title: "Electrical Design Engineer", company: "Siemens", location: "Mumbai", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["AutoCAD Electrical", "Power Systems", "PLC"]), description: "Design electrical systems and control panels.", department: "Electrical & Electronics Engineering", isFuture: false },
  { title: "Power Electronics Engineer", company: "Schneider Electric", location: "Bangalore", type: "Full-time", experience: "2-4 Years", skills: JSON.stringify(["Power Converters", "Simulink", "Circuit Design"]), description: "Develop efficient power conversion systems.", department: "Electrical & Electronics Engineering", isFuture: false },
  { title: "Control Systems Engineer", company: "ABB", location: "Chennai", type: "Full-time", experience: "1-4 Years", skills: JSON.stringify(["SCADA", "PLC Programming", "Automation"]), description: "Implement and maintain industrial control systems.", department: "Electrical & Electronics Engineering", isFuture: false },
  { title: "Renewable Energy Engineer", company: "Adani Green Energy", location: "Ahmedabad", type: "Full-time", experience: "0-2 Years", skills: JSON.stringify(["Solar Power", "Wind Energy", "Grid Integration"]), description: "Design and deploy renewable energy projects.", department: "Electrical & Electronics Engineering", isFuture: true },
  { title: "Smart Grid Engineer", company: "General Electric", location: "Hyderabad", type: "Full-time", experience: "2-5 Years", skills: JSON.stringify(["Smart Grid", "Energy Management", "IoT"]), description: "Develop modern electrical grids with smart monitoring.", department: "Electrical & Electronics Engineering", isFuture: true },
  { title: "Maintenance Engineer", company: "Tata Power", location: "Jamshedpur", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["Equipment Maintenance", "Safety Standards", "Troubleshooting"]), description: "Ensure reliability of electrical generation equipment.", department: "Electrical & Electronics Engineering", isFuture: false },
  { title: "Electric Vehicle Systems Engineer", company: "Ather Energy", location: "Bangalore", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["EV Architecture", "Battery Management", "Motors"]), description: "Design and integrate systems for electric scooters.", department: "Electrical & Electronics Engineering", isFuture: true },

  // Mechanical Engineering
  { title: "Design Engineer", company: "Larsen & Toubro", location: "Mumbai", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["SolidWorks", "AutoCAD", "GD&T"]), description: "Design mechanical components and assemblies.", department: "Mechanical Engineering", isFuture: false },
  { title: "Automotive Engineer", company: "Tata Motors", location: "Pune", type: "Full-time", experience: "0-2 Years", skills: JSON.stringify(["CATIA", "Vehicle Dynamics", "Thermodynamics"]), description: "Develop components for passenger and commercial vehicles.", department: "Mechanical Engineering", isFuture: false },
  { title: "Aerospace Engineer", company: "Boeing", location: "Bangalore", type: "Full-time", experience: "2-5 Years", skills: JSON.stringify(["Aerodynamics", "ANSYS", "Finite Element Analysis"]), description: "Analyze and design aircraft structural components.", department: "Mechanical Engineering", isFuture: false },
  { title: "Manufacturing Engineer", company: "Mahindra & Mahindra", location: "Chennai", type: "Full-time", experience: "1-4 Years", skills: JSON.stringify(["Lean Manufacturing", "Six Sigma", "CNC Programming"]), description: "Optimize production processes and assembly lines.", department: "Mechanical Engineering", isFuture: false },
  { title: "HVAC Engineer", company: "Blue Star", location: "Delhi", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["HVAC Design", "Refrigeration", "Thermodynamics"]), description: "Design heating, ventilation, and air conditioning systems.", department: "Mechanical Engineering", isFuture: false },
  { title: "Robotics Engineer", company: "Boston Dynamics", location: "Remote", type: "Full-time", experience: "3-5 Years", skills: JSON.stringify(["Robotics", "Kinematics", "C++"]), description: "Develop control algorithms for advanced robotic systems.", department: "Mechanical Engineering", isFuture: true },
  { title: "Quality Assurance Engineer", company: "TVS Motor", location: "Hosur", type: "Full-time", experience: "0-2 Years", skills: JSON.stringify(["Quality Control", "Inspection", "ISO Standards"]), description: "Ensure mechanical parts meet quality and safety standards.", department: "Mechanical Engineering", isFuture: false },

  // Civil Engineering
  { title: "Structural Engineer", company: "Shapoorji Pallonji", location: "Mumbai", type: "Full-time", experience: "2-4 Years", skills: JSON.stringify(["STAAD Pro", "AutoCAD", "Structural Analysis"]), description: "Design and analyze building structures for stability.", department: "Civil Engineering", isFuture: false },
  { title: "Site Engineer", company: "DLF", location: "Gurgaon", type: "Full-time", experience: "0-2 Years", skills: JSON.stringify(["Project Management", "Surveying", "Construction Materials"]), description: "Supervise construction sites and ensure adherence to plans.", department: "Civil Engineering", isFuture: false },
  { title: "Geotechnical Engineer", company: "Afcons Infrastructure", location: "Chennai", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["Soil Mechanics", "Foundation Design", "AutoCAD"]), description: "Analyze soil conditions and design foundations.", department: "Civil Engineering", isFuture: false },
  { title: "Transportation Engineer", company: "L&T Infrastructure", location: "Delhi", type: "Full-time", experience: "2-5 Years", skills: JSON.stringify(["Traffic Engineering", "Highway Design", "Civil 3D"]), description: "Plan and design transportation systems and highways.", department: "Civil Engineering", isFuture: false },
  { title: "Environmental Engineer", company: "Tata Consulting Engineers", location: "Pune", type: "Full-time", experience: "1-4 Years", skills: JSON.stringify(["Water Treatment", "Waste Management", "EIA"]), description: "Design systems for environmental protection and waste management.", department: "Civil Engineering", isFuture: false },
  { title: "Urban Planner", company: "Godrej Properties", location: "Bangalore", type: "Full-time", experience: "2-4 Years", skills: JSON.stringify(["Urban Design", "GIS", "Zoning Laws"]), description: "Plan urban layouts and sustainable community spaces.", department: "Civil Engineering", isFuture: true },
  { title: "Estimation Engineer", company: "Hindustan Construction", location: "Mumbai", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["Cost Estimation", "Tendering", "AutoCAD"]), description: "Prepare cost estimates and bids for construction projects.", department: "Civil Engineering", isFuture: false },

  // Information Technology (IT)
  { title: "Software Developer", company: "TCS", location: "Chennai", type: "Full-time", experience: "0-2 Years", skills: JSON.stringify(["Java", "SQL", "Spring"]), description: "Develop and maintain enterprise software applications.", department: "Information Technology", isFuture: false },
  { title: "System Analyst", company: "Infosys", location: "Bangalore", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["System Analysis", "UML", "Requirements Gathering"]), description: "Analyze business requirements and design IT solutions.", department: "Information Technology", isFuture: false },
  { title: "Cloud Engineer", company: "Wipro", location: "Pune", type: "Full-time", experience: "2-4 Years", skills: JSON.stringify(["AWS", "Linux", "Docker"]), description: "Deploy and manage cloud infrastructure for clients.", department: "Information Technology", isFuture: false },
  { title: "Database Administrator", company: "Tech Mahindra", location: "Hyderabad", type: "Full-time", experience: "3-5 Years", skills: JSON.stringify(["Oracle", "SQL Server", "Database Tuning"]), description: "Ensure database availability, performance, and security.", department: "Information Technology", isFuture: false },
  { title: "IT Consultant", company: "Accenture", location: "Gurgaon", type: "Full-time", experience: "2-5 Years", skills: JSON.stringify(["Consulting", "IT Strategy", "Agile"]), description: "Advise clients on technology strategies and digital transformation.", department: "Information Technology", isFuture: false },
  { title: "Cyber Security Specialist", company: "HCL Technologies", location: "Noida", type: "Full-time", experience: "1-4 Years", skills: JSON.stringify(["Information Security", "SIEM", "Risk Assessment"]), description: "Implement security protocols and monitor IT infrastructure.", department: "Information Technology", isFuture: false },
  { title: "Data Analyst", company: "Cognizant", location: "Kolkata", type: "Full-time", experience: "0-2 Years", skills: JSON.stringify(["Excel", "SQL", "Tableau"]), description: "Analyze IT operations data and generate reports.", department: "Information Technology", isFuture: false },

  // Chemical Engineering
  { title: "Process Engineer", company: "Reliance Industries", location: "Jamnagar", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["Process Simulation", "Thermodynamics", "Aspen Plus"]), description: "Design and optimize chemical manufacturing processes.", department: "Chemical Engineering", isFuture: false },
  { title: "Production Engineer", company: "Tata Chemicals", location: "Mithapur", type: "Full-time", experience: "0-2 Years", skills: JSON.stringify(["Plant Operations", "Safety Protocols", "Mass Transfer"]), description: "Supervise day-to-day operations in chemical plants.", department: "Chemical Engineering", isFuture: false },
  { title: "R&D Scientist", company: "Dr. Reddy's", location: "Hyderabad", type: "Full-time", experience: "2-5 Years", skills: JSON.stringify(["Formulation", "Analytical Chemistry", "Reaction Engineering"]), description: "Research and develop new chemical compounds and drugs.", department: "Chemical Engineering", isFuture: false },
  { title: "Safety Engineer", company: "Aditya Birla Group", location: "Dahej", type: "Full-time", experience: "1-4 Years", skills: JSON.stringify(["HSE", "Risk Analysis", "HAZOP"]), description: "Ensure health, safety, and environmental compliance at plants.", department: "Chemical Engineering", isFuture: false },
  { title: "Materials Engineer", company: "Asian Paints", location: "Mumbai", type: "Full-time", experience: "0-3 Years", skills: JSON.stringify(["Polymer Science", "Material Testing", "Quality Control"]), description: "Develop and test new materials for industrial applications.", department: "Chemical Engineering", isFuture: false },

  // Biotechnology Engineering
  { title: "Bioinformatics Analyst", company: "Biocon", location: "Bangalore", type: "Full-time", experience: "1-3 Years", skills: JSON.stringify(["Python", "R", "Genomics"]), description: "Analyze complex biological data using software tools.", department: "Biotechnology Engineering", isFuture: false },
  { title: "Clinical Research Associate", company: "Serum Institute", location: "Pune", type: "Full-time", experience: "0-2 Years", skills: JSON.stringify(["Clinical Trials", "GCP", "Data Management"]), description: "Monitor clinical trials and ensure regulatory compliance.", department: "Biotechnology Engineering", isFuture: false },
  { title: "Bioprocess Engineer", company: "Bharat Biotech", location: "Hyderabad", type: "Full-time", experience: "2-4 Years", skills: JSON.stringify(["Fermentation", "Cell Culture", "Downstream Processing"]), description: "Design and optimize bioprocesses for vaccine production.", department: "Biotechnology Engineering", isFuture: false },
  { title: "Genetic Engineer", company: "Novozymes", location: "Bangalore", type: "Full-time", experience: "2-5 Years", skills: JSON.stringify(["Molecular Biology", "CRISPR", "Gene Cloning"]), description: "Modify organisms to develop sustainable solutions.", department: "Biotechnology Engineering", isFuture: true },
  { title: "Quality Control Analyst", company: "Sun Pharma", location: "Mumbai", type: "Full-time", experience: "0-3 Years", skills: JSON.stringify(["HPLC", "Microbiology", "GMP"]), description: "Test biological products to ensure quality standards.", department: "Biotechnology Engineering", isFuture: false },
];

async function main() {
  console.log("Seeding jobs to the database...");
  
  let insertedCount = 0;
  for (const jobData of jobs) {
    // Check if a job with the same title and company exists to prevent duplicates
    const existingJob = await prisma.job.findFirst({
      where: {
        title: jobData.title,
        company: jobData.company,
      }
    });

    if (!existingJob) {
      await prisma.job.create({
        data: jobData
      });
      insertedCount++;
    }
  }

  console.log(`Successfully seeded ${insertedCount} new jobs.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
