// ==========================================
// 1. STUDENT RECORDS
// ==========================================

const students = [
    {
        id: "STU001",
        name: "wilson kelvin",
        course: "Computer Science",
        password: "Student123!",
        certificateGenerated: false,
        certificateId: null,
        displayName: null
    },

    {
        id: "STU002",
        name: "David James",
        course: "Cybersecurity",
        password: "Student456!",
        certificateGenerated: false,
        certificateId: null,
        displayName: null
    },

    {
        id: "STU003",
        name: "Mary Johnson",
        course: "Software Engineering",
        password: "Student789!",
        certificateGenerated: false,
        certificateId: null,
        displayName: null
    }
];


// ==========================================
// 2. CURRENT STUDENT
// ==========================================

let currentStudent = null;


// ==========================================
// 3. SHOW A PAGE
// ==========================================

function showPage(pageId) {

    const pages = [
        "loginPage",
        "editNamePage",
        "certificatePage",
        "verifyPage"
    ];

    pages.forEach(function(id) {

        document.getElementById(id).classList.add("hidden");

    });

    document.getElementById(pageId).classList.remove("hidden");
}


// ==========================================
// 4. LOGIN
// ==========================================

document.getElementById("loginForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const studentId = document
            .getElementById("studentId")
            .value
            .trim()
            .toUpperCase();

        const password = document
            .getElementById("password")
            .value;

        const message = document.getElementById("loginMessage");

        // Find the student using their Student ID.
        const student = students.find(function(item) {

            return item.id === studentId;

        });

        if (!student) {

            message.textContent = "Student ID not found.";

            return;
        }

        // Check the student's password.
        if (student.password !== password) {

            message.textContent = "Incorrect password.";

            return;
        }

        // Remember the logged-in student.
        currentStudent = student;

        message.textContent = "";

        // If a certificate already exists, display it.
        if (currentStudent.certificateGenerated) {

            showCertificate(currentStudent);

            alert(
                "This student has already generated a certificate."
            );

            return;
        }

        // Put the registered name inside the editing field.
        document.getElementById("editedName").value =
            currentStudent.name;

        document.getElementById("nameMessage").textContent = "";

        // Show the name-editing page.
        showPage("editNamePage");

    }
);


// ==========================================
// 5. NORMALIZE NAMES
// ==========================================

function normalizeName(name) {

    return name
        .trim()
        .replace(/\s+/g, " ")
        .toLocaleLowerCase();

}


// ==========================================
// 6. EDIT AND SAVE NAME
// ==========================================

document.getElementById("editNameForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const nameInput = document.getElementById("editedName");

        const message = document.getElementById("nameMessage");

        if (!currentStudent) {

            message.textContent = "Please log in first.";

            showPage("loginPage");

            return;
        }

        const enteredName = nameInput.value.trim();

        // Do not accept an empty name.
        if (enteredName.length === 0) {

            message.textContent = "Please enter your name.";

            return;
        }

        // Compare the entered name with the registered name.
        // Uppercase and lowercase letters are ignored.
        const registeredName = normalizeName(
            currentStudent.name
        );

        const newName = normalizeName(enteredName);

        // Do not allow a different name.
        if (newName !== registeredName) {

            message.textContent =
                "You can only change the capitalization of your registered name.";

            return;
        }

        // Save the display version of the registered name.
        currentStudent.displayName = enteredName;

        message.textContent = "";

        // Continue to certificate generation.
        generateCertificate();

    }
);


// ==========================================
// 7. GENERATE CERTIFICATE
// ==========================================

function generateCertificate() {

    if (!currentStudent) {

        alert("Please log in first.");

        showPage("loginPage");

        return;
    }

    // Stop a second certificate from being generated.
    if (currentStudent.certificateGenerated) {

        alert("A certificate has already been generated.");

        showCertificate(currentStudent);

        return;
    }

    // Create a unique-looking certificate number.
    currentStudent.certificateId =
        "CERT-" + generateRandomId();

    // Record that this student has generated a certificate.
    currentStudent.certificateGenerated = true;

    // Display the certificate.
    showCertificate(currentStudent);

}


// ==========================================
// 8. GENERATE CERTIFICATE NUMBER
// ==========================================

function generateRandomId() {

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let result = "";

    for (let i = 0; i < 12; i++) {

        const randomIndex = Math.floor(
            Math.random() * characters.length
        );

        result += characters[randomIndex];

    }

    return result;

}


// ==========================================
// 9. DISPLAY CERTIFICATE
// ==========================================

function showCertificate(student) {

    const displayName = student.displayName || student.name;

    document.getElementById("certificateName").textContent =
        displayName;

    document.getElementById("certificateCourse").textContent =
        student.course;

    document.getElementById("certificateStudentId").textContent =
        student.id;

    document.getElementById("certificateId").textContent =
        student.certificateId;

    document.getElementById("certificateDate").textContent =
        new Date().toLocaleDateString();

    showPage("certificatePage");

}


// ==========================================
// 10. LOGOUT
// ==========================================

function logout() {

    currentStudent = null;

    document.getElementById("loginForm").reset();

    document.getElementById("editNameForm").reset();

    document.getElementById("loginMessage").textContent = "";

    document.getElementById("nameMessage").textContent = "";

    document.getElementById("verifyResult").innerHTML = "";

    showPage("loginPage");

}

document.getElementById("logoutButton").addEventListener(
    "click",
    logout
);

document.getElementById("cancelEditButton").addEventListener(
    "click",
    logout
);


// ==========================================
// 11. PRINT CERTIFICATE
// ==========================================

document.getElementById("printButton").addEventListener(
    "click",
    function() {

        window.print();

    }
);


// ==========================================
// 12. OPEN VERIFICATION PAGE
// ==========================================

document.getElementById("verifyPageButton").addEventListener(
    "click",
    function() {

        document.getElementById("verifyResult").innerHTML = "";

        document.getElementById("verifyForm").reset();

        showPage("verifyPage");

    }
);


// ==========================================
// 13. RETURN TO LOGIN
// ==========================================

document.getElementById("backToLoginButton").addEventListener(
    "click",
    function() {

        showPage("loginPage");

    }
);


// ==========================================
// 14. ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(character) {

        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return replacements[character];

    });

}


// ==========================================
// 15. VERIFY CERTIFICATE
// ==========================================

document.getElementById("verifyForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const enteredId = document
            .getElementById("verifyId")
            .value
            .trim()
            .toUpperCase();

        const result = document.getElementById("verifyResult");

        // Search for the certificate number.
        const student = students.find(function(item) {

            return item.certificateId === enteredId;

        });

        // Certificate not found.
        if (!student) {

            result.innerHTML = `
                <div class="invalid">
                    <h2>Invalid Certificate</h2>

                    <p>
                        This certificate could not be found.
                    </p>
                </div>
            `;

            return;
        }

        const displayName = student.displayName || student.name;

        // Certificate found.
        result.innerHTML = `
            <div class="valid">

                <h2>Certificate Verified</h2>

                <p>
                    <strong>Name:</strong>
                    ${escapeHTML(displayName)}
                </p>

                <p>
                    <strong>Student ID:</strong>
                    ${escapeHTML(student.id)}
                </p>

                <p>
                    <strong>Programme:</strong>
                    ${escapeHTML(student.course)}
                </p>

                <p>
                    <strong>Certificate Number:</strong>
                    ${escapeHTML(student.certificateId)}
                </p>

            </div>
        `;

    }
);