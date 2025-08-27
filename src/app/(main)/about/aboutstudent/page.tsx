import Link from "next/link";

const AboutStudent = () => {
  const students = [
    { id: 1, name: "Student 1" },
    { id: 2, name: "Student 2" },
    { id: 3, name: "Student 3" },
  ];

  return (
    <div>
      <h1>Student List</h1>
      {students.map((s) => (
        <h2 key={s.id}>
          {/* yahan dynamic route ka link */}
          <Link href={`/about/aboutstudent/${s.id}`}>{s.name}</Link>
        </h2>
      ))}
    </div>
  );
};

export default AboutStudent;
