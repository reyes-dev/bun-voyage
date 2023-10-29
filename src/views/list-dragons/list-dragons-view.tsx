import { useQuery } from "@tanstack/react-query";
import { ListDragonsUI } from "./list-dragons-ui";

export const ListDragonsView = () => {
  const fetchDragons = async () => {
    const data = await fetch("https://api.spacexdata.com/v4/dragons");
    return data.json();
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["dragons"],
    queryFn: fetchDragons,
  });

  if (isPending) return "Loading SpaceX data...";

  if (isError) return "An error has occurred: " + error.message;

  return <ListDragonsUI dragons={data} />;
};
