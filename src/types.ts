// base interface for all resources
interface BaseInterface {
  readonly id: string | undefined;
}

interface User extends BaseInterface {
  readonly type: "user";
  username: string;
  roleId: string;
  isActive: boolean;
}

interface Post extends BaseInterface {
  readonly type: "post";
  title: string;
  content: string;
  isActive: boolean;
  userId: string;
}

interface Comment extends BaseInterface {
  readonly type: "comment";
  postId: string;
  content: string;
  isActive: boolean;
}

interface Role extends BaseInterface {
  readonly type: "role";
  name: string;
  count: number;
  isActive: boolean;
}

// union type
type Resource = User | Post | Comment | Role;

export type { BaseInterface, User, Post, Comment, Role, Resource };
