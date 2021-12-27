export const getRequest = async (url) => {
  try {
    const response = await fetch(url);
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch {
    console.log("Der skete en uventet fejl.");
  }
};
