import React, { useState } from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import NavBar from "./NavBar";

const FormBMI: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [height, setHeight] = useState<number>(0); // Tinggi badan dalam cm
  const [weight, setWeight] = useState<number>(0); // Berat badan dalam kg
  const [bmiResult, setBmiResult] = useState<string>("");

  const calculateBMI = (height: number, weight: number): string => {
    if (height <= 0 || weight <= 0) {
      return "Input tidak valid.";
    }

    const heightInMeters = height / 100; // Konversi cm ke meter
    const bmi = weight / heightInMeters ** 2;

    // Kategori BMI
    return `BMI Anda adalah : ${bmi.toFixed(2)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (height <= 0 || weight <= 0) {
      setError("Masukkan tinggi dan berat badan yang valid.");
      return;
    }

    const result = calculateBMI(height, weight);
    setBmiResult(result);
    setIsDialogOpen(true); // Buka dialog dengan hasil BMI
  };

  return (
    <div>
      <NavBar />
      <div className="pt-20 pl-24">
        <h1 className="font-bold poppins text-[40px]">Menghitung Index Massa Tubuh (BMI) Untuk Kesehatan Optimal</h1>
        <div className="pr-[133px]">
          <p className="poppins">
            Indeks Massa Tubuh (BMI) adalah indikator sederhana yang digunakan untuk mengetahui apakah berat badan Anda seimbang dengan tinggi badan. Memiliki BMI yang sehat dapat mengurangi risiko berbagai penyakit seperti jantung,
            diabetes, dan masalah kesehatan lainnya. Gunakan kalkulator BMI ini untuk mengetahui status kesehatan tubuh Anda dan langkah-langkah yang perlu diambil untuk menjaga kesehatan tubuh secara menyeluruh.
          </p>
          <p className="text-[20px] pt-10 italic">Cukup dengan mengisi data tinggi badan dan berat badan, Anda dapat mengetahui status BMI Anda secara cepat dan mudah. Pastikan data yang dimasukkan akurat untuk hasil yang lebih tepat.</p>
        </div>
        <form onSubmit={handleSubmit} className="justify-items-center pt-10">
          <div className="grid gap-4 py-4">
            {/* Input untuk tinggi badan */}
            <div className="grid grid-cols-2 items-center justify-items-start">
              <Label htmlFor="height">Tinggi Badan (cm)</Label>
              <Input id="height" type="number" placeholder="Masukkan tinggi badan" value={height || ""} onChange={(e) => setHeight(Number(e.target.value))} required />
            </div>
            {/* Input untuk berat badan */}
            <div className="grid grid-cols-2 items-center justify-items-start">
              <Label htmlFor="weight">Berat Badan (kg)</Label>
              <Input id="weight" type="number" placeholder="Masukkan berat badan" value={weight || ""} onChange={(e) => setWeight(Number(e.target.value))} required />
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
            <AlertDialogTitle className="poppins">Hasil BMI</AlertDialogTitle>
            <AlertDialogDescription className="text-[25px] text-black poppins">{bmiResult}</AlertDialogDescription>
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
        Berdasarkan hasil BMI, Anda akan mengetahui kategori berat badan Anda (kurang berat badan, normal, overweight, atau obesitas). Jika hasil menunjukkan BMI yang tidak sehat, pertimbangkan untuk berkonsultasi dengan tenaga medis atau
        ahli gizi untuk mendapatkan saran yang sesuai dengan kondisi Anda.
      </p>
    </div>
  );
};

export default FormBMI;
