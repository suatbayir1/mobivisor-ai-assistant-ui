export function fuzzyMatch(longText: string, shortText: string): boolean {
    const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '');
    const longNorm = normalize(longText);
    const shortNorm = normalize(shortText);

    return longNorm.includes(shortNorm);
}
