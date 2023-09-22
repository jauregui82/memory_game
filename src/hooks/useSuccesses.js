import { useQuery, useQueryClient } from "@tanstack/react-query";

const useSuccesses = (score = 0, initialScore) => {
  const queryClient = useQueryClient();
  const dataScore = queryClient.getQueryData(["successes"]);
  const valueScore = initialScore ? 0 : score;

  useQuery(["successes"], () => Promise.resolve(valueScore), {
    enabled: score != dataScore && score != 0,
    refetchQueries: true,
  });

  return { score: dataScore };
};
export default useSuccesses;
