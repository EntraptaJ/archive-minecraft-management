export interface Project {
  _id: string;

  name: string;

  title: string;

  markdown: string;

  duedate: string;

  group: number;

  children: Children[];
}

export interface Folder {
  _id: string
  name: string
  children: Children[]
}

export type Children = Project | Folder

export interface Group {
  title: string
  id: number
}

export interface MutationResponse {
  sucess: boolean
}