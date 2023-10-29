import { useInfiniteQuery } from "@tanstack/react-query";
import { ListCrewUI } from "./list-crew-ui";

export const ListCrewView = () => {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["/crew"],
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.page + 1,
  });

  if (isPending) return "Loading SpaceX data...";

  if (isError) return "An error has occurred: " + error.message;

  return (
    <main>
      <ListCrewUI
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </main>
  );
};
