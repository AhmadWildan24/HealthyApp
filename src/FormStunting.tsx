import React, { useState } from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./components/ui/select";
import { handlePredictStunting } from "./Fetch";
import NavBar from "./NavBar";

interface PopUpPropsUser {
  onFetchMessages: () => void;
}

const FormStunting: React.FC<PopUpPropsUser> = ({ onFetchMessages = () => {} }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genderStatus, setGenderStatus] = useState<string | undefined>(undefined);
  const [features, setFeatures] = useState<[number, number, number]>([0, 0, 0]);

  const resultMapping: { [key: number]: string } = {
    0: "Stunting Serius",
    1: "Stunting",
    2: "Normal",
    3: "Tinggi Badan di atas Rata Rata",
  };

  const formatResult = (result: number) => {
    // Memformat hasil prediksi sesuai dengan nilai
    return resultMapping[result] || "Hasil Tidak Dikenal";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error sebelum submit

    if (features.some((feature) => isNaN(feature))) {
      setError("Semua fitur harus berupa angka.");
      return;
    }

    try {
      const result = await handlePredictStunting({ features }, setError);
      setPredictionResult(result);
      setFeatures([0, 0, 0]); // Reset fitur setelah berhasil
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
        <h1 className="font-bold poppins text-[40px]">Kenali Risiko Stunting Anak Anda Sejak DIni</h1>
        <div className="pr-[133px]">
          <p className="poppins">
            Stunting adalah kondisi kurang gizi kronis yang dapat memengaruhi tumbuh kembang anak, baik secara fisik maupun kognitif. Dengan mengetahui risiko stunting lebih awal, Anda dapat mengambil langkah-langkah pencegahan yang tepat
            untuk memastikan anak Anda tumbuh dengan optimal. Gunakan alat prediksi kami yang mudah dan akurat untuk membantu Anda memahami risiko ini.
          </p>
          <p className="text-[20px] pt-10 italic">Formulir berikut dirancang untuk membantu Anda mendapatkan hasil prediksi dengan cepat. Pastikan semua data diisi dengan benar untuk hasil yang optimal.</p>
        </div>
        <form onSubmit={handleSubmit} className="justify-items-center pt-10">
          <div className="grid gap-4 py-4">
            {/* Input untuk jenis kelamin Bayi */}
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
                    const updatedFeatures = [...prevFeatures] as [number, number, number];
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
            {/* Input untuk Umur Bayi */}
            <div className="grid grid-cols-2 items-center justify-items-start">
              <Label htmlFor="umurBayi" className="text-right   ">
                Umur Bayi
              </Label>
              <Input
                id="umurBayi"
                type="number"
                placeholder="Umur Bayi"
                value={features[1] || ""}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setFeatures((prevFeatures) => {
                    const updatedFeatures = [...prevFeatures] as [number, number, number];
                    updatedFeatures[1] = value;
                    return updatedFeatures;
                  });
                }}
                className="col-span-1"
                required
              />
            </div>
            {/* Tambahkan input lain jika diperlukan */}
            <div className="grid grid-cols-2 items-center justify-items-start">
              <Label htmlFor="umurBayi" className="text-right">
                Tinggi Badan Bayi
              </Label>
              <Input
                id="tinggiBadan"
                type="number"
                placeholder="Tinggi Badan Bayi"
                value={features[2] || ""}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setFeatures((prevFeatures) => {
                    const updatedFeatures = [...prevFeatures] as [number, number, number];
                    updatedFeatures[2] = value;
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
        Hasil prediksi ini dapat membantu Anda memahami risiko stunting dan memberikan panduan untuk langkah selanjutnya. Jangan ragu untuk berkonsultasi dengan ahli gizi atau tenaga medis untuk tindakan lebih lanjut.
      </p>
    </div>
  );
};

export default FormStunting;
