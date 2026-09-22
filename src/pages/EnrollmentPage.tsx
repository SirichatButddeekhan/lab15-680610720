import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments } from "@/lib/mock-data";
import type { Enrollment } from "@/lib/types";

export default function EnrollmentPage() {
  const [registrations, setRegistrations] =
    useState<Enrollment[]>(enrollments);

  const availableCourses = courses.filter(
    (course) =>
      !registrations.some(
        (item) =>
          item.studentId === currentStudent.studentId &&
          item.courseId === course.courseId,
      ),
  );

  function registerCourse(courseId: string, time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    const selectedDate = new Date();
    selectedDate.setHours(hours, minutes, 0, 0);

    setRegistrations((previous) => [
      ...previous,
      {
        studentId: currentStudent.studentId,
        courseId,
        enrolledAt: selectedDate.toISOString(),
      },
    ]);
  }

  function cancelEnrollment(courseId: string) {
    setRegistrations((previous) =>
      previous.filter(
        (item) =>
          !(
            item.studentId === currentStudent.studentId &&
            item.courseId === courseId
          ),
      ),
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground">
            {currentStudent.firstName} {currentStudent.lastName} ({currentStudent.studentId})
          </p>
        </div>
        <RegisterDialog
          availableCourses={availableCourses}
          student={currentStudent}
          onRegister={registerCourse}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = registrations.find(
            (item) =>
              item.studentId === currentStudent.studentId &&
              item.courseId === course.courseId,
          );

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              enrolledAt={enrollment?.enrolledAt}
              onCancel={cancelEnrollment}
            />
          );
        })}
      </div>
    </div>
  );
}