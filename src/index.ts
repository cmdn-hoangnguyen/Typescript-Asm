// Ex-1 Enum: Create an enum Role to represent student roles
enum Role {
  Student = "STUDENT",
  TeachingAssistant = "TEACHING_ASSISTANT",
  Admin = "ADMIN",
}

// Ex-2 Interface: Define a Student interface
interface Student {
  id: number;
  name: string;
  grades: number[];
  role: Role;
}

// Ex-3 Generics: Write a generic function addItem<T> to add items (e.g., students or grades) to an array,
function addItem<T>(arrayItems: T[], item: T): T[] {
  return [...arrayItems, item];
}

//Ex-4 Mapped Type: Create a mapped type ReadOnlyStudent
type ReadOnlyStudent = {
  [K in keyof Student as `readonly ${K}`]: Student[K];
};

// EX-5 Utility Types
type StudentSummary = Pick<Student, "name" | "role">;

type StudentWithoutGrades = Omit<Student, "grades">;

type StudentDatabase = Record<Student["id"], Student>;

// EX-6 Class: Implement a StudentManager class
export class StudentManager {
  private studentDatabase: StudentDatabase = {};

  updateStudentDatabase(updatedStudents: Student[]) {
    return (this.studentDatabase = Object.fromEntries(
      updatedStudents.map((student) => [student.id, student])
    ) as StudentDatabase);
  }

  addStudent(student: Student) {
    if ((student.role as unknown as Role) === Role.Admin) {
      throw new Error("Cannot add a student with admin role");
    }

    if (this.studentDatabase[student.id]) {
      throw new Error("This student already exists");
    }

    const arrayStudents = Object.values(this.studentDatabase);
    const updatedStudents = addItem(arrayStudents, student);

    this.updateStudentDatabase(updatedStudents);

    return this.studentDatabase;
  }

  getStudentSummary(id: number): StudentSummary | undefined {
    const selectedStudent = this.studentDatabase[id];

    if (!selectedStudent) {
      throw new Error("Student not found");
    }

    const { name, role } = selectedStudent;

    return { name, role };
  }

  addGrade(studentId: number, grade: number) {
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

manager.addStudent({
  id: 3,
  name: "Last one",
  grades: [50],
  role: Role.TeachingAssistant,
});

console.table(manager.getStudentSummary(1));
console.table(manager.getStudentSummary(2));
console.table(manager.getStudentSummary(3));
console.table(manager.getDatabase());
