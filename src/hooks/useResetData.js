import { useQueryClient } from "@tanstack/react-query";

const useResetData = (initialScore) => {
  const queryClient = useQueryClient();

  const updateData = async () => {
    await queryClient.refetchQueries(["successes"]);
    await queryClient.refetchQueries(["errors"]);
  };
  if (initialScore) {
    updateData();
  }
};
export default useResetData;
