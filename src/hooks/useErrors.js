import { useQuery, useQueryClient } from "@tanstack/react-query";

const useErrors = (error = 0, initialScore) => {
  const queryClient = useQueryClient();
  const dataError = queryClient.getQueryData(["errors"]);
  const valueError = initialScore ? 0 : error;

  useQuery(["errors"], () => Promise.resolve(valueError), {
    enabled: error != dataError && error != 0,
    refetchQueries: true,
  });

  return { errors: dataError };
};
export default useErrors;
