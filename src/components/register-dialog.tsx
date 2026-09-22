import { useState } from "react";
import { UserPlus } from "lucide-react";
import type { Course, Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RegisterDialogProps = {
  availableCourses: Course[];
  student: Student;
  onRegister: (courseId: string, time: string) => void;
};

function currentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function RegisterDialog({
  availableCourses,
  student,
  onRegister,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [time, setTime] = useState(currentTime);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      setCourseId("");
      setTime(currentTime());
    }
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!courseId || !time) return;

    onRegister(courseId, time);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button disabled={availableCourses.length === 0} />}
      >
        <UserPlus className="size-4" />
        ลงทะเบียน
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>
              เลือกวิชาและเวลาที่ต้องการลงทะเบียน
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="courseId">วิชา</Label>
            <Select
              items={availableCourses.map((course) => ({
                label: `${course.courseId} – ${course.courseTitle}`,
                value: course.courseId,
              }))}
              value={courseId || null}
              onValueChange={(value) => setCourseId(value ?? "")}
            >
              <SelectTrigger id="courseId" className="min-w-0 w-full max-w-full overflow-hidden">
                <SelectValue placeholder="เลือกวิชา" className="min-w-0 truncate" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {availableCourses.map((course) => (
                    <SelectItem key={course.courseId} value={course.courseId}>
                      {course.courseId} – {course.courseTitle}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เลือกเวลา</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>
            <Input
              id="fullName"
              value={`${student.firstName} ${student.lastName}`}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input id="program" value={student.program} readOnly />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId || !time}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}