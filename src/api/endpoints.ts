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

interface Post {
  id: string;
  image: string;
  likes: number;
  tags: string[];
  text: string;
  publishDate: string;
  owner: Partial<User>;
}

/** Users Endpoints */

/**
 *
 * @param param0 {firstName, lastName, email, title, file}
 * @returns User object
 */
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

/**
 *
 * @param param0 {limit, page}
 * @returns Users Array
 */
export async function getAllUsersWithFilters({
  limit,
  page
}: {
  limit?: number;
  page?: number;
}): Promise<any> {
  const url = `${process.env.REACT_APP_BASE_URL}/user?limit=${limit}&page=${page}`;
  return api.get(url);
}

/**
 *
 * @returns Users Array
 */
export async function getAllUsers(): Promise<any> {
  const url = `${process.env.REACT_APP_BASE_URL}/user`;
  return api.get(url);
}

export async function getUser(id: string): Promise<any> {
  const url = `${process.env.REACT_APP_BASE_URL}/user/${id}`;
  return api.get(url);
}

// Posts Endpoints

/**
 *
 * @returns Post Array
 */
export async function getAllPosts(): Promise<any> {
  const url = `${process.env.REACT_APP_BASE_URL}/post`;
  return api.get(url);
}

export async function getAllPostsWithFilter({
  limit,
  page
}: {
  limit: number;
  page: number;
}): Promise<any> {
  const url = `${process.env.REACT_APP_BASE_URL}/post?limit=${limit}&page=${page}`;
  return api.get(url);
}

/**
 *
 * @param id
 * @returns Post object
 */
export async function getPost(id: string): Promise<any> {
  const url = `${process.env.REACT_APP_BASE_URL}/post${id}`;
  return api.get(url);
}
