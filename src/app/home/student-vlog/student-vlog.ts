import { OnInit } from "@angular/core";



export interface StudentVLogs {
    studentVLogs?: StudentVLogEntity[] | null;
}

export interface StudentVLogEntity {
    url: string;
    title: string;
    description: string;
}

export class StudentVLogs implements StudentVLogs, OnInit{
    ngOnInit(): void {
        window.scrollTo(0, 0);
    }
    constructor(){
        this.studentVLogs = [
            {  
                url: "https://www.youtube.com/watch?v=bOHp4suGnKY&list=PLx6_B_D1pBkpciiVYIpJsd0_rywy3QQQP", 
                title: "Getting to College Ep. 1", 
                description: "Introducing a brand new series 'Getting to College'. Chronicling the life and decisions of Alec Jones on his way to College and everything along the way." 
            },
            {
                url: "https://www.youtube.com/watch?v=AaY30HVGyq8&index=2&list=PLx6_B_D1pBkpciiVYIpJsd0_rywy3QQQP", 
                title: "Getting to College Ep. 2", 
                description: "In this new episode of Getting to College, Alec talked about his first month of school and he's starting a new job!" 
            }
        ]
    }
}