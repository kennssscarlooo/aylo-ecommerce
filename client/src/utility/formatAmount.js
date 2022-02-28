export const formatAmount = (amount) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  return formatter.format(amount);
};
