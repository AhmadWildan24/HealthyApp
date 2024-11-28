import { setPredictDiabetes, setPredictStunting } from "./Api";

export const handlePredictStunting = async (messageData: { features: [number, number, number] }, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    const response = await setPredictStunting(messageData.features);
    console.log("Input Prediksi Berhasil Di Muat : ", response);
    return response;
  } catch (error) {
    setError("Pesan gagal dimuat");
    console.error(error);
  }
};

export const handlePredictDiabetes = async (messageData: { features: [number, number, number, number, number, number, number, number] }, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    const response = await setPredictDiabetes(messageData.features);
    console.log("Input Prediksi Berhasil Di Muat : ", response);
    return response;
  } catch (error) {
    setError("Pesan gagal dimuat");
    console.error(error);
  }
};
