// Funktion zum Verarbeiten des Logins
function handleLogin(event) {
  event.preventDefault(); // Verhindert das Standard-Formularverhalten

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Dummy-Daten für Benutzer und Korrektoren
  const users = {
    user: { password: "password", modules: ["GMCI", "Programmieren 1", "Programmieren 2"] },
    korrektor: { password: "korrektorpassword", modules: ["GMCI"] }
  };

  // Überprüfung der Anmeldedaten
  if (users[username] && users[username].password === password) {
    // Benutzer eingeloggt, Module laden
    document.getElementById("login-container").style.display = "none";
    document.getElementById("upload-container").style.display = "flex";
    document.getElementById("welcome-message").innerText = `Hello, ${username}!`;

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

  modules.forEach(module => {
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
    document.getElementById("assignment-overview").style.display = "flex";
    loadAssignments(moduleName, username);
  } else {
    alert(`You have selected the module: ${moduleName}`);
  }
}

// Assignments dynamisch laden
function loadAssignments(moduleName, username) {
  const assignmentOverview = document.getElementById("assignment-overview");
  const ul = document.createElement("ul");
  assignmentOverview.innerHTML = `<h2>Assignments for ${moduleName}</h2>`;

  for (let i = 1; i <= 6; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = `Assignment ${i}`;
    button.onclick = () => loadUploadPage(moduleName, i, username);
    li.appendChild(button);
    ul.appendChild(li);
  }

  assignmentOverview.appendChild(ul);
  const backButton = document.createElement("button");
  backButton.textContent = "Back to Modules";
  backButton.onclick = backToModules;
  assignmentOverview.appendChild(backButton);
}

// Funktion zum Laden der Upload-Seite
function loadUploadPage(moduleName, assignmentNumber, username) {
  document.getElementById("assignment-overview").style.display = "none";
  document.getElementById("file-upload-container").style.display = "flex";

  const fileUploadTitle = document.getElementById("file-upload-title");
  fileUploadTitle.textContent = `Upload for ${moduleName} - Assignment ${assignmentNumber}`;

  // Wenn der Benutzer ein Korrektor ist, zeige die Studentenübersicht an
  if (username === "korrektor") {
    loadStudentOverview(moduleName, assignmentNumber);
  } else {
    document.getElementById("student-overview").style.display = "none";
  }
}

// Funktion, um die Studentenübersicht zu laden (nur für Korrektoren)
function loadStudentOverview(moduleName, assignmentNumber) {
  const studentOverview = document.getElementById("student-overview");
  studentOverview.innerHTML = `<h3>Students for ${moduleName} - Assignment ${assignmentNumber}</h3>`;
  const ul = document.createElement("ul");

  // Dummy-Studenten für die Anzeige
  const students = ["student1", "student2", "student3"];
  
  students.forEach(student => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = student;
    button.onclick = () => openStudentAssignment(student, moduleName, assignmentNumber);
    li.appendChild(button);
    ul.appendChild(li);
  });

  studentOverview.appendChild(ul);
  studentOverview.style.display = "block";  // Nur für Korrektoren sichtbar
}

// Funktion, um das Assignment eines Studenten zu öffnen
function openStudentAssignment(student, moduleName, assignmentNumber) {
  alert(`Opening ${student}'s assignment for ${moduleName} - Assignment ${assignmentNumber}`);
  // Hier kann der Download- und Korrektur-Button eingebaut werden
}

// Funktion, um zurück zur Modulübersicht zu gehen
function backToModules() {
  document.getElementById("upload-container").style.display = "flex";
  document.getElementById("assignment-overview").style.display = "none";
}

// Funktion, um zurück zur Assignment-Übersicht zu gehen
function backToAssignments() {
  document.getElementById("file-upload-container").style.display = "none";
  document.getElementById("assignment-overview").style.display = "flex";
}
