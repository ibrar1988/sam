export interface IC0018 {
  ibclasses?: IbclassesEntity[] | null;
  subject?: SubjectEntity[] | null;
}
export interface IbclassesEntity {
  ib: string;
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


export class IC0018 implements IC0018 {

  constructor() {
    this.subject = [
      {
        subject_code: '1',
        description: 'English ',
        courses: [
          {
            course_code: 'E01',
            description: 'English'
          },
          {
            course_code: 'E02',
            description: 'English I'
          },
          {
            course_code: 'E03',
            description: 'English II'
          },
          {
            course_code: 'E04',
            description: 'English III'
          },
          {
            course_code: 'E05',
            description: 'American Literature'
          },
          {
            course_code: 'E06',
            description: 'Other'
          },
        ]
      },

      {
        subject_code: '2',
        description: 'Math & Computer Science',
        courses: [
          {
            course_code: 'M01',
            description: 'Algebra I'
          },
          {
            course_code: 'M02',
            description: 'Algebra II'
          },
          {
            course_code: 'M03',
            description: 'Calculus AB'
          },
          {
            course_code: 'M04',
            description: 'Calculus BC'
          },
          {
            course_code: 'M05',
            description: 'Computer Science'
          },
          {
            course_code: 'M07',
            description: 'Geometry'
          },
          {
            course_code: 'M08',
            description: 'Multivariable Calculus'
          },
          {
            course_code: 'M09',
            description: 'Pre-Calculus'
          },
          {
            course_code: 'M10',
            description: 'Probability'
          },
          {
            course_code: 'M11',
            description: 'Statistics '
          },
          {
            course_code: 'M12',
            description: 'Trigonometry '
          },
          {
            course_code: 'M13',
            description: 'Other'
          }
        ]
      },

      {
        subject_code: '3',
        description: 'Science',
        courses: [
          {
            course_code: 'S01',
            description: 'Anatomy and Physiology'
          },
          {
            course_code: 'S02',
            description: 'Biology'
          },
          {
            course_code: 'S03',
            description: 'Biology/Genetics'
          },
          {
            course_code: 'S04',
            description: 'Chemistry'
          },
          {
            course_code: 'S05',
            description: 'Chemistry II'
          },
          {
            course_code: 'S06',
            description: 'Environmental Science '
          },
          {
            course_code: 'S07',
            description: 'Marine Biology'
          },
          {
            course_code: 'S08',
            description: 'Physics I'
          },
          {
            course_code: 'S09',
            description: 'Physics II'
          },
          {
            course_code: 'S10',
            description: 'Other'
          }
        ]
      },

      {
        subject_code: '4',
        description: 'World Languages & Cultures',
        courses: [
          {
            course_code: 'W01',
            description: 'French'
          },
          {
            course_code: 'W02',
            description: 'Latin'
          },
          {
            course_code: 'W03',
            description: 'Spanish'
          },
          {
            course_code: 'W04',
            description: 'Chinese'
          },
          {
            course_code: 'W05',
            description: 'Germany'
          },
          {
            course_code: 'W06',
            description: 'Italian'
          }
          ,
          {
            course_code: 'W07',
            description: 'Japanese'
          }
          ,
          {
            course_code: 'W08',
            description: 'Korean'
          }
          ,
          {
            course_code: 'W09',
            description: 'Other'
          }
        ]
      },
      {
        subject_code: '5',
        description: 'History & Social Science',
        courses: [
          {
            course_code: 'S01',
            description: 'American Government '
          },
          {
            course_code: 'S02',
            description: 'Economics'
          },
          {
            course_code: 'S03',
            description: 'European History '
          },
          {
            course_code: 'S04',
            description: 'Global Studies II'
          },
          {
            course_code: 'S05',
            description: 'Government and Economics'
          },
          {
            course_code: 'S06',
            description: 'Macroeconomics'
          },
          {
            course_code: 'S07',
            description: 'Philosophy'
          },
          {
            course_code: 'S08',
            description: 'The World and Europe II'
          },
          {
            course_code: 'S09',
            description: 'US Government '
          },
          {
            course_code: 'S10',
            description: 'US History'
          },
          {
            course_code: 'S11',
            description: 'World Cultural Geography'
          },
          {
            course_code: 'S12',
            description: 'World Geography'
          },
          {
            course_code: 'S13',
            description: 'World History'
          },
          {
            course_code: 'S14',
            description: 'Other'
          }
        ]
      },
      {
        subject_code: '6',
        description: 'Arts',
        courses: [
          {
            course_code: 'A01',
            description: 'Performing Arts'
          },
          {
            course_code: 'A02',
            description: 'Visual Arts'
          },
          {
            course_code: 'A03',
            description: 'Theoretical Arts'
          },
          {
            course_code: 'A04',
            description: 'Applied Arts'
          }
        ]
      }
    ];


  }
}



