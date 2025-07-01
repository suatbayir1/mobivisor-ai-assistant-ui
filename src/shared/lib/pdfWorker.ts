'use client';

import { pdfjs } from 'react-pdf';

if (typeof window !== 'undefined' && pdfjs) {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}
