export const formatCurrency = (value: string) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(Number(value))
    .replace("Rp", "Rp. ");
};

export const formatNumber = (value: string) => {
  return new Intl.NumberFormat("id-ID").format(Number(value));
};

export const formatPercent = (value: string) => {
  return `${parseFloat(value)}%`;
};
