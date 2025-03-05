export type User = {
  _id: string;
  name: string;
  password: string;
  email: string;
  type: "ADMIN" | "USER";
  idiom: string;
}