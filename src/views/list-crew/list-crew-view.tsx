import { useQuery } from "@tanstack/react-query";
import { ListCrewUI } from "./list-crew-ui";

export const ListCrewView = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["/crew"],
  });

  if (isPending) return "Loading SpaceX data...";

  if (isError) return "An error has occurred: " + error.message;

  return <ListCrewUI crew={data} />;
};
