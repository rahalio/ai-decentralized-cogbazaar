export type Role =
  | "buyer"
  | "provider"
  | "publisher"
  | "fundAdmin"
  | "compliance"
  | "operator";

export const ROLE_HOME: Record<Role, string> = {
  buyer: "/",
  provider: "/provider",
  publisher: "/publisher",
  fundAdmin: "/grants",
  compliance: "/policy",
  operator: "/statements",
};
