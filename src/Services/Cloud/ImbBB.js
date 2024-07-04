export const uploadToImgBB = async (data) => {
  const formData = new FormData();
  formData.append("image", data);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=ead29cbef0bff96497069a3c95ca92e7`,
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
