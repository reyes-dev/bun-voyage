import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListDragonsView } from "./views/list-dragons/list-dragons-view";

/* -- Set up react-query and consume spacex api
 * - Focus on displaying any data with simple queries for now
 * - Later try implementing infinite scrolling (assuming the spacex API has enough data)
 * -- Styled Components and CSS
 * - flex layout with buttons to filter ships
 * - grid layout to display the ships in cards
 * */

const queryClient = new QueryClient();

function Homepage() {
  return (
    <>
      <h1>Bun Voyage</h1>
      <main>
        <ListDragonsView />
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
