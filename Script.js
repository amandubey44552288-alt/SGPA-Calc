/* =====================================================
   GRADE POINTS
===================================================== */

const gradePoints = {

    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C+": 6,
    "C": 5,
    "D": 4,
    "F": 0

};


/* =====================================================
   CONTAINERS
===================================================== */

const subjectContainer =
    document.getElementById("subjectContainer");

const semesterContainer =
    document.getElementById("semesterContainer");


/* =====================================================
   ADD SUBJECT
===================================================== */

function addSubject() {

    const row =
        document.createElement("div");

    row.className =
        "subject-row";


    row.innerHTML = `

        <input
            type="text"
            class="subject-name"
            placeholder="e.g. Data Structures"
        >

        <input
            type="number"
            class="subject-credit"
            placeholder="4"
            min="0.5"
            max="20"
            step="0.5"
        >

        <select class="subject-grade">

            <option value="O">
                O - 10
            </option>

            <option value="A+">
                A+ - 9
            </option>

            <option value="A" selected>
                A - 8
            </option>

            <option value="B+">
                B+ - 7
            </option>

            <option value="B">
                B - 6
            </option>

            <option value="C+">
                C+ - 6
            </option>

            <option value="C">
                C - 5
            </option>

            <option value="D">
                D - 4
            </option>

            <option value="F">
                F - 0
            </option>

        </select>

        <button
            type="button"
            class="delete-btn"
            aria-label="Delete subject"
        >
            🗑️
        </button>

    `;


    /* Delete subject */

    row
        .querySelector(".delete-btn")
        .addEventListener(
            "click",
            function () {

                row.remove();

                calculateSGPA();

            }
        );


    /* Credits change */

    row
        .querySelector(".subject-credit")
        .addEventListener(
            "input",
            calculateSGPA
        );


    /* Grade change */

    row
        .querySelector(".subject-grade")
        .addEventListener(
            "change",
            calculateSGPA
        );


    /* Add row */

    subjectContainer.appendChild(row);


    /* Calculate */

    calculateSGPA();

}


/* =====================================================
   CALCULATE SGPA
===================================================== */

function calculateSGPA() {

    const rows =
        subjectContainer.querySelectorAll(
            ".subject-row"
        );


    let totalCredits = 0;

    let totalGradePoints = 0;


    rows.forEach(function (row) {

        const credits =
            parseFloat(
                row.querySelector(
                    ".subject-credit"
                ).value
            );


        const grade =
            row.querySelector(
                ".subject-grade"
            ).value;


        if (
            isNaN(credits) ||
            credits <= 0
        ) {

            return;

        }


        const point =
            gradePoints[grade];


        totalCredits += credits;

        totalGradePoints +=
            credits * point;

    });


    let sgpa = 0;


    if (totalCredits > 0) {

        sgpa =
            totalGradePoints /
            totalCredits;

    }


    document.getElementById(
        "sgpaResult"
    ).textContent =
        sgpa.toFixed(2);


    document.getElementById(
        "totalCredits"
    ).textContent =
        formatNumber(totalCredits);


    document.getElementById(
        "totalPoints"
    ).textContent =
        totalGradePoints.toFixed(2);


    let message =
        "Add subjects";


    if (totalCredits > 0) {

        if (sgpa >= 9) {

            message =
                "Excellent performance";

        } else if (sgpa >= 8) {

            message =
                "Very good performance";

        } else if (sgpa >= 7) {

            message =
                "Good performance";

        } else if (sgpa >= 6) {

            message =
                "Keep improving";

        } else {

            message =
                "Keep working hard";

        }

    }


    document.getElementById(
        "sgpaMessage"
    ).textContent =
        message;

}


/* =====================================================
   CLEAR SUBJECTS
===================================================== */

function clearSubjects() {

    subjectContainer.innerHTML = "";


    addSubject();

    addSubject();

    addSubject();

}


/* =====================================================
   ADD SEMESTER
===================================================== */

