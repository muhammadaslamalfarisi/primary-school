import React from "react";

interface StudentCardPrintProps {
  card: any;
}

/**
 * Component untuk render Student Card yang bisa dicetak
 * Design: Ukuran standar kartu (105mm x 148mm atau 3.7" x 5.2")
 */
export const StudentCardPrint: React.FC<StudentCardPrintProps> = ({ card }) => {
  const siswa = card.siswa;
  const user = siswa.user;
  const rombel = siswa.rombonganBelajar;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Front Side */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-lg aspect-[3.7/5.2] flex flex-col justify-between relative overflow-hidden h-64">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-10">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            className="w-24 h-24"
          >
            <circle cx="50" cy="50" r="40" stroke="white" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="white" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="white" fill="none" />
          </svg>
        </div>

        {/* Header */}
        <div className="relative z-10">
          <div className="text-xs font-bold tracking-wider mb-1">
            KARTU IDENTITAS SISWA
          </div>
          <div className="text-md font-bold">SD NEGERI 1 BATU RAKIT</div>
          <div className="text-xs mt-1 opacity-90">
            Tahun Pelajaran {card.tahunPelajaran}
          </div>
        </div>

        {/* Detail - Nama Besar & NISN Prominent */}
        <div className="relative z-10 space-y-3">
          {/* Nama Lengkap - Besar & Bold */}
          <div className="bg-white bg-opacity-20 rounded px-3 py-2 border border-white border-opacity-30">
            <div className="text-xs opacity-75 mb-1">NAMA LENGKAP</div>
            <div className="text-lg font-bold leading-tight break-words">
              {user.fullName}
            </div>
          </div>

          {/* NISN & NIS */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white bg-opacity-20 rounded px-2 py-2">
              <div className="text-xs opacity-75">NISN</div>
              <div className="font-mono font-bold text-sm">{siswa.nisn}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded px-2 py-2">
              <div className="text-xs opacity-75">NIS</div>
              <div className="font-mono font-bold text-sm">{siswa.nis}</div>
            </div>
          </div>

          {/* Kelas */}
          <div className="bg-white bg-opacity-20 rounded px-3 py-2">
            <div className="text-xs opacity-75">KELAS</div>
            <div className="font-bold text-sm">{rombel?.nama || "—"}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white border-opacity-30">
          <div className="text-xs font-semibold">
            No. Urut: {card.nomorUrut}
          </div>
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded border border-white border-opacity-40 flex items-center justify-center">
            <span className="text-xs font-bold">ID</span>
          </div>
        </div>
      </div>

      {/* Back Side - Info & Signature */}
      <div className="bg-gray-100 text-gray-800 p-6 rounded-lg shadow-lg aspect-[3.7/5.2] flex flex-col justify-between mt-4 h-64">
        {/* Header dengan Nama & NISN */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded px-4 py-3 mb-3">
          <div className="text-xs opacity-90 mb-1">IDENTITAS SISWA</div>
          <div className="text-sm font-bold mb-1 break-words">
            {user.fullName}
          </div>
          <div className="text-xs opacity-90">
            NISN:{" "}
            <span className="font-mono font-bold text-base">{siswa.nisn}</span>
          </div>
        </div>

        {/* Data Pribadi */}
        <div>
          <h3 className="text-xs font-bold mb-2 uppercase tracking-wider text-gray-700">
            Data Tambahan
          </h3>
          <div className="space-y-1 text-xs">
            {siswa.tempatLahir && (
              <div>
                <span className="opacity-70">Tempat Lahir:</span>{" "}
                <span className="font-medium">{siswa.tempatLahir}</span>
              </div>
            )}
            {siswa.jenisKelamin && (
              <div>
                <span className="opacity-70">Jenis Kelamin:</span>{" "}
                <span className="font-medium">
                  {siswa.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
                </span>
              </div>
            )}
            {siswa.agama && (
              <div>
                <span className="opacity-70">Agama:</span>{" "}
                <span className="font-medium">{siswa.agama}</span>
              </div>
            )}
            {siswa.alamat && (
              <div>
                <span className="opacity-70">Alamat:</span>{" "}
                <span className="font-medium text-xs">{siswa.alamat}</span>
              </div>
            )}
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-300">
          <div className="text-center text-xs">
            <div className="h-10 flex items-end justify-center mb-1">
              {card.tandaTanganSiswa ? (
                <img
                  src={card.tandaTanganSiswa}
                  alt="Signature siswa"
                  className="h-full"
                />
              ) : (
                <div className="text-gray-300">_______</div>
              )}
            </div>
            <div className="font-bold text-xs">Siswa</div>
            <div className="text-xs opacity-70">({user.fullName})</div>
          </div>
          <div className="text-center text-xs">
            <div className="h-10 flex items-end justify-center mb-1">
              {card.tandaTanganPrinsipal ? (
                <img
                  src={card.tandaTanganPrinsipal}
                  alt="Signature principal"
                  className="h-full"
                />
              ) : (
                <div className="text-gray-300">_______</div>
              )}
            </div>
            <div className="font-bold text-xs">Kepala Sekolah</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCardPrint;
