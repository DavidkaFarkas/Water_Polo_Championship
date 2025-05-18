export interface User {
  id: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  tasks: string[];
  position?: string;
}