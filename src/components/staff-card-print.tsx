import React from "react";

interface StaffCardPrintProps {
  card: any;
}

/**
 * Component untuk render Staff Card (Admin, Kepala Sekolah, Pendidik, Tenaga Kependidikan)
 * Design: Ukuran standar kartu (105mm x 148mm atau 3.7" x 5.2")
 */
export const StaffCardPrint: React.FC<StaffCardPrintProps> = ({ card }) => {
  const user = card.user;

  const roleLabels: Record<string, string> = {
    SUPER_ADMIN: "Admin",
    KEPALA_SEKOLAH: "Kepala Sekolah",
    PENDIDIK: "Pendidik/Guru",
    TENAGA_KEPENDIDIKAN: "Tenaga Kependidikan",
  };
  const roleLabel = roleLabels[card.role as string] || card.role;

  const roleColors: Record<string, string> = {
    SUPER_ADMIN: "from-red-600 to-red-800",
    KEPALA_SEKOLAH: "from-amber-600 to-amber-800",
    PENDIDIK: "from-green-600 to-green-800",
    TENAGA_KEPENDIDIKAN: "from-blue-600 to-blue-800",
  };
  const roleColor =
    roleColors[card.role as string] || "from-slate-600 to-slate-800";

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Front Side */}
      <div
        className={`bg-gradient-to-br ${roleColor} text-white p-6 rounded-lg shadow-lg aspect-[3.7/5.2] flex flex-col justify-between relative overflow-hidden h-64`}
      >
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
            KARTU IDENTITAS {roleLabel.toUpperCase()}
          </div>
          <div className="text-md font-bold">SD NEGERI 1 BATU RAKIT</div>
          <div className="text-xs mt-1 opacity-90">
            Tahun Pelajaran {card.tahunPelajaran}
          </div>
        </div>

        {/* Detail - Nama & NIP Prominent */}
        <div className="relative z-10 space-y-3">
          {/* Nama Lengkap - Besar & Bold */}
          <div className="bg-white bg-opacity-20 rounded px-3 py-2 border border-white border-opacity-30">
            <div className="text-xs opacity-75 mb-1">NAMA LENGKAP</div>
            <div className="text-lg font-bold leading-tight break-words">
              {user.fullName}
            </div>
          </div>

          {/* NIP & Jabatan */}
          <div className="grid grid-cols-2 gap-3">
            {card.nip && (
              <div className="bg-white bg-opacity-20 rounded px-2 py-2">
                <div className="text-xs opacity-75">NIP</div>
                <div className="font-mono font-bold text-sm">{card.nip}</div>
              </div>
            )}
            {card.jabatan && (
              <div className="bg-white bg-opacity-20 rounded px-2 py-2">
                <div className="text-xs opacity-75">JABATAN</div>
                <div className="font-bold text-sm break-words">
                  {card.jabatan}
                </div>
              </div>
            )}
          </div>

          {/* Role */}
          <div className="bg-white bg-opacity-20 rounded px-3 py-2">
            <div className="text-xs opacity-75">POSISI</div>
            <div className="font-bold text-sm">{roleLabel}</div>
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
        {/* Header dengan Nama & Role */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded px-4 py-3 mb-3">
          <div className="text-xs opacity-90 mb-1">IDENTITAS PEGAWAI</div>
          <div className="text-sm font-bold mb-1 break-words">
            {user.fullName}
          </div>
          <div className="text-xs opacity-90">
            Posisi: <span className="font-semibold">{roleLabel}</span>
          </div>
          {card.nip && (
            <div className="text-xs opacity-90">
              NIP: <span className="font-mono font-bold">{card.nip}</span>
            </div>
          )}
        </div>

        {/* Data Tambahan */}
        <div>
          <h3 className="text-xs font-bold mb-2 uppercase tracking-wider text-gray-700">
            Informasi Tambahan
          </h3>
          <div className="space-y-1 text-xs">
            {card.jabatan && (
              <div>
                <span className="opacity-70">Jabatan:</span>{" "}
                <span className="font-medium">{card.jabatan}</span>
              </div>
            )}
            {card.departemen && (
              <div>
                <span className="opacity-70">Departemen:</span>{" "}
                <span className="font-medium">{card.departemen}</span>
              </div>
            )}
            <div>
              <span className="opacity-70">Email:</span>{" "}
              <span className="font-medium text-xs">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-300">
          <div className="text-center text-xs">
            <div className="h-10 flex items-end justify-center mb-1">
              {card.tandaTanganUser ? (
                <img
                  src={card.tandaTanganUser}
                  alt="Signature pegawai"
                  className="h-full"
                />
              ) : (
                <div className="text-gray-300">_______</div>
              )}
            </div>
            <div className="font-bold text-xs">Pemilik Kartu</div>
            <div className="text-xs opacity-70">({user.fullName})</div>
          </div>
          <div className="text-center text-xs">
            <div className="h-10 flex items-end justify-center mb-1">
              {card.tandaTanganKepalaSekolah ? (
                <img
                  src={card.tandaTanganKepalaSekolah}
                  alt="Signature kepala sekolah"
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

export default StaffCardPrint;
