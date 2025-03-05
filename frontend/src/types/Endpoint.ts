export type Endpoint = {
  _id: string;
  rute: string;
  petitionType: "GET" | "HEAD" | "PUT" | "POST" | "DELETE" | "PATCH" | "OPTIONS";
  authentication: string;
}