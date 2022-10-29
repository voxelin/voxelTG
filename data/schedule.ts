import { links } from "./links";
export const schedule: { [key: string]: { start: string, end: string, link: string | string[], name: string, sent?: boolean }[] } = {
    "Monday": [
        { start: "08:15", end: "09:00", link: links["German"], name: "💬 Німецька" },
        { start: "09:15", end: "10:00", link: links["Physics"], name: "🔬 Фізика" },
        { start: "10:15", end: "11:00", link: [links["EnglishA"], links["EnglishB"]], name: "📚 Англійська" },
        { start: "11:15", end: "12:00", link: links["Chemistry"], name: "🧪 Хімія" },
        { start: "12:10", end: "12:55", link: links["Algebra"], name: "📐 Алгебра" },
        { start: "13:05", end: "13:50", link: links["Ukrainian"], name: "📚 Українська мова" },
        { start: "14:00", end: "14:45", link: "", name: "🏃‍♂️ Фізична культура" },
    ],
    "Tuesday": [
        { start: "08:15", end: "09:00", link: links["FLit"], name: "📚 Зарубіжна література" },
        { start: "09:15", end: "10:00", link: [links["Art"], links["Biology"]], name: "🎨 Мистецтво | 📜 Основи здоров'я" },
        { start: "10:15", end: "11:00", link: links["Geometry"], name: "📐 Геометрія" },
        { start: "11:15", end: "12:00", link: links["UkrainianLit"], name: "📚 Українська література" },
        { start: "12:10", end: "12:55", link: links["History"], name: "📜 Історія України" },
        { start: "13:05", end: "13:50", link: links["Ukrainian"], name: "📚 Українська мова" },
        { start: "13:55", end: "14:40", link: links["Geography"], name: "🌍 Географія" },
    ],
    "Wednesday": [
        { start: "08:15", end: "09:00", link: links["History"], name: "📜 Всесвітня Історія" },
        { start: "09:15", end: "10:00", link: links["Physics"], name: "🔬 Фізика" },
        { start: "10:15", end: "11:00", link: [links["EnglishA"], links["EnglishB"]], name: "📚 Англійська" },
        { start: "11:15", end: "12:00", link: links["Chemistry"], name: "🧪 Хімія" },
        { start: "12:10", end: "12:55", link: [links["EnglishA"], links["EnglishB"]], name: "📚 Англійська" },
        { start: "13:05", end: "13:50", link: [links["InformaticsA"], links["InformaticsB"]], name: "💻 Інформатика" },
        { start: "13:55", end: "14:40", link: links["Biology"], name: "🦠 Біологія" },
        { start: "14:00", end: "14:45", link: "", name: "🏃‍♂️ Фізична культура" },
    ],
    "Thursday": [
        { start: "08:15", end: "09:00", link: links["Algebra"], name: "📐 Алгебра" },
        { start: "09:15", end: "10:00", link: links["FLit"], name: "📚 Зарубіжна література" },
        { start: "10:15", end: "11:00", link: links["Physics"], name: "🔬 Фізика" },
        { start: "11:15", end: "12:00", link: links["Law"], name: "📜 Правознавство" },
        { start: "12:10", end: "12:55", link: links["German"], name: "💬 Німецька" },
        { start: "13:05", end: "13:50", link: [links["EnglishA"], links["EnglishB"]], name: "📚 Англійська" },
        { start: "13:55", end: "14:40", link: [links["Geography"], links["History"]], name: "🌍 Географія | 📜 Історія України" },
        { start: "14:00", end: "14:45", link: "", name: "🔧 Трудове навчання" },
    ],
    "Friday": [
        { start: "08:15", end: "09:00", link: "", name: "🏃‍♂️ Фізична культура" },
        { start: "09:15", end: "10:00", link: links["UkrainianLit"], name: "📚 Українська література" },
        { start: "10:15", end: "11:00", link: [links["EnglishA"], links["EnglishB"]], name: "📚 Англійська" },
        { start: "11:15", end: "12:00", link: links["Biology"], name: "🦠 Біологія" },
        { start: "12:10", end: "12:55", link: links["Geometry"], name: "📐 Геометрія" },
        { start: "13:05", end: "13:50", link: [links["InformaticsA"], links["InformaticsB"]], name: "💻 Інформатика" },
    ],
}