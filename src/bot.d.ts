import { HydrateFlavor } from "@grammyjs/hydrate"
import { Context } from "grammy"
export type urls = {
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

export type mgs = {
    [key: string]: string,
    "Monday": string,
    "Tuesday": string,
    "Wednesday": string,
    "Thursday": string,
    "Friday": string,
    "Saturday": string,
    "Sunday": string
}

export type botcontext = HydrateFlavor<Context>;