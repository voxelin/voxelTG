import { HydrateFlavor } from "@grammyjs/hydrate"
import { Context, SessionFlavor } from "grammy"
export type zoom_url = {
    "German": string,
    "Physics": string,
    "EnglishA": string,
    "EnglishB": string,
    "InformaticsA": string,
    "InformaticsB": string,
    "Chemistry": string,
    "Algebra": string,
    "Geometry": string,
    "Ukrainian": string,
    "UkrainianLit": string,
    "Biology": string,
    "Geography": string,
    "History": string,
    "FLit": string,
    "Art": string,
    "Law": string
}

export type schedule = {
    [key: string]: { name: string, start: string, end: string, link: zoom_url[] | zoom_url }[]
}

export type CustomContext = Context & HydrateFlavor<Context> & SessionFlavor<{ last: number; }>;
