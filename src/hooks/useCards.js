import { fetchCards } from "../services/cards";
import { useQuery } from "@tanstack/react-query";

export const useCards = () => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["itemsCards"],
    queryFn: fetchCards,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 3,
  });

  return {
    refetch,
    isLoading,
    isError,
    data: data?.cards,
  };
};
