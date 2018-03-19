export interface IC0017 {
  apclasses?: ApclassesEntity[] | null;
  subject?: SubjectEntity[] | null;
}
export interface ApclassesEntity {
  AP: string;
  properties?: PropertiesEntity[] | null;
}
export interface PropertiesEntity {
  ap_classes: string;
  school_year: string;
  grade: string;
  score: string;
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


export class IC0017 implements IC0017 {

  constructor() {
    this.subject = [
      {
        subject_code: '7',
        description: 'AP Capstone',
        courses: [
          {
            course_code: 'C01',
            description: 'AP Seminar'
          },
          {
            course_code: 'C02',
            description: 'Ap Research'
          }
        ]
      },
      {
        subject_code: '1',
        description: 'Arts',
        courses: [
          {
            course_code: 'A01',
            description: 'AP Art History'
          },
          {
            course_code: 'A02',
            description: 'AP Music Theory'
          },
          {
            course_code: 'A03',
            description: 'AP Studio Art: 2-D Design'
          },
          {
            course_code: 'A04',
            description: 'AP Studio Art: 3-D Design'
          },
          {
            course_code: 'A05',
            description: 'AP Studio Art: Drawing'
          },
          // {
          //   course_code: 'A06',
          //   description: 'Other (add if other, please specify)'
          // },
        ]
      },

      {
        subject_code: '2',
        description: 'English',
        courses: [
          {
            course_code: 'E01',
            description: 'AP English Language and Composition'
          },
          {
            course_code: 'E02',
            description: 'AP English Literature and Composition'
          },
          // {
          //   course_code: 'E03',
          //   description: 'Other (add if other, please specify)'
          // }
        ]
      },
      {
        subject_code: '5',
        description: 'Foreign Language',
        courses: [
          {
            course_code: 'S01',
            description: 'AP Chinese Language and Culture'
          },
          {
            course_code: 'S02',
            description: 'AP French Language and Culture'
          },
          {
            course_code: 'S03',
            description: 'AP French Literature'
          },
          {
            course_code: 'S04',
            description: 'AP German Language and Culture'
          },
          {
            course_code: 'S05',
            description: 'AP Italian Language and Culture'
          },
          {
            course_code: 'S06',
            description: 'AP Japanese Language and Culture'
          },
          {
            course_code: 'S07',
            description: 'AP Latin (Virgil, Catullus and Horace)'
          },
          {
            course_code: 'S08',
            description: 'AP Spanish Language and Culture'
          }
        ]
      },

      {
        subject_code: '3',
        description: 'History & Social Science',
        courses: [
          {
            course_code: 'H01',
            description: 'AP Comparative Government and Politics'
          },
          {
            course_code: 'H02',
            description: 'AP European History'
          },
          {
            course_code: 'H03',
            description: 'AP Human Geography'
          },
          {
            course_code: 'H04',
            description: 'AP Macroeconomics'
          },
          {
            course_code: 'H05',
            description: 'AP Microeconomics'
          },
          {
            course_code: 'H06',
            description: 'AP Psychology'
          },
          {
            course_code: 'H07',
            description: 'AP United States Government and Politics'
          },
          {
            course_code: 'H08',
            description: 'AP United States History'
          },
          {
            course_code: 'H09',
            description: 'AP World History'
          },
          // {
          //   course_code: 'H10',
          //   description: 'Other (add if other, please specify)'
          // }
        ]
      },

      {
        subject_code: '4',
        description: 'Math & Computer Science',
        courses: [
          {
            course_code: 'M01',
            description: 'AP Calculus AB'
          },
          {
            course_code: 'M02',
            description: 'AP Calculus BC'
          },
          {
            course_code: 'M03',
            description: 'AP Computer Science A'
          },
          {
            course_code: 'M04',
            description: 'AP Computer Science Principles'
          },
          {
            course_code: 'M05',
            description: 'AP Statistics'
          },
          // {
          //   course_code: 'M06',
          //   description: 'Other (add if other, please specify)'
          // }
        ]
      },
      
      // {
      //   subject_code: '5',
      //   description: 'Sciences',
      //   courses: [
      //     {
      //       course_code: 'S01',
      //       description: 'AP Biology'
      //     },
      //     {
      //       course_code: 'S02',
      //       description: 'AP Chemistry'
      //     },
      //     {
      //       course_code: 'S03',
      //       description: 'AP Environmental Science'
      //     },
      //     {
      //       course_code: 'S04',
      //       description: 'AP Physics C: Electricity and Magnetism'
      //     },
      //     {
      //       course_code: 'S05',
      //       description: 'AP Physics C: Mechanics'
      //     },
      //     {
      //       course_code: 'S06',
      //       description: 'AP Physics 1: Algebra-Based'
      //     },
      //     {
      //       course_code: 'S07',
      //       description: 'AP Physics 2: Algebra-Based'
      //     },
      //     // {
      //     //   course_code: 'S08',
      //     //   description: 'Other (add if other, please specify)'
      //     // }
      //   ]
      // },
      {
        subject_code: '6',
        description: 'World Languages & Cultures',
        courses: [
          {
            course_code: 'S01',
            description: 'AP Chinese Language and Culture'
          },
          {
            course_code: 'S02',
            description: 'AP French Language and Culture'
          },
          {
            course_code: 'S03',
            description: 'AP Environmental Science'
          },
          {
            course_code: 'S04',
            description: 'AP Physics C: Electricity and Magnetism'
          },
          {
            course_code: 'S05',
            description: 'AP Physics C: Mechanics'
          },
          {
            course_code: 'S06',
            description: 'AP Physics 1: Algebra-Based'
          },
          {
            course_code: 'S07',
            description: 'AP Physics 2: Algebra-Based'
          },
          // {
          //   course_code: 'S08',
          //   description: 'Other (add if other, please specify)'
          // }
        ]
      }
      
    ];


  }
}