function addSemester() {

    const row =
        document.createElement("div");

    row.className =
        "semester-row";


    const semesterNumber =
        semesterContainer.children.length + 1;


    row.innerHTML = `

        <input
            type="text"
            class="semester-name"
            value="Semester ${semesterNumber}"
        >

        <input
            type="number"
            class="semester-sgpa"
            placeholder="SGPA"
            min="0"
            max="10"
            step="0.01"
        >

        <input
            type="number"
            class="semester-credit"
            placeholder="Credits"
            min="0"
            step="0.5"
        >

        <button
            type="button"
            class="delete-btn"
            aria-label="Delete semester"
        >
            🗑️
        </button>

    `;


    /* Delete semester */

    row
        .querySelector(".delete-btn")
        .addEventListener(
            "click",
            function () {

                row.remove();

                calculateCGPA();

            }
        );


    /* SGPA input */

    row
        .querySelector(".semester-sgpa")
        .addEventListener(
            "input",
            calculateCGPA
        );


    /* Credits input */

    row
        .querySelector(".semester-credit")
        .addEventListener(
            "input",
            calculateCGPA
        );


    semesterContainer.appendChild(row);


    calculateCGPA();

}


/* =====================================================
   CALCULATE CGPA
===================================================== */

function calculateCGPA() {

    const rows =
        semesterContainer.querySelectorAll(
            ".semester-row"
        );


    let totalCredits = 0;

    let weightedPoints = 0;

    let validSemesters = 0;


    rows.forEach(function (row) {

        const sgpa =
            parseFloat(
                row.querySelector(
                    ".semester-sgpa"
                ).value
            );


        const credits =
            parseFloat(
                row.querySelector(
                    ".semester-credit"
                ).value
            );


        if (
            isNaN(sgpa) ||
            isNaN(credits) ||
            credits <= 0 ||
            sgpa < 0 ||
            sgpa > 10
        ) {

            return;

        }


        weightedPoints +=
            sgpa * credits;


        totalCredits +=
            credits;


        validSemesters++;

    });


    let cgpa = 0;


    if (totalCredits > 0) {

        cgpa =
            weightedPoints /
            totalCredits;

    }


    document.getElementById(
        "cgpaResult"
    ).textContent =
        cgpa.toFixed(2);


    document.getElementById(
        "cgpaCredits"
    ).textContent =
        formatNumber(totalCredits);


    document.getElementById(
        "semesterCount"
    ).textContent =
        validSemesters;


    let message =
        "Add semesters";


    if (validSemesters > 0) {

        if (cgpa >= 9) {

            message =
                "Excellent performance";

        } else if (cgpa >= 8) {

            message =
                "Very good performance";

        } else if (cgpa >= 7) {

            message =
                "Good performance";

        } else if (cgpa >= 6) {

            message =
                "Keep improving";

        } else {

            message =
                "Keep working hard";

        }

    }


    document.getElementById(
        "cgpaMessage"
    ).textContent =
        message;

}


/* =====================================================
   CLEAR SEMESTERS
===================================================== */

function clearSemesters() {

    semesterContainer.innerHTML = "";


    addSemester();

    addSemester();

    addSemester();

}


/* =====================================================
   SWITCH BETWEEN SGPA AND CGPA
===================================================== */

function showCalculator(type) {

    const sgpaCalculator =
        document.getElementById(
            "sgpaCalculator"
        );


    const cgpaCalculator =
        document.getElementById(
            "cgpaCalculator"
        );


    const sgpaButton =
        document.getElementById(
            "sgpaTabButton"
        );


    const cgpaButton =
        document.getElementById(
            "cgpaTabButton"
        );


    if (type === "sgpa") {

        sgpaCalculator.classList.remove(
            "hidden"
        );

        cgpaCalculator.classList.add(
            "hidden"
        );


        sgpaButton.classList.add(
            "active"
        );

        cgpaButton.classList.remove(
            "active"
        );

    } else {

        sgpaCalculator.classList.add(
            "hidden"
        );

        cgpaCalculator.classList.remove(
            "hidden"
        );


        sgpaButton.classList.remove(
            "active"
        );

        cgpaButton.classList.add(
            "active"
        );

    }

}


/* =====================================================
   FORMAT NUMBER
===================================================== */

function formatNumber(number) {

    if (Number.isInteger(number)) {

        return number.toString();

    }


    return number.toFixed(1);

}


/* =====================================================
   INITIAL SUBJECTS
===================================================== */

addSubject();

addSubject();

addSubject();


/* =====================================================
   INITIAL SEMESTERS
===================================================== */

addSemester();

addSemester();

addSemester();
