import { log } from "console"
import express, { Request, Response } from "express"

const app = express()
const PORT: number = 3000

app.use(express.json()) // Default = Disabled

// Interfaces
interface Student {
  name: string
  age: number
  grades: string[]
}

// Function Declaration
const isStudent = (student: Student) => {
  return (
    typeof student === "object" &&
    typeof student.name === "string" &&
    typeof student.age === "number" &&
    Array.isArray(student.grades) &&
    student.grades.every((index) => {
      return typeof index === "string"
    })
  )
}

// Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, welcome to your Express API!")
})

// Simple Get Practice
app.get("/test", (req: Request, res: Response) => {
  res.send("This is a test!")
})

// Query Practice
app.get("/student", (req: Request<{}, {}, {}, Student>, res: Response) => {
  const queryName = req.query.name
  const queryAge = req.query.age
  const queryGrades = req.query.grades

  const benny: Student = {
    name: queryName,
    age: queryAge,
    grades: queryGrades,
  }

  res.json(benny)
})

// Query Post + Body - Practice
app.post("/student", (req: Request, res: Response) => {
  if (isStudent(req.body)) {
    res.status(201).json(req.body)
  } else {
    res.status(400).send("Bad Request")
  }
})

// Listen
app.listen(PORT, () => {
  const student = {
    name: "Benny",
    age: 100,
    grades: ["abba", "banan"],
  }

  console.log(`Server is running on http://localhost:${PORT}`)
  console.log(typeof student === "object")
  console.log(typeof student.name === "string")
  console.log(typeof student.age === "number")
  console.log(Array.isArray(student.grades))
  console.log(
    student.grades.every((value) => {
      return typeof value === "string"
    })
  )
})
