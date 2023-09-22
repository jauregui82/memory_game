const delay = async (ms) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

const convertData = (initialData) => {
  const convertedData = initialData?.map((entry) => {
    const { url, title, uuid } = entry.fields.image;
    return {
      id: uuid,
      title,
      img: url,
      stat: "",
    };
  });

  return convertedData;
};

const duplicateAndSliceData = (data) => {
  if (!data) {
    return;
  }
  const slicedData = data?.slice(0, 8); // Tomar los primeros 8 elementos
  const duplicatedData = [];

  slicedData?.forEach((item) => {
    duplicatedData.push(item); // Agregar el elemento original
    duplicatedData.push({ ...item }); // Agregar una copia del elemento
  });

  return duplicatedData;
};

export const fetchCards = async ({ pageParam = 20 }) => {
  await delay(300);

  return await fetch(
    `https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=${pageParam}`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error("Error en la petición");
      return await res.json();
    })

    .then((res) => {
      const convertedData = convertData(res.entries);
      const duplicatedAndSlicedData = duplicateAndSliceData(convertedData);
      return {
        cards: duplicatedAndSlicedData,
      };
    });
};
