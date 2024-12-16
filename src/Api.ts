const BASE_URL = "https://d08c-103-179-248-250.ngrok-free.app";

export const setPredictStunting = async (features: [number, number, number]) => {
  const response = await fetch(`${BASE_URL}/predict-stunting`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ features }),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const setPredictDiabetes = async (features: [number, number, number, number, number, number, number, number]) => {
  const response = await fetch(`${BASE_URL}/predict-diabetes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ features }),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
