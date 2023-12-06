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

// Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, welcome to your Express API!")
})

// Simple Get Practice
app.get("/test", (req: Request, res: Response) => {
  res.send("This is a test!")
})

// Query Practice
app.get("/student", (req: Request, res: Response) => {
  const queryName: string = req.query.name as string

  const benny: Student = {
    name: queryName,
    age: 17,
    grades: ["A", "B", "C", "F", "D"],
  }

  res.json(benny)
})

// Query Post + Body - Practice
app.post("/student", (req: Request, res: Response) => {
  const student: Student = req.body

  console.log(student)

  res.status(201).json(student)
})

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
