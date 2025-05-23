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
const addItem = <T>(arrayItems: T[], item: T): T[] => {
  return [...arrayItems, item];
};

//Ex-4 Mapped Type: Create a mapped type ReadOnlyStudent
type ReadOnlyStudent = {
  readonly [K in keyof Student]: Student[K];
};

// EX-5 Utility Types
type StudentSummary = Pick<Student, "name" | "role">;

type StudentWithoutGrades = Omit<Student, "grades">;

type StudentDatabase = Record<Student["id"], Student>;

// EX-6 Class: Implement a StudentManager class
export class StudentManager {
  private studentDatabase: StudentDatabase = {};

  addStudent(student: Student) {
    if ((student.role as Role) === Role.Admin) {
      throw new Error("Cannot add a student with admin role");
    }

    if (this.studentDatabase[student.id]) {
      throw new Error("This student already exists");
    }

    const arrayStudents = addItem(Object.values(this.studentDatabase), student);
    this.studentDatabase[student.id] = arrayStudents[arrayStudents.length - 1];

    return this.studentDatabase;
  }

  getStudentSummary({
    studentId,
  }: {
    studentId: number;
  }): StudentSummary | undefined {
    const selectedStudent = this.studentDatabase[studentId];

    if (!selectedStudent) {
      throw new Error("Student not found");
    }

    const { name, role } = selectedStudent;

    return { name, role };
  }

  addGrade({ studentId, grade }: { studentId: number; grade: number }) {
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

const student1: Student = {
  id: 1,
  name: "Hello it's me",
  grades: [100],
  role: Role.Student,
};

const student2: Student = {
  id: 2,
  name: "Second me",
  grades: [80],
  role: Role.Student,
};

const student3: Student = {
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
