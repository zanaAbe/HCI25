// Funktion zum Verarbeiten des Logins
function handleLogin(event) {
  event.preventDefault(); // Verhindert das Standard-Formularverhalten

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Dummy-Daten für Benutzer und Korrektoren
  const users = {
    user: {
      password: "password",
      modules: ["GMCI", "Programmieren 1", "Programmieren 2"],
    },
    korrektor: { password: "password", modules: ["GMCI"] },
  };

  // Überprüfung der Anmeldedaten
  if (users[username] && users[username].password === password) {
    // Benutzer eingeloggt, Module laden
    document.getElementById("login-container").style.display = "none";
    document.getElementById("upload-container").style.display = "flex";
    document.getElementById(
      "welcome-message"
    ).innerText = `Hello, ${username}!`;

    // Module dynamisch laden
    loadModules(users[username].modules, username);
  } else {
    alert("Invalid credentials! Please try again.");
  }
}

// Module dynamisch laden
function loadModules(modules, username) {
  const moduleOverview = document.getElementById("module-overview");
  moduleOverview.innerHTML = "<h2>Available Modules</h2>";
  const ul = document.createElement("ul");

  modules.forEach((module) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = module;
    button.onclick = () => selectModule(module, username);
    li.appendChild(button);
    ul.appendChild(li);
  });

  moduleOverview.appendChild(ul);
}

// Funktion zum Auswählen eines Moduls
function selectModule(moduleName, username) {
  if (moduleName === "GMCI") {
    document.getElementById("upload-container").style.display = "none";
    if (username === "korrektor") {
      document.getElementById("assignment-korrektor-overview").style.display =
        "flex";
    } else {
      document.getElementById("assignment-overview").style.display = "flex";
    }
    loadAssignmentsPage(moduleName, username);
  } else {
    alert(`You have selected the module: ${moduleName}`);
  }
}

// Function to check user role and load appropriate assignments page
function loadAssignmentsPage(modulename, username) {
  if (username === "korrektor") {
    loadKorrektorAssignments(modulename, username);
  } else {
    loadAssignments(modulename, username);
  }
}

// Korrektor's assignments page (different from the normal assignments page)
function loadKorrektorAssignments(moduleName, username) {
  const assignmentOverview = document.getElementById(
    "assignment-korrektor-overview"
  );
  assignmentOverview.innerHTML = `<h2 style="text-align: center; font-size: 24px; ">Assignments for ${moduleName}</h2>`;

  const ul = document.createElement("ul");
  ul.style.width = "100%";
  ul.style.listStyle = "none";
  ul.style.padding = "0";
  ul.style.marginBottom = "20px"; // Ensure spacing between the list and the button

  // Dummy assignments and random scores
  const assignments = Array.from({ length: 6 }, (_, i) => ({
    name: `Assignment ${i + 1}`,
    score: Math.floor(Math.random() * 101), // Random scores between 0-100
  }));

  assignments.forEach((assignment) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.padding = "10px 15px";
    li.style.border = "1px solid #ddd";
    li.style.marginBottom = "10px";
    li.style.borderRadius = "8px";
    li.style.backgroundColor = "#f7faff";
    li.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

    // Assignment title with emphasis
    const assignmentName = document.createElement("span");
    assignmentName.textContent = `${assignment.name}`;
    assignmentName.style.fontSize = "18px";
    assignmentName.style.fontWeight = "bold";
    assignmentName.style.color = "#333";
    li.appendChild(assignmentName);

    // Go to Submissions button
    const uploadButton = document.createElement("button");
    uploadButton.textContent = "Go to Submissions";
    uploadButton.style.padding = "8px 12px";
    uploadButton.style.backgroundColor = "#4A90E2"; // Blue background
    uploadButton.style.color = "#fff"; // White text
    uploadButton.style.border = "none";
    uploadButton.style.borderRadius = "4px";
    uploadButton.style.cursor = "pointer";
    uploadButton.style.fontSize = "14px";
    uploadButton.style.transition = "background-color 0.3s ease";
    uploadButton.onmouseover = () => {
      uploadButton.style.backgroundColor = "#357ABD"; // Darker blue on hover
    };
    uploadButton.onmouseout = () => {
      uploadButton.style.backgroundColor = "#4A90E2"; // Reset to original
    };
    uploadButton.onclick = () =>
      loadUploadPage(moduleName, assignment.name, username);
    li.appendChild(uploadButton);

    ul.appendChild(li);
  });

  assignmentOverview.appendChild(ul);

  // Add "Back to Modules" button after the list (below the assignments)
  const backButton = document.createElement("button");
  backButton.textContent = "Back to Modules";
  backButton.style.padding = "10px 15px";
  backButton.style.backgroundColor = "#c81e1e"; // red background
  backButton.style.color = "#fff"; // White text
  backButton.style.border = "none";
  backButton.style.borderRadius = "4px";
  backButton.style.cursor = "pointer";
  backButton.style.fontSize = "16px";
  backButton.style.transition = "background-color 0.3s ease";
  backButton.style.alignSelf = "center";
  //backButton.onmouseover = () => {
  //  backButton.style.backgroundColor = "#8e1717"; // Darker red on hover
  //};
  backButton.onmouseout = () => {
    backButton.style.backgroundColor = "#c81e1e"; // Reset to original
  };
  backButton.onclick = backToModules;

  // Append the back button below the assignment list (after ul)
  assignmentOverview.appendChild(backButton);
  assignmentOverview.style.flexDirection = "column";
}

