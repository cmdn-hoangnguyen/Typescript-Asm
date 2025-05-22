"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentManager = void 0;
// Ex-1 Enum: Create an enum Role to represent student roles
var Role;
(function (Role) {
    Role["Student"] = "STUDENT";
    Role["TeachingAssistant"] = "TEACHING_ASSISTANT";
    Role["Admin"] = "ADMIN";
})(Role || (Role = {}));
// Ex-3 Generics: Write a generic function addItem<T> to add items (e.g., students or grades) to an array,
function addItem(arrayItems, item) {
    return [...arrayItems, item];
}
// EX-6 Class: Implement a StudentManager class
class StudentManager {
    constructor() {
        this.studentDatabase = {};
    }
    addStudent(student) {
        if (student.role === Role.Admin) {
            throw new Error("Cannot add a student with admin role");
        }
        this.studentDatabase[student.id] = student;
        return this.studentDatabase;
    }
    getStudentSummary(id) {
        const selectedStudent = this.studentDatabase[id];
        if (!selectedStudent) {
            throw new Error("Student not found");
        }
        const { name, role } = selectedStudent;
        return { name, role };
    }
    addGrade(studentId, grade) {
        const selectedStudent = this.studentDatabase[studentId];
        if (!selectedStudent) {
            throw new Error("Student not found");
        }
        selectedStudent.grades = addItem(selectedStudent.grades, grade);
        return (this.studentDatabase[studentId] = selectedStudent);
    }
    getDatabase() {
        return this.studentDatabase;
    }
}
exports.StudentManager = StudentManager;
const manager = new StudentManager();
manager.addStudent({
    id: 1,
    name: "Hello it's me",
    grades: [100],
    role: Role.Student,
});
manager.addGrade(1, 80);
manager.addStudent({
    id: 2,
    name: "Second me",
    grades: [70],
    role: Role.Student,
});
manager.addGrade(2, 90);
console.table(manager.getStudentSummary(1));
console.table(manager.getStudentSummary(2));
console.table(manager.getDatabase());
