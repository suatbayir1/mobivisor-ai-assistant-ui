import { Document, Page, pdfjs } from 'react-pdf';
import { usePdfStore } from '../stores/pdfStore';
import { useState, useRef, useEffect } from 'react';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { fuzzyMatch } from '@/utils/fuzzyMatch';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PDFDrawer() {
    const { isOpen, url, page, text, closePdf } = usePdfStore();
    const [numPages, setNumPages] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [pageRendered, setPageRendered] = useState(false);
    const drawerRef = useRef<HTMLElement>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        pageRefs.current = new Array(numPages).fill(null);
        setPageRendered(false);
    };

    useEffect(() => {
        if (isOpen && page && containerRef.current && pageRefs.current.length >= page && pageRendered) {
            const currentPageElement = pageRefs.current[page - 1];
            if (currentPageElement) {
                containerRef.current.scrollTo({
                    top: currentPageElement.offsetTop,
                    behavior: 'smooth',
                });
            }
        }
    }, [isOpen, page, numPages, pageRendered]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                closePdf();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, closePdf]);

    const onPageRenderSuccess = (pageNumber: number) => {
        if (pageNumber === page) {
            setPageRendered(true);
        }
    };

    return (
        <aside
            ref={drawerRef}
            className={`fixed top-0 right-0 h-full w-[70%] bg-[#1a1a1c] text-white border-r border-gray-800 p-4 shadow-lg transition-transform duration-300 z-10 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div 
                className="relative h-full overflow-y-auto" 
                ref={containerRef}
            >
                {isOpen ? (
                    <div className="flex flex-col items-center">
                        <Document
                            file={url}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading="Loading PDF..."
                        >
                            {Array.from(new Array(numPages), (_, index) => {
                                const pageNumber = index + 1;
                                return (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        inputRef={el => { pageRefs.current[index] = el }}
                                        onRenderSuccess={() => onPageRenderSuccess(index + 1)}
                                        scale={1.5}
                                        customTextRenderer={
                                            (textItem) => {
                                                if (pageNumber === page && text && fuzzyMatch(text, textItem.str)) {
                                                    return `<mark>${textItem.str}</mark>`;
                                                }
                                                return textItem.str;
                                            }
                                        }
                                    />
                                )
                            })}
                        </Document>
                    </div>
                ) : (
                    <div className="bg-gray-100 h-[500px] flex items-center justify-center text-gray-500">
                        No PDF selected.
                    </div>
                )}
            </div>
        </aside>
    );
}
