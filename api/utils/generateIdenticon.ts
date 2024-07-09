const colors = ["FF548F", "9061C2", "BE80FF", "63D3FF", "02779E"];
const lowerStrColors = colors.map((color) => color.toLocaleLowerCase());

export const generateAvatar = (name: string) => {
  return `https://source.boringavatars.com/beam/40/${encodeURIComponent(
    name
  )}?colors=${lowerStrColors.join(",")}`;
};
