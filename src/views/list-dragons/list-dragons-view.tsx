import { useQuery } from "@tanstack/react-query";
import { ListDragonsUI } from "./list-dragons-ui";

export const ListDragonsView = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["/dragons"],
  });

  if (isPending) return "Loading SpaceX data...";

  if (isError) return "An error has occurred: " + error.message;

  return <ListDragonsUI dragons={data} />;
};
