export const timeAgoForStock = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
};

export function exportToCsv<T extends object>(
  rows: T[],
  headers: Array<keyof T>,
  filename = "export.csv",
) {
  if (!rows.length) return;

  const escape = (value: unknown) => {
    const str = String(value ?? "");
    if (/[,"\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
    return str;
  };

  const csv = [
    headers.map(String).join(","),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...rows.map((row) => headers.map((h) => escape((row as any)[h])).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
