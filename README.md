<h1 align="center">LudoLang</h1>

<p align="center">
  Ludolang is a language learning site heavily inspired by Duolingo. I made this project as a strictly non-commercial way to showcase my skills and hopefully help others make similar educational websites.
</p>

## Important

I made this project a while ago and there are some architectural choices I regret. I will slowly work on cleaning up this project and adding more documentation.

## Setup and Installation

1. Clone the project using `git clone <https://github.com/jokerhutt/duoclone.git`>
2. Run `npm i`
3. Fill the src/constants/env.ts directory with your backend api path and google client id
4. Adjust the src/constants/paths.ts API paths as needed
5. Run `npm run dev`

## Features

- Courses, Sections, and Units
- Google OAuth
- Caching with Tanstack Query
- Fill in the blank exercises
- Translate the sentence exercises
- Leaderboards
- Lesson Accuracy
- Scroll to current lesson button
- Popovers and Modals
- Skipping lessons
- Profiles and Avatars
- Follow System
- Streaks
- Daily Quests & Monthly Challenges

## Technologies Used

- React
- Typescript
- TailwindCSS
- Tanstack Query
- Framer Motion
- Spring Boot (backend)
- MySQL (database)

## Structure and Notes

### **Content Hierarchy**

Course → Section → Unit → Lesson → Exercise

### **Mutations (POST REQUESTS)**

Mutations can be found under src/queries/mutations

**There are 4 main mutations:**
| Mutation | Hook |
| ----------- | ----------- |
| Submitting an exercise attempt | useSubmitExercise |
| Submitting a lesson completion | useLessonComplete |
| Changing course | useChangeCourse |
| Follow / Unfollow | useFollowUser |
