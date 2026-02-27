import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function ProgramPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-linear-to-r from-orange-50 to-yellow-50 py-16 border-b">
        <div className="container mx-auto px-4">
          <Badge
            variant="outline"
            className="mb-4 text-orange-700 border-orange-300"
          >
            Program & Layanan
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Program Unggulan Sekolah
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Berbagai program dan inisiatif untuk mengembangkan potensi peserta
            didik secara optimal.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((program) => (
            <Link key={program.id} href={`/program/${program.slug}`}>
              <Card className="h-full shadow-md hover:shadow-lg transition-all hover:scale-105 transform cursor-pointer border-t-4 border-t-transparent hover:border-t-blue-600">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${program.color}`}
                  >
                    {program.icon === "GraduationCap" && (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                      </svg>
                    )}
                    {program.icon === "Award" && (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                    )}
                    {program.icon === "Zap" && (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13 2h-2v7H4l9 9v-7h7L13 2z" />
                      </svg>
                    )}
                    {program.icon === "Users" && (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                      </svg>
                    )}
                    {program.icon === "Target" && (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
                      </svg>
                    )}
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-between group"
                  >
                    Pelajari Lebih Lanjut
                    <ArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      size={16}
                    />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
