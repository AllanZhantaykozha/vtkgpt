export function getCurrentTime(): string {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
}

export function getCurrentDate(): string {
    const now = new Date();
    return `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${now.getFullYear()}`;
}