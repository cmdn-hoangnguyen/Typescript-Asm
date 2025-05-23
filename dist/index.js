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
const addItem = (arrayItems, item) => {
    return [...arrayItems, item];
};
// EX-6 Class: Implement a StudentManager class
class StudentManager {
    constructor() {
        this.studentDatabase = {};
    }
    addStudent(student) {
        if (student.role === Role.Admin) {
            throw new Error("Cannot add a student with admin role");
        }
        if (this.studentDatabase[student.id]) {
            throw new Error("This student already exists");
        }
        const arrayStudents = addItem(Object.values(this.studentDatabase), student);
        this.studentDatabase[student.id] = arrayStudents[arrayStudents.length - 1];
        return this.studentDatabase;
    }
    getStudentSummary({ studentId, }) {
        const selectedStudent = this.studentDatabase[studentId];
        if (!selectedStudent) {
            throw new Error("Student not found");
        }
        const { name, role } = selectedStudent;
        return { name, role };
    }
    addGrade({ studentId, grade }) {
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
const student1 = {
    id: 1,
    name: "Hello it's me",
    grades: [100],
    role: Role.Student,
};
const student2 = {
    id: 2,
    name: "Second me",
    grades: [80],
    role: Role.Student,
};
const student3 = {
    id: 3,
    name: "Last one",
    grades: [60],
    role: Role.TeachingAssistant,
};
const manager = new StudentManager();
manager.addStudent(student1);
manager.addGrade({ studentId: student1.id, grade: 80 });
manager.addStudent(student2);
manager.addGrade({ studentId: student2.id, grade: 90 });
manager.addStudent(student3);
console.table(manager.getStudentSummary({ studentId: student1.id }));
console.table(manager.getStudentSummary({ studentId: student2.id }));
console.table(manager.getStudentSummary({ studentId: student3.id }));
console.table(manager.getDatabase());
