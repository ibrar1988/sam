import { IStandardResponse } from "core/interfaces/IStandardResponse";

export interface ICollegeComparisonResponse {
    response: IStandardResponse;
    comparison: IComparisonDetail[];
}

export interface IComparisonDetail {
    scid: String;
    arco_name: String;
    state: String;
    city: String;
    public_private: String;
    total_under_3: number;
    rank_overall: number;
    rank_art: number;
    rank_business: number;
    rank_medical: number;
    rank_cs: number;
    rank_engineer: number;
    rank_life_science: number;
    rank_physical_science: number;
    rank_social_science: number;
    acceptance_rate: number;
    satreasoning_comb_1: number;
    satreasoning_comb_2: number;
    satreasoning_average_3: String;
    actrange_comp_1: number;
    actrange_comp_2: number;
    act_average_1: String;
    ave_second_gpa: number;
    tuition_outstate: number;
    tuition_instate: number;
    pc_borrow: String;
    ftf_aid_4: String;
    ftf_aid_1: String;
    degree_o: String;
    major_o: String;
    pc_related_1: String;
    pc_related_2: String;
    pc_related_3: String;
    salary_10_year: String;
    total_grad_1: String;
    total_grad_2: String;
    ugrad_break_2: String;
    ugrad_break_3: String;
    ugrad_break_4: String;
    ugrad_break_6: String;
    ugrad_break_10: String;
    student_staff_ratio: String;
}