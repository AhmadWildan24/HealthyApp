import robot from "./Gambar/robot.png";
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";

const Layanan = () => {
  return (
    <div>
      <div className="flex justify-beetwen">
        <div className="pt-[120px] pl-[133px]">
          <h1 className="font-bold text-[40px] text-[#B80F0A] leading-[50px] poppins">
            Pantau Kesehatan <br /> Anda dengan Teknologi Cerdas
          </h1>
          <p className="font-[300px] text-[20px] poppins">
            Tingkatkan kualitas hidup Anda dengan alat prediksi <br /> kesehatan yang akurat dan mudah digunakan. Ketahui risiko <br /> stunting pada anak, potensi diabetes, dan jaga berat badan <br /> ideal Anda dengan kalkulator BMI kami.
          </p>
          <Button className="mt-5 ml-[110px] poppins bg-[#B80F0A]">
            <a href="#layanan">Pilih Layanan</a>
          </Button>
        </div>
        <div className="ml-auto pt-[50px] pr-[75px]">
          <img className="w-[420px]" src={robot} alt="" />
        </div>
      </div>
      <div className="mx-auto text-center bg-cover w-full h-full pt-[100px]">
        <h2 className="text-3xl font-[600] text-[24px] text-white text-center p-3 border justify-self-center w-[450px] bg-[#B80F0A] rounded-[20px] poppins">MENGAPA PILIH KAMI</h2>
        <div className="grid grid-cols-2 px-36 gap-10 pt-20">
          <p className="text-[20px] poppins">
            Kami menyediakan solusi kesehatan digital dengan akurasi tinggi berkat algoritma machine learning canggih. Sistem ini dirancang untuk memprediksi risiko kesehatan secara cepat dan tepat, membantu Anda mengambil langkah
            pencegahan yang diperlukan.
          </p>
          <p className="text-[20px] poppins">
            Layanan ini sangat mudah digunakan, cukup dengan <br /> beberapa klik untuk mendapatkan hasil analisis yang jelas <br /> dan informatif. Anda tidak perlu khawatir karena prosesnya <br /> dirancang sederhana dan ramah pengguna.
          </p>
        </div>
      </div>
      <div id="layanan" className="mx-auto text-center bg-cover w-full h-full pt-[200px]">
        {/* Heading */}
        <h2 className="text-3xl font-[600] text-[24px] text-white text-center p-3 border justify-self-center w-[450px] bg-[#B80F0A] rounded-[20px]">LAYANAN KAMI</h2>
        {/* Container Layanan */}
        <div className="flex flex-col md:flex-row justify-center items-center mx-auto  space-y-8 md:space-y-0 md:space-x-12 w-full max-w-4xl px-6 md:px-0 min-h-[320px] md:min-h-[320px]">
          {/* Informasi Posyandu */}
          <Link to="/formstunting" className="flex flex-col items-center p-6 space-y-4 rounded-lg w-full md:w-1/3 bg-[#135D66] text-white shadow-md">
            <h5 className="text-[20px] font-semibold pt-4 poppins">Stunting Detection</h5>
            <p className="text-sm text-darkGrayishBlue text-center md:text-center">Temukan jadwal dan lihat kegiatan. Akses dengan mudah!</p>
          </Link>
          {/* Stunting Detection */}
          <Link to="/formdiabetes" className="flex flex-col items-center p-6 space-y-4 rounded-lg w-full md:w-1/3 bg-[#135D66] text-white shadow-md">
            <h5 className="text-[20px] font-semibold pt-4 poppins">Diabetes Detection</h5>
            <p className="text-sm text-darkGrayishBlue text-center md:text-center">Taklukkan stunting, jaga masa depan anak-anak. Cek sekarang!</p>
          </Link>
          {/* Monitoring Record */}
          <Link to="/monitoring" className="flex flex-col items-center p-6 space-y-4 rounded-lg w-full md:w-1/3 bg-[#135D66] text-white shadow-md">
            <h5 className="text-[20px] font-semibold pt-4 poppins">BMI</h5>
            <p className="text-sm text-darkGrayishBlue text-center md:text-center">Simpan jejak kesehatan dengan mudah</p>
          </Link>
        </div>
      </div>
      <div className="mx-auto text-center bg-cover w-full h-full pt-[200px] pb-8">
        <h2 className="text-3xl font-[600] text-[24px] text-white text-center p-3 border justify-self-center w-[450px] bg-[#B80F0A] rounded-[20px] poppins">INFORMASI SINGKAT</h2>
        <div className="text-start pl-[174px] pr-[174px] pt-20">
          <h1 className="font-bold text-[48px] poppins">Stunting</h1>
          <p className="poppins">
            Stunting adalah masalah kesehatan yang signifikan di Indonesia, terutama pada anak-anak. Berdasarkan data Kementerian Kesehatan RI, prevalensi stunting di Indonesia pada tahun 2023 mencapai sekitar 21,6%, meskipun angka ini
            menunjukkan penurunan dari tahun-tahun sebelumnya. Namun, masalah ini masih tersebar luas dengan variasi geografis
          </p>
          <p className="pt-5 poppins">
            Pemerintah Indonesia menargetkan prevalensi stunting turun hingga 14% pada tahun 2024 melalui program seperti intervensi gizi spesifik, peningkatan akses air bersih, dan kampanye kesadaran masyarakat.
          </p>

          <h1 className="font-bold text-[48px] pt-20 poppins">Diabetes</h1>
          <p className="poppins">
            Diabetes, khususnya diabetes tipe 2, juga menjadi salah satu masalah kesehatan utama di Indonesia. Berdasarkan data dari International Diabetes Federation (IDF), pada tahun 2023, jumlah penderita diabetes di Indonesia mencapai
            lebih dari 19 juta orang, menempatkan Indonesia sebagai salah satu negara dengan jumlah penderita diabetes tertinggi di dunia
          </p>
          <p className="pt-5 poppins">
            Peningkatan angka diabetes di Indonesia juga dipengaruhi oleh rendahnya tingkat kesadaran masyarakat mengenai pentingnya deteksi dini dan pengelolaan risiko, seperti kontrol pola makan dan olahraga teratur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layanan;
