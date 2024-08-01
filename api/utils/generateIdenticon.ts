const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

const pickupElement = (arr: string[]): string => {
  const randomIndex = getRandomInt(arr.length);
  return arr[randomIndex];
};

const backgroundColors = ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"];
const backgroundTypes = ["gradientLinear", "solid"];
const eyes = [
  "variant1W10",
  "variant1W12",
  "variant1W14",
  "variant1W16",
  "variant2W10",
  "variant2W12",
  "variant2W14",
  "variant2W16",
  "variant3W10",
  "variant3W12",
  "variant3W14",
  "variant3W16",
  "variant4W10",
  "variant4W12",
  "variant4W14",
  "variant4W16",
  "variant5W10",
  "variant5W12",
  "variant5W14",
  "variant5W16",
  "variant6W10",
  "variant6W12",
  "variant6W14",
  "variant6W16",
  "variant7W10",
  "variant7W12",
  "variant7W14",
  "variant7W16",
  "variant8W10",
  "variant8W12",
  "variant8W14",
  "variant8W16",
  "variant9W10",
  "variant9W12",
  "variant9W14",
  "variant9W16",
];
const shapeColors = ["0a5b83", "1c799f", "69d2e7", "f1f4dc"];
export const generateAvatar = () => {
  const backgroundColor = pickupElement(backgroundColors);
  const backgroundType = pickupElement(backgroundTypes);
  const eye = pickupElement(eyes);
  const shapeColor = pickupElement(shapeColors);
  const url = `https://api.dicebear.com/9.x/thumbs/svg?backgroundColor=${backgroundColor}&backgroundType=${backgroundType}&eyes=${eye}&shapeColor=${shapeColor}`;
  return url;
};
