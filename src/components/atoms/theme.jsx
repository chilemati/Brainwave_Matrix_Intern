import { atom } from "recoil";


export const themeAtom = atom({
    key: "themeAtom",
    default: {
        system:  true,
        dark:  false,
        light:  false,
    },
})