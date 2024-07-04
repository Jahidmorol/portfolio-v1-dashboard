export const uploadToImgBB = async (data) => {
  const formData = new FormData();
  formData.append("image", data);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=654b1e85ae0488c966b1aaf034e8cab2`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();
    return result.data.url ?? null;
  } catch (error) {
    return null;
  }
};
