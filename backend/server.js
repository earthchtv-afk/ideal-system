const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let assignments = [
  {
    id: 1,
    title: "งานคณิตศาสตร์",
    description: "แบบฝึกหัดบทที่ 1",
    dueDate: "2026-10-10",
    status: "ยังไม่ส่ง"
  },
  {
    id: 2,
    title: "งานวิทยาศาสตร์",
    description: "รายงานการทดลอง",
    dueDate: "2026-10-15",
    status: "ยังไม่ส่ง"
  }
];

// GET - ดูงานทั้งหมด
app.get("/api/assignments", (req, res) => {
  res.status(200).json(assignments);
});

// GET - ดูงานตาม ID
app.get("/api/assignments/:id", (req, res) => {
  const id = Number(req.params.id);

  const assignment = assignments.find(
    (item) => item.id === id
  );

  if (!assignment) {
    return res.status(404).json({
      message: "ไม่พบงานที่ต้องการ"
    });
  }

  res.status(200).json(assignment);
});

// POST - สร้างงานใหม่
app.post("/api/assignments", (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({
      message: "กรุณากรอกข้อมูลให้ครบ"
    });
  }

  const newAssignment = {
    id: assignments.length + 1,
    title,
    description,
    dueDate,
    status: "ยังไม่ส่ง"
  };

  assignments.push(newAssignment);

  res.status(201).json(newAssignment);
});

// PUT - แก้ไขงาน
app.put("/api/assignments/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = assignments.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "ไม่พบงานที่ต้องการแก้ไข"
    });
  }

  assignments[index] = {
    ...assignments[index],
    ...req.body,
    id
  };

  res.status(200).json(assignments[index]);
});

// DELETE - ลบงาน
app.delete("/api/assignments/:id", (req, res) => {
  const id = Number(req.params.id);

  const exists = assignments.some(
    (item) => item.id === id
  );

  if (!exists) {
    return res.status(404).json({
      message: "ไม่พบงานที่ต้องการลบ"
    });
  }

  assignments = assignments.filter(
    (item) => item.id !== id
  );

  res.status(200).json({
    message: "ลบงานสำเร็จ"
  });
});

app.get("/", (req, res) => {
  res.send("Student Assignment Management API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
