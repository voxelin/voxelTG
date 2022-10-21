import { links } from "./links"
import { english_group_message, informatics_group_message } from "./messages"
export const schedule: { [key: string]: { start: string, end: string, link: string, name: string, sent?: boolean }[] } = {
    "Monday": [
        { start: "08:15", end: "09:00", link: links["German"], name: "💬 Німецька" },
        { start: "09:15", end: "10:00", link: links["Physics"], name: "🔬 Фізика" },
        { start: "10:15", end: "11:00", link: english_group_message, name: "📚 Англійська" },
        { start: "11:15", end: "12:00", link: links["Chemistry"], name: "🧪 Хімія" },
        { start: "12:10", end: "12:55", link: links["Algebra"], name: "📐 Алгебра" },
        { start: "13:05", end: "13:50", link: links["Ukrainian"], name: "📚 Українська мова" },
    ],
    "Tuesday": [
        { start: "08:15", end: "09:00", link: links["FLit"], name: "📚 Зарубіжна література" },
        { start: "09:15", end: "10:00", link: links["Art"], name: "🎨 Мистецтво" },
        { start: "10:15", end: "11:00", link: links["Geometry"], name: "📐 Геометрія" },
        { start: "11:15", end: "12:00", link: links["UkrainianLit"], name: "📚 Українська література" },
        { start: "12:10", end: "12:55", link: links["History"], name: "📜 Історія України" },
        { start: "13:05", end: "13:50", link: links["Ukrainian"], name: "📚 Українська мова" },
        { start: "13:55", end: "14:40", link: links["Geography"], name: "🌍 Географія" },
    ],
    "Wednesday": [
        { start: "08:15", end: "09:00", link: links["History"], name: "📜 Всесвітня Історія" },
        { start: "09:15", end: "10:00", link: links["Physics"], name: "🔬 Фізика" },
        { start: "10:15", end: "11:00", link: english_group_message, name: "📚 Англійська" },
        { start: "11:15", end: "12:00", link: links["Chemistry"], name: "🧪 Хімія" },
        { start: "12:10", end: "12:55", link: english_group_message, name: "📚 Англійська" },
        { start: "13:05", end: "13:50", link: informatics_group_message, name: "💻 Інформатика" },
        { start: "13:55", end: "14:40", link: links["Biology"], name: "🦠 Біологія" },
    ],
    "Thursday": [
        { start: "08:15", end: "09:00", link: links["Algebra"], name: "📐 Алгебра" },
        { start: "09:15", end: "10:00", link: links["FLit"], name: "📚 Зарубіжна література" },
        { start: "10:15", end: "11:00", link: links["Physics"], name: "🔬 Фізика" },
        { start: "11:15", end: "12:00", link: links["Law"], name: "📜 Правознавство" },
        { start: "12:10", end: "12:55", link: links["German"], name: "💬 Німецька" },
        { start: "13:05", end: "13:50", link: english_group_message, name: "📚 Англійська" },
        { start: "13:55", end: "14:40", link: links["Geography"], name: "🌍 Географія" },
    ],
    "Friday": [
        { start: "09:15", end: "10:00", link: links["UkrainianLit"], name: "📚 Українська література" },
        { start: "10:15", end: "11:00", link: english_group_message, name: "📚 Англійська" },
        { start: "11:15", end: "12:00", link: links["Biology"], name: "🦠 Біологія" },
        { start: "12:10", end: "12:55", link: links["Geometry"], name: "📐 Геометрія" },
        { start: "13:05", end: "13:50", link: informatics_group_message, name: "💻 Інформатика" },
    ],
}
