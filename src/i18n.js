// i18n.js - Configuration file
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
    en: {
        translation: {
            inclusion:'Inclusion',
            chart1: "Non-inclusive terms: trend",
            lastscan:"Last Scan",
            percentages:"Percentages",
            Recurringwords:"Recurring words",
            mostrecurring:"The most recurring",
            score:"Score",
            ranking:"Ranking of non-inclusive terms found",
            compare:"compared to the last scan",
            date:"3 December 2024",
            Colleagues:"Colleagues",
            Welcome:"Welcome",
            candidate:"candidate",
            Men:"Men",
            

        }
    },
    it: {
        translation: {
            inclusion:'INCLUSIONE',
            chart1: "Termini non inclusivi: andamento",
            lastscan:"Ultima scansione",
            percentages:"Percentuali",
            Recurringwords:"Parole ricorrenti",
            mostrecurring:"I più ricorrenti",
            score:"Punteggio",
            ranking:"Classifica dei termini non inclusivi riscontrati",
            compare:"rispetto alla scorsa scansione",
            date:"3 Dicembre 2024",
            Colleagues:"Colleghi",
            Welcome:"Benvenuto",
            candidate:"candidato",
            Men:"Uomini",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // Default language
        fallbackLng: 'en', // Fallback language
        interpolation: {
            escapeValue: false // React already escapes values
        }
    });

export default i18n;