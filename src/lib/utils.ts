export function toBengaliNumber(
    num: number | string | undefined | null,
): string {
    if (num === undefined || num === null || isNaN(Number(num))) {
        return "০";
    }
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
}

export function formatPrice(price: number | undefined | null): string {
    if (price === undefined || price === null || isNaN(Number(price))) {
        return "—";
    }
    const formatted = Number(price).toLocaleString("en-IN");
    return toBengaliNumber(formatted);
}

export function formatPercent(percent: number | undefined | null): string {
    if (percent === undefined || percent === null || isNaN(Number(percent))) {
        return "০.০";
    }
    const abs = Math.abs(percent).toFixed(1);
    return toBengaliNumber(abs);
}

export function getChangeColor(type: "up" | "down" | "flat"): string {
    if (type === "up") return "text-red-500";
    if (type === "down") return "text-green-500";
    return "text-gray-400";
}

export function getChangeIcon(type: "up" | "down" | "flat"): string {
    if (type === "up") return "▲";
    if (type === "down") return "▼";
    return "—";
}

export function getChangeBg(type: "up" | "down" | "flat"): string {
    if (type === "up") return "bg-red-50";
    if (type === "down") return "bg-green-50";
    return "bg-gray-50";
}

export function createSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\u0980-\u09FF-]/g, "");
}

export function translateUnit(unit: string): string {
    const map: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
    };
    return map[unit] || unit;
}

export function categoryToUrlSlug(apiCategory: string): string {
    return apiCategory;
}

export function navSlugToApiFilter(navSlug: string): string {
    const map: Record<string, string> = {
        shobji: "sobji",
        "dim-murgi": "dim-dui",
        moshla: "mosla",
    };
    return map[navSlug] || navSlug;
}