import React, { useState } from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { handlePredictDiabetes } from "./Fetch";

import NavBar from "./NavBar";

interface PopUpPropsUser {
  onFetchMessages: () => void;
}

const FormDiabetes: React.FC<PopUpPropsUser> = ({ onFetchMessages = () => {} }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genderStatus, setGenderStatus] = useState<string | undefined>(undefined);
  const [hipertensiStatus, setHipertensiStatus] = useState<string | undefined>(undefined);
  const [heartStatus, setheartStatus] = useState<string | undefined>(undefined);
  const [smokingStatus, setSmokingStatus] = useState<string | undefined>(undefined);
  const [features, setFeatures] = useState<[number, number, number, number, number, number, number, number]>([0, 0, 0, 0, 0, 0, 0, 0]);

  const resultMapping: { [key: number]: string } = {
    0: "Anda Tidak Terkena Diabetes",
    1: "Anda Terkena Diabetes",
  };

  const formatResult = (result: number) => {
    // Memformat hasil prediksi sesuai dengan nilai
    return resultMapping[result] || "Hasil Tidak Dikenal";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error sebelum submit
    setGenderStatus(undefined);
    setHipertensiStatus(undefined);
    setheartStatus(undefined);
    setSmokingStatus(undefined);

    if (features.some((feature) => isNaN(feature))) {
      setError("Semua fitur harus berupa angka.");
      return;
    }

    try {
      const result = await handlePredictDiabetes({ features }, setError);
      setPredictionResult(result);
      setFeatures([0, 0, 0, 0, 0, 0, 0, 0]); // Reset fitur setelah berhasil
      setIsDialogOpen(true); // Buka dialog
      onFetchMessages(); // Fetch pesan terbaru
    } catch (err) {
      console.error("Gagal menambahkan pesan:", err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="pt-20 pl-24">
        <h1 className="font-bold poppins text-[40px]">Waspadai Resiko Diabetes Sejak Dini</h1>
        <div className="pr-[133px]">
          <p className="poppins">
            Diabetes, terutama diabetes tipe 2, adalah penyakit yang dapat memengaruhi kualitas hidup dan kesehatan jangka panjang. Mengetahui potensi risiko diabetes sejak dini sangat penting untuk mencegah komplikasi lebih lanjut. Alat
            prediksi diabetes ini membantu Anda memahami faktor-faktor yang berisiko dan memberikan gambaran mengenai langkah-langkah yang perlu diambil untuk menjaga kesehatan Anda.
          </p>
          <p className="text-[20px] pt-10 italic">
            Anda hanya perlu mengisi beberapa data kesehatan untuk mendapatkan hasil prediksi risiko diabetes yang cepat dan mudah. Pastikan semua informasi diisi dengan tepat untuk hasil yang lebih akurat.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="justify-items-center pt-10">
          <div className="grid gap-4 py-4">
            {/* Input untuk Jenis Kelamin */}
            <div className="grid grid-cols-2 items-center justify-items-start">
              <Label htmlFor="jeniskelamin" className="text-right">
                Jenis Kelamin
              </Label>
              <Select
                value={genderStatus}
                onValueChange={(value) => {
                  setGenderStatus(value);
                  const numericValue = Number(value);
                  setFeatures((prevFeatures) => {
                    const updatedFeatures = [...prevFeatures] as [number, number, number, number, number, number, number, number];
                    updatedFeatures[0] = numericValue;
                    return updatedFeatures;
                  });
                }}
              >
                <SelectTrigger id="jenisKelamin" className="col-span-1">
                  <SelectValue placeholder="Pilih Jenis Kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Perempuan</SelectItem>
                  <SelectItem value="1">Laki-laki</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Input Umur */}
            <div className="grid grid-cols-2 items-center justify-items-start">
              <Label htmlFor="umur" className="text-right">
                Umur
              </Label>
              <Input
                id="umur"
                type="number"
                placeholder="Umur"
                value={features[1] || ""}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setFeatures((prevFeatures) => {
                    const updatedFeatures = [...prevFeatures] as [number, number, number, number, number, number, number, number];
                    updatedFeatures[1] = value;
                    return updatedFeatures;
                  });
                }}
                className="col-span-1"
                required
              />
            </div>
            {/* Input Hipertensi */}
            <div className="grid grid-cols-2 items-center justify-items-start">
              <Label htmlFor="Hipertensi" className="text-right">
                Hipertensi
              </Label>
              <Select
                value={hipertensiStatus}
                onValueChange={(value) => {
                  setHipertensiStatus(value);
                  const numericValue = Number(value);
                  setFeatures((prevFeatures) => {
                    const updatedFeatures = [...prevFeatures] as [number, number, number, number, number, number, number, number];
                    updatedFeatures[2] = numericValue;
                    return updatedFeatures;
                  });
                }}
              >
                <SelectTrigger id="jenisKelamin" className="col-span-1">
                  <SelectValue placeholder="Ada Riwayat Hipertensi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ada</SelectItem>
                  <SelectItem value="0">Tidak Ada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Input Penyakit Jantung */}
            <div className="grid grid-cols-2 items-center justify-items-start">
              <Label htmlFor="umurBayi" className="text-right">
                Penyakit Jantung
              </Label>
              <Select
                value={heartStatus}
                onValueChange={(value) => {
                  setheartStatus(value);
                  const numericValue = Number(value);
                  setFeatures((prevFeatures) => {
                    const updatedFeatures = [...prevFeatures] as [number, number, number, number, number, number, number, number];
                    updatedFeatures[3] = numericValue;
                    return updatedFeatures;
                  });
                }}
              >
                <SelectTrigger id="jenisKelamin" className="col-span-1">
                  <SelectValue placeholder="Ada Riwayat Penyakit Jantung" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ada</SelectItem>
                  <SelectItem value="0">Tidak Ada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Input Pernah Merokok */}
            <div className="grid grid-cols-2 items-center justify-items-start">
              <Label htmlFor="umurBayi" className="text-right">
                Apakah Anda Merokok
              </Label>
              <Select
                value={smokingStatus}
                onValueChange={(value) => {
                  setSmokingStatus(value); // Set nilai pilihan dropdown
                  const numericValue = Number(value);
                  setFeatures((prevFeatures) => {
                    const updatedFeatures = [...prevFeatures] as [number, number, number, number, number, number, number, number];
                    updatedFeatures[4] = numericValue;
                    return updatedFeatures;
                  });
                }}
              >
                <SelectTrigger id="merokok" className="col-span-1">
                  <SelectValue placeholder="Riwayat Merokok" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-1">No Info</SelectItem>
                  <SelectItem value="0">Never</SelectItem>
                  <SelectItem value="1">Former</SelectItem>
                  <SelectItem value="2">Current</SelectItem>
                  <SelectItem value="3">Not Current</SelectItem>
                  <SelectItem value="4">Ever</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Input BMI */}
            <div className="grid grid-cols-2 items-center justify-items-start">
              <Label htmlFor="umurBayi" className="text-right">
                Nilai BMI
              </Label>
              <Input
                id="BMI"
                type="number"
                placeholder="Nilai BMI"
                value={features[5] || ""}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setFeatures((prevFeatures) => {
                    const updatedFeatures = [...prevFeatures] as [number, number, number, number, number, number, number, number];
                    updatedFeatures[5] = value;
                    return updatedFeatures;
                  });
                }}
                className="col-span-1"
                required
              />
            </div>
            {/* Input Hb41C */}
            <div className="grid grid-cols-2 items-center justify-items-start">
              <Label htmlFor="umurBayi" className="text-right">
                Level Hb41C
              </Label>
              <Input
                id="umur"
                type="number"
                placeholder="Level Hb41C"
                value={features[6] || ""}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setFeatures((prevFeatures) => {
                    const updatedFeatures = [...prevFeatures] as [number, number, number, number, number, number, number, number];
                    updatedFeatures[6] = value;
                    return updatedFeatures;
                  });
                }}
                className="col-span-1"
                required
              />
            </div>
            {/* Input Level Glukosa Darah */}
            <div className="grid grid-cols-2 items-center justify-items-start">
              <Label htmlFor="umurBayi" className="text-right">
                Level Glukosa Darah
              </Label>
              <Input
                id="umur"
                type="number"
                placeholder="Level Glukosa Darah"
                value={features[7] || ""}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setFeatures((prevFeatures) => {
                    const updatedFeatures = [...prevFeatures] as [number, number, number, number, number, number, number, number];
                    updatedFeatures[7] = value;
                    return updatedFeatures;
                  });
                }}
                className="col-span-1"
                required
              />
            </div>
          </div>
          <Button className="mt-10 w-[200px]" id="submit" type="submit">
            Prediksi
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hasil Prediksi</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="text-center text-[20px] text-black">{formatResult(Number(predictionResult?.prediction))}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDialogOpen(false);
                window.location.reload();
              }}
            >
              Ok
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-[20px] pt-10 pb-10 italic pl-[133px] pr-[133px]">
        Hasil prediksi ini memberikan gambaran mengenai risiko diabetes Anda. Jika hasil menunjukkan potensi tinggi, disarankan untuk berkonsultasi dengan dokter untuk pemeriksaan lebih lanjut dan pencegahan yang lebih baik.
      </p>
    </div>
  );
};

export default FormDiabetes;
