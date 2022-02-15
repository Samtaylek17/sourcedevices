import api from './api';

interface User {
  id: string;
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  registerDate?: string;
  updatedDate?: string;
}

export async function createUser({ firstName, lastName, email, title, file }): Promise<User> {
  const url = `${process.env.REACT_APP_BASE_URL}/user/create`;
  return api.post(
    url,
    { firstName, lastName, email, title, file },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
}

export async function getAllUsers(): Promise<any> {
  const url = `${process.env.REACT_APP_BASE_URL}/user`;
  return api.get(url);
}

export async function getUser(id: string): Promise<User> {
  const url = `${process.env.REACT_APP_BASE_URL}/user/${id}`;
  return api.get(url);
}
