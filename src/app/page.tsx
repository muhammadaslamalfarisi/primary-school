import HeroSection from "./_components/hero-section";
import PrincipalWelcome from "./_components/principal-welcome"; // Tambahkan ini
import SchoolStats from "./_components/school-stats"; // Tambahkan ini
import FeaturesMenu from "./_components/features-menu";
import HighlightProgram from "./_components/highlight-program";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Bagian Atas / Selamat Datang */}
      <HeroSection />

      {/* Tambahan Baru */}
      <PrincipalWelcome />
      <SchoolStats />

      {/* Bagian Akses Menu Cepat */}
      <FeaturesMenu />

      {/* Bagian Program Unggulan */}
      <HighlightProgram />
    </div>
  );
}
