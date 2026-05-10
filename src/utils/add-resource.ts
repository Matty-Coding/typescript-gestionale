import type {
  Post,
  Resource,
  User,
  Comment,
  Role,
} from "../types/resources.js";

const addResource: Record<string, Resource> = {
  users: {
    id: "",
    type: "user",
    username: "",
    roleId: "",
    isActive: true,
  } as User,
  posts: {
    id: "",
    type: "post",
    title: "",
    content: "",
    isActive: true,
    userId: "",
  } as Post,
  comments: {
    id: "",
    type: "comment",
    postId: "",
    content: "",
    isActive: true,
  } as Comment,
  roles: { id: "", type: "role", name: "", count: 0, isActive: true } as Role,
};

export { addResource };
