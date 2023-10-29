import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListDragonsView } from "./views/list-dragons/list-dragons-view";
import { ListCrewView } from "./views/list-crew/list-crew-view";

/* -- Set up react-query and consume spacex api
 * - Focus on displaying any data with simple queries for now
 * - Later try implementing infinite scrolling (assuming the spacex API has enough data)
 * - I'll write a default query function since every endpoint works basically the same
 * -- Styled Components and CSS
 * - flex layout with buttons to filter ships
 * - grid layout to display the ships in cards
 * */

// Defining a default query function that receives a query key
const defaultQueryFn = async ({ queryKey }) => {
  const data = await fetch(`https://api.spacexdata.com/v4${queryKey[0]}`);
  return data.json();
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

function Homepage() {
  return (
    <>
      <h1>Bun Voyage</h1>
      <main>
        <ListCrewView />
      </main>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Homepage />
    </QueryClientProvider>
  );
}
