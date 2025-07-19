export const loginServerApi = async (idToken: string) => {
  try {
    const response = await fetch("/api/server/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error creating session cookie:", error);
    throw error; // Re-throw the error
  }
};

