import neo4j from "neo4j-driver";
 
const uri = process.env.NEO4J_URI!;
const username = process.env.NEO4J_USERNAME!;
const password = process.env.NEO4J_PASSWORD!;
 
const globalWithNeo4j = global as typeof globalThis & {
  _neo4jDriver?: import("neo4j-driver").Driver;
};
 
export const neo4jDriver =
  globalWithNeo4j._neo4jDriver ||
  neo4j.driver(uri, neo4j.auth.basic(username, password));
 
if (process.env.NODE_ENV !== "production") {
  globalWithNeo4j._neo4jDriver = neo4jDriver;
}