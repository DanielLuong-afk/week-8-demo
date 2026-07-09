// app/dashboard/movies/page.tsx
import { neo4jDriver } from "@/lib/neo4j";
 
interface MovieItem {
  title: string;
  released: number;
  tagline: string;
}
 
async function getMoviesData(): Promise<MovieItem[]> {
  // 1. Open a brief session with the connection pool
  const session = neo4jDriver.session();
 
  try {
    // 2. Execute Cypher query to pull 10 movies
    const result = await session.run(`
      MATCH (m:Movie) 
      RETURN m.title AS title, m.released AS released, m.tagline AS tagline 
      LIMIT 10
    `);
 
    // 3. Process the returned Records into native JavaScript objects
    return result.records.map((record) => {
      return {
        title: record.get("title"),
        // Neo4j handles numbers as BigInt/Integers; we convert them to JavaScript numbers
        released:
          typeof record.get("released").toNumber === "function"
            ? record.get("released").toNumber()
            : record.get("released"),
        tagline: record.get("tagline") || "No tagline available.",
      };
    });
  } catch (error) {
    console.error("Failed to query Neo4j:", error);
    return [];
  } finally {
    // 4. Always close the session to free up network sockets
    await session.close();
  }
}
 
export default async function MoviesDashboard() {
  const movies = await getMoviesData();
 
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Neo4j Integration Test
        </h1>
        <p className="text-muted-foreground text-sm">
          Successfully fetching from graph database inside Next.js Server
          Components.
        </p>
      </div>
 
      <div className="grid gap-4 md:grid-cols-2">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="p-4 border rounded-xl bg-card shadow-sm space-y-2"
          >
            <div className="flex justify-between items-start">
              <h2 className="font-semibold text-lg">{movie.title}</h2>
              <span className="text-xs bg-secondary px-2 py-0.5 rounded-full font-medium">
                {movie.released}
              </span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              "{movie.tagline}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}