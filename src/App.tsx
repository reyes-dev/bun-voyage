import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListDragonsView } from "./views/list-dragons/list-dragons-view";
import { ListCrewView } from "./views/list-crew/list-crew-view";

/* -- Set up react-query and consume spacex api
 * - Focus on displaying any data with simple queries for now
 * - Upgrade the 'load more' style of fetching more content to an 'infinite scroll' style
 * -- Styled Components and CSS
 * - flex layout with buttons to query different endpoints
 * - grid layout to display cards in 3's
 * */

// Defining a default query function that receives a query key
const defaultQueryFn = async ({ queryKey, pageParam }) => {
  const data = await fetch(
    `https://api.spacexdata.com/v4${queryKey[0]}/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        options: { page: pageParam, limit: 3 },
      }),
    },
  );
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
      <ListCrewView />
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
