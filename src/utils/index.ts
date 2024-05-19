export const API_URL = import.meta.env.DEV
  ? "http://localhost:4321"
  : "https://www.leadup.today";

export const getRequest = async (url: string) => {
  const res = await fetch(API_URL + url);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data;
};

export const postRequest = async (url: string, data: Object) => {
  try {
    const res = await fetch(API_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error with postRequest:", error);
    throw error;
  }
};

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
