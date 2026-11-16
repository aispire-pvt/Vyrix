import { W, Y } from './theme';

export const PROBLEMS = [
  ['01', 'Too much to organise', 'Notes, screenshots, documents and tabs. Finding the right info takes time you don’t have.'],
  ['02', 'Not sure what’s next', 'Many ideas and unfinished tasks, but no clear view of what deserves attention first.'],
  ['03', 'Gaps you haven’t spotted', 'Are your insights strong enough? Have you missed an assumption or a user need?'],
  ['04', 'Running out of time', 'Research to finish, decisions to make, work to present. Everything feels urgent.'],
];

export const FEATURES: [string, string, string, string[], string][] = [
  ['01', 'Project Roadmap', 'Turn goals into a clearer path and see what needs attention next.', ['Work through defined project phases', 'Track progress and pending actions', 'AI-assisted next-step suggestions'], Y],
  ['02', 'Flow : Project Based repository', 'A dynamic space for your project resources, always accessible.', ['Store files, links and references', 'Bring Flow into notes and AI chats', 'Keep project information connected'], W],
  ['03', 'AI across your workspace', 'A dynamic space for your project resources, always accessible.', ['Store files, links and references', 'Bring Flow into notes and AI chats', 'Keep project information connected'], W],
  ['04', 'Notes', 'Keep your thinking and working material together.', ['Create notes and whiteboards', 'Export notes and whiteboards', 'Bring all file types into one place'], Y],
];

export const CHECKS = [
  'Validation loops. Feed it your assumptions — it tells you if your project actually supports them.',
  'Gap spotting. It flags blind spots in your project before you present.',
  'Reasoning transparency. You see why it suggests something, so you can disagree if needed.',
];

export const QUOTES = [
  '"Your concept shows strong Desire and Viability, but you\'ll need to address feasibility challenges before advancing further."',
  'Suggested next step: interview 2-3 non-student users before finalizing this persona.',
  'Your synthesis in Phase 2 is solid. Ready to move into validation.',
];

export const STATS: [number, string, string][] = [
  [250, '+', 'Students from UPES, NID, & NIFT in Beta 1 & 2'],
  [420, '+', 'Projects already organized'],
  [94, '%', 'Would recommend to classmates'],
];

export const REVIEWS = [
  ['The Roadmap, Flow repository and Workspace. Loved the range of customization in the native Vyrix document. Being able to add Canva/Figma file directly is such a cool feature. Being able to mark projects complete or Incomplete. And being able to sort the projects in the folders in order of priority.', 'Raunak Arora', 'B.Des, UPES · Sem 7'],
  ['Well, to look back I had AI that I could use at an instant to find research papers related to the subject and the fact that i could upload a lot of different types of files into one place. Also the To do list being In the front space of the app really helped me (I normally don\'t use to-dos - hence getting distracted) stay focused as I was eager to check something off the list.', 'Shivika Dubey', 'B.Des, NID · Sem 7'],
];
