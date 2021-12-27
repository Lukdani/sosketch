export const postRequest = async (
  url = "",
  data = {},
  type = "application/json"
) => {
  let parsedData;
  if (type === "application/json") {
    parsedData = JSON.stringify({ ...data });
  }
  if (url) {
    if (type === "multipeart/form-data") {
      parsedData = new FormData();
      for (const name in data) {
        formData.append(name, data[name]);
      }
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": type,
      },
      body: parsedData,
    });
    return response.json();
  }
};
