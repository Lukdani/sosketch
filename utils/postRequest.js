export const postRequest = async (
  url = "",
  data = {},
  type = "application/json"
) => {
  if (url) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": type,
      },
      body: type === "application/json" ? JSON.stringify(data) : data,
    });
    return response.json();
  }
};
