"use client";

import React, { useEffect, useState } from "react";
import { StudentCardPrint } from "@/components/student-card-print";

interface StudentCardPageProps {
  params: { id: string };
}

export default function PrintStudentCardPage({ params }: StudentCardPageProps) {
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch(`/api/student-card/${params.id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.data) {
          setCard(data.data);
        }
      } catch (error) {
        console.error("Error fetching card:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading card...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Card not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4" id="print-area">
      {/* Print Controls */}
      <div className="max-w-2xl mx-auto mb-6 text-center hidden print:hidden">
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          🖨️ Cetak Kartu
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Untuk hasil terbaik, gunakan ukuran kertas "A6" atau "Kartu" di
          printer settings
        </p>
      </div>

      {/* Card Container */}
      <div className="max-w-2xl mx-auto">
        <StudentCardPrint card={card} />
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: 105mm 148mm;
            margin: 0;
          }

          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          #print-area {
            background: white;
            padding: 0;
          }

          .hidden.print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