// Function to open submission page for Korrektor (where they can download and upload corrections)
function openSubmissionPage(assignmentName) {
  document.getElementById("korrektor-assignments-container").style.display =
    "none"; // Hide assignments list

  const fileUploadContainer = document.getElementById("file-upload-container");
  fileUploadContainer.style.display = "flex"; // Show the file upload container

  // Set title for the upload page
  const fileUploadTitle = document.getElementById("file-upload-title");
  fileUploadTitle.textContent = `Submissions for ${assignmentName} - Download & Upload Corrections`;

  // Dummy data for submissions (can be replaced with actual data in the future)
  const groups = ["Group A", "Group B", "Group C"];

  const submissionList = document.getElementById("student-overview");
  submissionList.innerHTML = "<h3>Student Submissions</h3>";
  const ul = document.createElement("ul");

  groups.forEach((group) => {
    const li = document.createElement("li");
    li.innerHTML = `${group} - <button>Download Submission</button> <button>Upload Correction</button>`;
    ul.appendChild(li);
  });

  submissionList.appendChild(ul);

  // Add back button to return to the assignments list
  const backButton = document.createElement("button");
  backButton.textContent = "Back to Assignments";
  backButton.onclick = () => {
    document.getElementById("file-upload-container").style.display = "none";
    loadKorrektorAssignments(); // Reload the assignments page
  };
  submissionList.appendChild(backButton);
}

// Function to go back to the modules page
function backToModules() {
  document.getElementById("assignment-overview").style.display = "none";
  document.getElementById("upload-container").style.display = "flex"; // Show the module selection page
}

