export interface IC0037 {
    grades?: GradeEntity[] | null;
    subject?: SubjectEntity[] | null;
    languages?: LanguageEntity[] | null;
    languages_proficiency?: LanguageProficiencyEntity[] | null;
}

export interface GradeEntity {
    grade_code: string;
    description: string;
    //subjects: SubjectEntity[] | null;
}

export interface SubjectEntity {
    subject_code: string;
    description: string;
    courses: CourseEntity[] | null;
}

export interface CourseEntity {
    course_code: string;
    description: string;
}

export interface LanguageEntity {
    code: string;
    description: string;
}

export interface LanguageProficiencyEntity {
    code: string;
    description: string;
}

export class IC0037 implements IC0037 {
    constructor() {
        this.grades = [
            { grade_code: "8", description: "8th" },
            { grade_code: "9", description: "9th" },
            { grade_code: "10", description: "10th" },
            { grade_code: "11", description: "11th" },
            { grade_code: "12", description: "12th" }
        ];

        this.subject = [
            {
                subject_code: "S01", description: "English", courses: [
                    { course_code: "C0101", description: "American Literature"},
                    { course_code: "C0102", description: "British Literature"},
                    { course_code: "C0103", description: "English"},
                    { course_code: "C0104", description: "English I"},
                    { course_code: "C0105", description: "English II"},
                    { course_code: "C0106", description: "English III"},
                    { course_code: "C0107", description: "English IV"},
                    { course_code: "C0108", description: "Language Arts"},
                    { course_code: "C0109", description: "Modern World Literature"},
                    { course_code: "C0110", description: "Reading"},
                    { course_code: "C0111", description: "Speech/Debate"},
                    { course_code: "C0112", description: "Writing"},
                    { course_code: "C0113", description: "Writing Composition"},
                    { course_code: "C0114", description: "Other"}
                ]
            },
            {
                subject_code: "S02", description: "History & Social Science", courses: [
                    { course_code: "C0201", description: "American Government" },
                    { course_code: "C0202", description: "Economics" },
                    { course_code: "C0203", description: "European History" },
                    { course_code: "C0204", description: "Global Studies I" },
                    { course_code: "C0205", description: "Global Studies II" },
                    { course_code: "C0206", description: "Government and Economics" },
                    { course_code: "C0207", description: "History" },
                    { course_code: "C0208", description: "Macroeconomics" },
                    { course_code: "C0209", description: "Microeconomics" },
                    { course_code: "C0210", description: "Philosophy" },
                    { course_code: "C0211", description: "Psychology" },
                    { course_code: "C0212", description: "Sociology" },
                    { course_code: "C0213", description: "The World and Europe I" },
                    { course_code: "C0214", description: "The World and Europe II" },
                    { course_code: "C0215", description: "US Government" },
                    { course_code: "C0216", description: "US History" },
                    { course_code: "C0217", description: "US History I" },
                    { course_code: "C0218", description: "US History II" },
                    { course_code: "C0219", description: "World Cultural Geography" },
                    { course_code: "C0220", description: "World Geography" },
                    { course_code: "C0221", description: "World History" },
                    { course_code: "C0222", description: "Other" }
                ]
            },
            {
                subject_code: "S03", description: "Math & Computer Science", courses: [
                    { course_code: "C0301", description: "Algebra I" },
                    { course_code: "C0302", description: "Algebra II" },
                    { course_code: "C0303", description: "Calculus AB" },
                    { course_code: "C0304", description: "Calculus BC" },
                    { course_code: "C0305", description: "Computer Science" },
                    { course_code: "C0306", description: "Geometry" },
                    { course_code: "C0307", description: "Math Analysis" },
                    { course_code: "C0308", description: "Mathematics" },
                    { course_code: "C0309", description: "Multivariable Calculus" },
                    { course_code: "C0310", description: "Pre-Algebra" },
                    { course_code: "C0311", description: "Pre-Calculus" },
                    { course_code: "C0312", description: "Pre-Calculus" },
                    { course_code: "C0313", description: "Probability" },
                    { course_code: "C0314", description: "Statistics" },
                    { course_code: "C0315", description: "Trigonometry" },
                    { course_code: "C0316", description: "Other" }
                ]
            },
            {
                subject_code: "S04", description: "Sciences", courses: [
                    { course_code: "C0401", description: "Agriculture" },
                    { course_code: "C0402", description: "Anatomy and Physiology" },
                    { course_code: "C0403", description: "Biology" },
                    { course_code: "C0404", description: "Chemistry" },
                    { course_code: "C0405", description: "Chemistry I" },
                    { course_code: "C0406", description: "Chemistry II" },
                    { course_code: "C0407", description: "Earth Science" },
                    { course_code: "C0408", description: "Environmental Science" },
                    { course_code: "C0409", description: "Geology" },
                    { course_code: "C0410", description: "Marine Biology" },
                    { course_code: "C0411", description: "Physical Science" },
                    { course_code: "C0412", description: "Physics" },
                    { course_code: "C0413", description: "Physics I" },
                    { course_code: "C0414", description: "Physics II" },
                    { course_code: "C0415", description: "Science" },
                    { course_code: "C0416", description: "Other" }
                ]
            },
            {
                subject_code: "S05", description: "Foreign Language", courses: [
                    { course_code: "C0501", description: "Chinese" },
                    { course_code: "C0502", description: "French" },
                    { course_code: "C0503", description: "German" },
                    { course_code: "C0504", description: "Hebrew" },
                    { course_code: "C0505", description: "Japanese" },
                    { course_code: "C0506", description: "Latin" },
                    { course_code: "C0507", description: "Spanish" },
                    { course_code: "C0508", description: "Other" }
                ]
            },
            {
                subject_code: "S06", description: "Arts", courses: [
                    { course_code: "C0601", description: "Applied Arts" },
                    { course_code: "C0602", description: "Art History" },
                    { course_code: "C0603", description: "Band" },
                    { course_code: "C0604", description: "Broadcasting" },
                    { course_code: "C0605", description: "Choir" },
                    { course_code: "C0606", description: "Dance" },
                    { course_code: "C0607", description: "Drawing" },
                    { course_code: "C0608", description: "General Music" },
                    { course_code: "C0609", description: "Graphic Communication" },
                    { course_code: "C0610", description: "Music Appreciation" },
                    { course_code: "C0611", description: "Music History" },
                    { course_code: "C0612", description: "Music Theory" },
                    { course_code: "C0613", description: "Performing Arts" },
                    { course_code: "C0614", description: "Photogrophy" },
                    { course_code: "C0615", description: "Photojournalism" },
                    { course_code: "C0616", description: "Sculpture" },
                    { course_code: "C0617", description: "Theoretical Arts" },
                    { course_code: "C0618", description: "Visual Arts" },
                    { course_code: "C0619", description: "Other" }
                ]
            }
        ];

        this.languages = [
            { code: "L01", description: "Arabic" },
            { code: "L02", description: "Armenian" },
            { code: "L03", description: "American Sign Language" },
            { code: "L04", description: "Bantu" },
            { code: "L05", description: "Bengali" },
            { code: "L06", description: "Cantonese" },
            { code: "L07", description: "Dari" },
            { code: "L08", description: "Farsi" },
            { code: "L09", description: "French" },
            { code: "L10", description: "German" },
            { code: "L11", description: "Arabic" },
            { code: "L12", description: "Greek (Modern)" },
            { code: "L13", description: "Greek (Ancient)" },
            { code: "L14", description: "Gujarati" },
            { code: "L15", description: "Haitian" },
            { code: "L16", description: "Hebrew" },
            { code: "L17", description: "Hindi" },
            { code: "L18", description: "Hmong" },
            { code: "L19", description: "Italian" },
            { code: "L20", description: "Japanese" },
            { code: "L21", description: "Khmer" },
            { code: "L22", description: "Korean" },
            { code: "L23", description: "Latin" },
            { code: "L24", description: "Mandarin" },
            { code: "L25", description: "Navajo" },
            { code: "L26", description: "Persian" },
            { code: "L27", description: "Polish" },
            { code: "L28", description: "Portuguese" },
            { code: "L29", description: "Punjabi" },
            { code: "L30", description: "Russian" },
            { code: "L31", description: "Sanskrit" },
            { code: "L32", description: "Serbo-Croatian" },
            { code: "L33", description: "Spanish" },
            { code: "L34", description: "Tagalog" },
            { code: "L35", description: "Tai-Kadai" },
            { code: "L36", description: "Tamil" },
            { code: "L37", description: "Telegu" },
            { code: "L38", description: "Turkish" },
            { code: "L39", description: "Urdu" },
            { code: "L40", description: "Vietnamese" },
            { code: "L41", description: "Others" }// added new other kmipl
        ];

        this.languages_proficiency = [
            { code: "LP01", description: "Basic Knowledge" },
            { code: "LP02", description: "Conversant" },
            { code: "LP03", description: "Proficient" },
            { code: "LP04", description: "Fluent" },
            { code: "LP05", description: "Bilingual" },
            { code: "LP06", description: "Native" }
        ];
    }
}