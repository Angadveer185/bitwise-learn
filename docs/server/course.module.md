This file contains all the information regarding the Course module that has been created so far in the project. The following task is what is contained in the document.

## Topics Contained

- `Controllers Involved`
- `API Documentation`

## Controllers Involved

For the execution of the code, there are a few classes that are involved, them being `course-assignment`,`course-content`,`course-grade`,`course-progress`,`course`.

The system is designed around real-world learning workflows rather than prematurely over-engineered abstractions.
Each class corresponds to a distinct business capability (`course management`, `assignments`, `progress tracking`,` coding problems`, `submissions`).

Key LLD goals followed:

- `High cohesion`: Related data and behavior stay together
- `Clear ownership`: Each class answers “who is responsible for this?”
- `Scalability-friendly`: Can be refactored into finer-grained components later
- `Pragmatic SOLID application`: Principles are respected where valuable, consciously relaxed where speed and simplicity matter

---

Course Controller

- Manages course lifecycle and core metadata (title, description, instructor, price, visibility)
- Acts as the aggregate root of the learning domain
- Other modules depend on it for course identity

LLD Alignment

- SRP: Focused only on course definition and configuration
- Encapsulation: Course state changes via controlled operations
- High cohesion: Everything represents what a course is

Why not merged with content or progress?
Course definition is different from learner interaction.

---

CourseContent Controller

- Manages instructional material such as videos, readings, sections, and ordering
- Structures how content is delivered to learners

Justification

- Content changes independently of assignments and grading
- Instructors update content without impacting learner state

LLD Alignment

- SRP: Handles instructional material only
- OCP: New content types can be added without modifying existing logic
- Loose coupling with Course

---

CourseAssignment Controller

- Handles assignment creation, deadlines, and submission rules
- Links assignments to specific course modules

Why separate from content?
Content is passive, while assignments are evaluative and interactive

LLD Alignment

- SRP: Focused on assessment definition
- Clear separation of concerns
- Easily extensible for auto-grading or peer reviews

---

CourseGrade Controller

- Responsible for grade calculation, storage, and evaluation logic

Justification

- Grading rules evolve frequently and must remain isolated

LLD Alignment

- SRP: Dedicated solely to grading
- DIP: Depends on submission abstractions, not concrete implementations
- Supports multiple grading strategies

---

CourseProgress Controller

- Tracks learner progress, completion percentage, and milestones

Why separate from grades?
Progress does not imply performance; completion ≠ score

LLD Alignment

- SRP: Progress tracking only
- High cohesion
- Supports analytics and learner dashboards independently

## API Documentation

The api Documentation of the DSA propotion is linked in the url to [postman](https://documenter.getpostman.com/view/38279441/2sBXVhCW4x).