// Function to open the "My Group" modal
function openGroupModal() {
  // Create modal container
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "1000";

  // Modal content
  const modalContent = document.createElement("div");
  modalContent.style.backgroundColor = "white";
  modalContent.style.padding = "20px";
  modalContent.style.borderRadius = "8px";
  modalContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  modalContent.style.width = "80%";
  modalContent.style.maxWidth = "600px";

  // Group name
  const groupName = document.createElement("h3");
  groupName.textContent = "Group A"; // Dummy group name
  modalContent.appendChild(groupName);

  // Group members list
  const membersList = document.createElement("ul");
  membersList.style.listStyleType = "none";
  membersList.style.padding = "0";

  const members = ["Alice", "Bob", "Charlie"]; // Dummy members
  members.forEach((member) => {
    const li = document.createElement("li");
    li.textContent = member;
    li.style.padding = "5px 0";
    membersList.appendChild(li);
  });

  modalContent.appendChild(membersList);

  // Buttons to add members, leave group, and view leaderboard
  const addMemberButton = document.createElement("button");
  addMemberButton.textContent = "Add Member";
  addMemberButton.style.marginTop = "10px";
  addMemberButton.style.width = "100%";
  modalContent.appendChild(addMemberButton);

  const leaveGroupButton = document.createElement("button");
  leaveGroupButton.textContent = "Leave Group";
  leaveGroupButton.style.marginTop = "10px";
  leaveGroupButton.style.width = "100%";
  modalContent.appendChild(leaveGroupButton);

  // Close modal
  const closeModalButton = document.createElement("button");
  closeModalButton.textContent = "Close";
  closeModalButton.style.marginTop = "20px";
  closeModalButton.style.width = "100%";
  closeModalButton.style.backgroundColor = "#c81e1e";
  closeModalButton.onclick = () => modal.remove();
  modalContent.appendChild(closeModalButton);

  // Append modal to the document body
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// Function to open the leaderboard modal
function openLeaderboardModal() {
  const leaderboardModal = document.createElement("div");
  leaderboardModal.style.position = "fixed";
  leaderboardModal.style.top = "0";
  leaderboardModal.style.left = "0";
  leaderboardModal.style.width = "100%";
  leaderboardModal.style.height = "100%";
  leaderboardModal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  leaderboardModal.style.display = "flex";
  leaderboardModal.style.alignItems = "center";
  leaderboardModal.style.justifyContent = "center";
  leaderboardModal.style.zIndex = "1000";

  // Modal content for leaderboard
  const leaderboardContent = document.createElement("div");
  leaderboardContent.style.backgroundColor = "white";
  leaderboardContent.style.padding = "20px";
  leaderboardContent.style.borderRadius = "8px";
  leaderboardContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  leaderboardContent.style.width = "80%";
  leaderboardContent.style.maxWidth = "600px";

  const leaderboardTitle = document.createElement("h3");
  leaderboardTitle.textContent = "Leaderboard";
  leaderboardContent.appendChild(leaderboardTitle);

  const leaderboardList = document.createElement("ul");
  leaderboardList.style.listStyleType = "none";
  leaderboardList.style.padding = "0";

  // Dummy leaderboard data
  const groups = [
    { name: "Group A", score: 450 },
    { name: "Group B", score: 420 },
    { name: "Group C", score: 400 },
    { name: "Group D", score: 380 },
  ];

  groups.sort((a, b) => b.score - a.score); // Sort groups by score in descending order

  groups.forEach((group, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${group.name} - ${group.score} points`;
    li.style.padding = "5px 0";
    leaderboardList.appendChild(li);
  });

  leaderboardContent.appendChild(leaderboardList);

  // Close modal
  const closeLeaderboardButton = document.createElement("button");
  closeLeaderboardButton.textContent = "Close";
  closeLeaderboardButton.style.marginTop = "20px";
  closeLeaderboardButton.style.width = "100%";
  closeLeaderboardButton.style.backgroundColor = "#c81e1e";
  closeLeaderboardButton.onclick = () => leaderboardModal.remove();
  leaderboardContent.appendChild(closeLeaderboardButton);

  // Append leaderboard modal to the document body
  leaderboardModal.appendChild(leaderboardContent);
  document.body.appendChild(leaderboardModal);
}

// Function to load assignments
function loadAssignments(moduleName, username) {
  const assignmentOverview = document.getElementById("assignment-overview");
  assignmentOverview.innerHTML = `<h2>Assignments for ${moduleName}</h2>`;

  const ul = document.createElement("ul");
  ul.style.width = "100%";

  let totalScore = 0; // Initialize total score

  // Dummy assignments and random scores
  const assignments = Array.from({ length: 6 }, (_, i) => ({
    name: `Assignment ${i + 1}`,
    score: Math.floor(Math.random() * 101), // Random scores between 0-100
  }));

  assignments.forEach((assignment) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.padding = "10px";
    li.style.border = "1px solid #ddd";
    li.style.marginBottom = "10px";
    li.style.borderRadius = "4px";
    li.style.backgroundColor = "#f9f9f9";

    // Assignment title with emphasis
    const assignmentName = document.createElement("span");
    assignmentName.textContent = `${assignment.name}`;
    assignmentName.style.fontSize = "18px"; // Larger font for emphasis
    assignmentName.style.fontWeight = "bold"; // Bold font for title
    assignmentName.style.color = "#333"; // Dark color for the title
    li.appendChild(assignmentName);

    // Upload Submission button
    const uploadButton = document.createElement("button");
    uploadButton.textContent = "Upload Submission";
    uploadButton.style.marginRight = "10px";
    uploadButton.style.backgroundColor = "#4caf50";
    uploadButton.onclick = () =>
      loadUploadPage(moduleName, assignment.name, username); // Handle upload click
    li.appendChild(uploadButton);

    // Download Correction button
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download Correction";
    downloadButton.style.marginRight = "10px";
    downloadButton.onclick = () =>
      downloadCorrection(moduleName, assignment.name); // Handle download click
    li.appendChild(downloadButton);

    // Score field
    const scoreField = document.createElement("span");
    scoreField.textContent = `Score: ${assignment.score}`;
    scoreField.style.fontWeight = "bold";
    scoreField.style.fontSize = "16px"; // Slightly smaller than title
    scoreField.style.color = "#555"; // Dark gray for the score
    li.appendChild(scoreField);

    // Add score to the total score
    totalScore += assignment.score;

    ul.appendChild(li);
  });

  assignmentOverview.appendChild(ul);

  // Add "Back to Modules" button
  const backButton = document.createElement("button");
  backButton.textContent = "Back to Modules";
  backButton.style.marginTop = "20px";
  backButton.style.alignSelf = "center";
  backButton.style.backgroundColor = "#c81e1e";
  backButton.onclick = backToModules; // Going back to modules
  assignmentOverview.appendChild(backButton);

  // Add "My Group" button
  const myGroupButton = document.createElement("button");
  myGroupButton.textContent = "My Group";
  myGroupButton.onclick = openGroupModal;
  myGroupButton.style.marginTop = "20px";
  myGroupButton.style.alignSelf = "center";
  assignmentOverview.appendChild(myGroupButton);

  // Add Leaderboard button next to My Group
  const leaderboardButton = document.createElement("button");
  leaderboardButton.textContent = "Leaderboard";
  leaderboardButton.onclick = openLeaderboardModal;
  leaderboardButton.style.marginTop = "20px";
  leaderboardButton.style.marginLeft = "10px";
  leaderboardButton.style.alignSelf = "center";
  assignmentOverview.appendChild(leaderboardButton);

  // Add Total Score field below assignments
  const totalScoreContainer = document.createElement("div");
  totalScoreContainer.style.marginTop = "20px";
  totalScoreContainer.style.fontSize = "16px";
  totalScoreContainer.innerHTML = `<strong>Total Score: ${totalScore}</strong>`;
  assignmentOverview.appendChild(totalScoreContainer);
}

// Funktion, um die Studentenübersicht zu laden (nur für Korrektoren)
function loadStudentOverview(moduleName, assignmentNumber) {
  const studentOverview = document.getElementById("student-overview");
  studentOverview.innerHTML = `<h3>Students for ${moduleName} - Assignment ${assignmentNumber}</h3>`;
  const ul = document.createElement("ul");

  // Dummy-Studenten für die Anzeige
  const students = ["student1", "student2", "student3"];

  students.forEach((student) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = student;
    button.onclick = () =>
      openStudentAssignment(student, moduleName, assignmentNumber);
    li.appendChild(button);
    ul.appendChild(li);
  });

  studentOverview.appendChild(ul);
  studentOverview.style.display = "block"; // Nur für Korrektoren sichtbar
}

// Funktion, um das Assignment eines Studenten zu öffnen
function openStudentAssignment(student, moduleName, assignmentNumber) {
  alert(
    `Opening ${student}'s assignment for ${moduleName} - Assignment ${assignmentNumber}`
  );
  // Hier kann der Download- und Korrektur-Button eingebaut werden
}

// Funktion, um zurück zur Modulübersicht zu gehen
function backToModules() {
  document.getElementById("upload-container").style.display = "flex";
  document.getElementById("assignment-overview").style.display = "none";
  document.getElementById("assignment-korrektor-overview").style.display =
    "none";
}

// Funktion, um zurück zur Assignment-Übersicht zu gehen
function backToAssignments() {
  document.getElementById("file-upload-container").style.display = "none";
  document.getElementById("assignment-overview").style.display = "flex";
}

// Funktion zum Ausloggen
function logout() {
  // Reset visible sections
  document.getElementById("login-container").style.display = "flex";
  document.getElementById("upload-container").style.display = "none";
  document.getElementById("assignment-overview").style.display = "none";
  document.getElementById("file-upload-container").style.display = "none";
  document.getElementById("user-overview").style.display = "none";

  // Clear any dynamically added content
  document.getElementById("welcome-message").innerText = "";
  document.getElementById("module-overview").innerHTML = "";
  document.getElementById("assignments-list").innerHTML = "";
  document.getElementById("file-upload-title").innerText = "";
  document.getElementById("user-list").innerHTML = "";
}

// Funktion zum Laden der Upload-Seite oder der Gruppenübersicht (für Korrektor)
function loadUploadPage(moduleName, assignmentNumber, username) {
  document.getElementById("assignment-overview").style.display = "none";

  if (username === "korrektor") {
    // Für Korrektor: Zeige die Gruppenübersicht
    loadGroupOverview(moduleName, assignmentNumber);
  } else {
    // Für normale Benutzer: Zeige den Datei-Upload-Bereich
    document.getElementById("file-upload-container").style.display = "flex";
    const fileUploadTitle = document.getElementById("file-upload-title");
    fileUploadTitle.textContent = `Upload for ${moduleName} - Assignment ${assignmentNumber}`;
  }
}

function loadGroupOverview(moduleName, assignmentNumber) {
  document.getElementById("assignment-korrektor-overview").style.display =
    "none";
  const userOverview = document.getElementById("user-overview");
  userOverview.innerHTML = `<h2>Groups for ${moduleName} - Assignment ${assignmentNumber}</h2>`;
  const ul = document.createElement("ul");

  // Dummy groups and submissions
  const groups = ["Group A", "Group B", "Group C"];

  groups.forEach((group) => {
    const li = document.createElement("li");

    // Group name
    const span = document.createElement("span");
    span.textContent = group;
    li.appendChild(span);

    // Download button
    const downloadButton = document.createElement("button");
    downloadButton.innerHTML = "&#8681; Download";
    downloadButton.onclick = () =>
      handleDownload(group, moduleName, assignmentNumber);
    li.appendChild(downloadButton);

    // Upload button
    const uploadButton = document.createElement("button");
    uploadButton.innerHTML = "&#8682; Upload";
    uploadButton.onclick = () =>
      handleUpload(group, moduleName, assignmentNumber);
    li.appendChild(uploadButton);

    // Points input field
    const pointsInput = document.createElement("input");
    pointsInput.type = "number";
    pointsInput.placeholder = "Points";
    pointsInput.style.marginLeft = "10px";
    pointsInput.style.width = "80px";
    pointsInput.oninput = () => handlePointsInput(group, pointsInput.value);
    li.appendChild(pointsInput);

    ul.appendChild(li);
  });

  userOverview.appendChild(ul);

  // Add "Back" button after the list
  const backButton = document.createElement("button");
  backButton.textContent = "Back";
  backButton.onclick = goBack;
  backButton.style.marginTop = "20px";
  backButton.style.alignSelf = "center"; // Center the button horizontally
  backButton.style.backgroundColor = "#c81e1e";
  userOverview.appendChild(backButton);

  userOverview.style.display = "flex";
  userOverview.style.flexDirection = "column"; // Ensures the list and button stack vertically
}

// Handle points input (optional, for logging or storing)
function handlePointsInput(group, points) {
  console.log(`Points for ${group}: ${points}`);
}

// Dummy-Handler für den Download-Button
function handleDownload(group, moduleName, assignmentNumber) {
  alert(
    `Downloading submission for ${group}, ${moduleName} - Assignment ${assignmentNumber}`
  );
  // Hier könnte die Logik zum Herunterladen implementiert werden
}

// Dummy-Handler für den Upload-Button
function handleUpload(group, moduleName, assignmentNumber) {
  alert(
    `Uploading correction for ${group}, ${moduleName} - Assignment ${assignmentNumber}`
  );
  // Hier könnte die Logik zum Hochladen implementiert werden
}

// Rückkehr von Korrektur-Upload-Download-Page zur Assignments-Liste
function goBack() {
  // Hide the current section
  document.getElementById("user-overview").style.display = "none";

  // Show the assignment overview again
  document.getElementById("assignment-korrektor-overview").style.display =
    "flex";
}
