export type Endpoint = {
  _id: string;
  route: string;
  petitionType: "GET" | "HEAD" | "PUT" | "POST" | "DELETE" | "PATCH" | "OPTIONS";
  authentication: string;
}