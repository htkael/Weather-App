const address = document.querySelector(".cityState");
const desc = document.querySelector(".description");

export const updateLocationInfo = (resolvedAddress, description) => {
  console.log(resolvedAddress);
  console.log(description);
  address.textContent = resolvedAddress;
  desc.textContent = description;
};
