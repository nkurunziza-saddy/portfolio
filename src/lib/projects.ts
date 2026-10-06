import data from "../../projects.json";

export const projects = data.projects;
export type Project = (typeof projects)[number];
