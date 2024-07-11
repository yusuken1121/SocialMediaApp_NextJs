"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAvatar = void 0;
const colors = ["FF548F", "9061C2", "BE80FF", "63D3FF", "02779E"];
const lowerStrColors = colors.map((color) => color.toLocaleLowerCase());
const generateAvatar = (name) => {
    return `https://source.boringavatars.com/beam/40/${encodeURIComponent(name)}?colors=${lowerStrColors.join(",")}`;
};
exports.generateAvatar = generateAvatar;
