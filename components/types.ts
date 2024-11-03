export type Task = {
  title: string;
  description: string;
  completed: boolean;
};

export type ListIndex = {
  title: string;
  category: Category;
  favorite: boolean;
};

export interface TaskList {
  title: string;
  category: Category;
  tasks: Task[];
}

export enum Category {
  Food = "Food",
  Sport = "Sport",
  Travel = "Travel",
  Finance = "Finance",
  Transport = "Transport",
  Books = "Books",
  Shopping = "Shopping",
  Health = "Health",
  Education = "Education",
  Technology = "Technology",
  Entertainment = "Entertainment",
}
