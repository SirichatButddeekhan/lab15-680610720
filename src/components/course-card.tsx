import { Trash2 } from "lucide-react";
import type { Course, Student } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onCancel: (courseId: string) => void;
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  onCancel,
}: CourseCardProps) {
  const isEnrolled = Boolean(enrolledAt);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.courseTitle}</CardTitle>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
        <CardAction>
          <Badge
            className={
              isEnrolled
                ? "bg-[#FFF0D8] text-[#BB4D00] dark:bg-purple-900 dark:text-purple-200"
                : "bg-[#F4E3FF] text-[#8200DA] dark:bg-amber-900 dark:text-amber-200"
            }
          >
            {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="flex items-end justify-between gap-4">
        {isEnrolled ? (
          <>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                ชื่อ นศ.: {student.firstName} {student.lastName}
              </p>
              <p>โปรแกรม: {student.program}</p>
              <p>
                ลงทะเบียนเมื่อ:{" "}
                {new Date(enrolledAt!).toLocaleString("th-TH", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`ยกเลิกการลงทะเบียน ${course.courseTitle}`}
              onClick={() => onCancel(course.courseId)}
            >
              <Trash2 />
            </Button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">ยังไม่ได้ลงทะเบียน</p>
        )}
      </CardContent>
    </Card>
  );
}
