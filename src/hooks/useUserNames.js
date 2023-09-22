import { useQuery, useQueryClient } from "@tanstack/react-query";

const useUserNames = (name = "") => {
  const queryClient = useQueryClient();
  const dataName = queryClient.getQueryData(["userNames"]);
  let valueName = [];
  let names = [];

  const romoveDuplicates = (arr) => {
    const uniqueSet = new Set(arr?.filter((item) => item !== ""));

    const uniqueArray = [...uniqueSet];

    return uniqueArray;
  };

  if (dataName) {
    valueName = romoveDuplicates(dataName);
    valueName?.push(name);
    names = romoveDuplicates(valueName);
  } else {
    names = [name];
  }

  useQuery(["userNames"], () => Promise.resolve(names), {
    enabled: !!name,
    refetchQueries: true,
  });

  return { names: dataName };
};
export default useUserNames;
