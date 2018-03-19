import {Component, OnInit} from '@angular/core';
// import { LoginService } from '../../../_services/login.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from 'core/services/Account/login.service';
import {FbService} from 'core/services/Account/fbLogin.service';
import {IdleComponent} from 'app/_tools/idle/idle.component';
import {ILogin} from 'core/interfaces/Account/ILogin';
import {ILoginResponse} from 'core/interfaces/Account/ILoginResponse';
import {NotificationsService} from 'angular2-notifications';
import {IMultiSelectOption, IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import {StatesService} from '../../../../core/services/Account/states.service';
import {IStateResponse} from '../../../../core/interfaces/Account/IStateResponse';
import {CollegeFilterService} from '../../../../core/services/Analytics/collegeFilter.service';
import {ComplexFilter, IComplexFilter} from '../../../../core/interfaces/Analytics/IComplexFilter';
import {FilterParameter, IFilterParameter} from '../../../../core/interfaces/Analytics/IFilterParameter';
import {FilterParameterGroup, IFilterParameterGroup} from '../../../../core/interfaces/Analytics/IFilterParameterGroup';
import {ICollegesResponse} from '../../../../core/interfaces/Analytics/ICollegesResponse';
import { ICollegeComparisonRequest } from 'core/interfaces/Analytics/ICollegeComparisonRequest';
import { ICollegeComparisonResponse } from 'core/interfaces/Analytics/ICollegeComparisonResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var google: any;
declare const $: any;


@Component({
  selector: 'app-analytics',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})

export class FinderComponent implements OnInit {
  public searchString: String;
  public searchRange: number;
  public searchCollegeType: number;

  optionsModel: number[];
  optionsModel2: number[];
  optionsModelMajor: string[];
  optionsSportsMen: string[];
  optionsSportsWomen: string[];

// RANGE SLIDER VALUES
  studentsRangeValues: number[] = [0, 70000];
  gpaRangeValues: number[] = [0, 400];
  admisionRangeValues: number[] = [0, 100];
  rankOverallRangeValues: number[] = [0, 800];
  artRangeValues: number[] = [0, 100];
  businessRangeValues: number[] = [0, 100];
  medicalRangeValues: number[] = [0, 100];
  computerRangeValues: number[] = [0, 100];
  engineeringRangeValues: number[] = [0, 100];
  lifeRangeValues: number[] = [0, 100];
  physicalRangeValues: number[] = [0, 100];
  socialRangeValues: number[] = [0, 100];
  satCompositeRangeValues: number[] = [400, 1600];
  satMathRangeValues: number[] = [200, 800];
  satEnglishRangeValues: number[] = [200, 800];
  actCompositeRangeValues: number[] = [1, 36];
  actMathRangeValues: number[] = [1, 36];
  actEnglishRangeValues: number[] = [1, 36];

  outStateRangeValues: number[] = [0, 100000];
  inStateRangeValues: number[] = [0, 80000];

  stateList: IMultiSelectOption[];
  myOptions2: IMultiSelectOption[];
  MajorList: IMultiSelectOption[];
  SportsMenList: IMultiSelectOption[];
  SportsWomenList: IMultiSelectOption[];

  public complexFilter: ComplexFilter;
  public searchResults: ICollegesResponse;
  // public state: IMultiSelectOption;
  searchTags: SearchTags[];

  public statesResponse: IStateResponse;
  errorMessage: String;
  collegeNameSearchId:number;

  // Settings configuration
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true,
    selectionLimit: 5
  };

  public type = '';

  //Comparison Table
  colleges_to_compare: CollegeCompare[] = [];
  comparisonCollege: ICollegeComparisonResponse;
  closeResult: string;
  comparisonObject: any;

  constructor(private stateService: StatesService, private collegeFilter: CollegeFilterService, 
      private _notification: NotificationsService, private modalService: NgbModal) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    // this.colleges_to_compare = [
    //   "College 1",
    //   "College 2",
    //   "College 3",
    //   "College 4"
    // ];

    this.stateService.getStates('USA')
      .subscribe(states => {
        this.statesResponse = states;
        this.stateList = [];
        for (const i of this.statesResponse.states) {
          this.stateList.push({id: i.code.toString(), name: i.name.toString()});
        }

      }, error => {
      });

    this.myOptions2 = [
      {id: 'M', name: 'Midwest'},
      {id: 'N', name: 'Northeast'},
      {id: 'S', name: 'Southeast'},
      {id: 'W', name: 'West'}
    ];


    this.MajorList = [
      {id: '1', name: 'Accounting'},
      {id: '2', name: 'Acting'},
      {id: '3', name: 'Actuarial Science'},
      {id: '4', name: 'Advertising'},
      {id: '5', name: 'Aerospace Studies'},
      {id: '6', name: 'African American Studies'},
      {id: '7', name: 'African Studies'},
      {id: '8', name: 'Agriculture'},
      {id: '9', name: 'Animal Science'},
      {id: '10', name: 'Anthropology'},
      {id: '11', name: 'Arabic'},
      {id: '12', name: 'Archaeology'},
      {id: '13', name: 'Architecture'},
      {id: '14', name: 'Art History'},
      {id: '15', name: 'Asian American Studies'},
      {id: '16', name: 'Asian Languages'},
      {id: '17', name: 'Astronomy'},
      {id: '18', name: 'Astrophysics'},
      {id: '19', name: 'Athletic Training'},
      {id: '20', name: 'Atmospheric Science'},
      {id: '21', name: 'Biochemistry'},
      {id: '22', name: 'Biology'},
      {id: '23', name: 'Biophysics'},
      {id: '24', name: 'Business'},
      {id: '25', name: 'Chemical Engineering'},
      {id: '26', name: 'Chemistry'},
      {id: '27', name: 'Chinese'},
      {id: '28', name: 'Civil Engineering'},
      {id: '29', name: 'Classical Civilization'},
      {id: '30', name: 'Classics'},
      {id: '31', name: 'Climate Science'},
      {id: '32', name: 'Cognitive Science'},
      {id: '33', name: 'Communication'},
      {id: '34', name: 'Comparative Literature'},
      {id: '35', name: 'Computer Science'},
      {id: '36', name: 'Construction Engineering and Management'},
      {id: '37', name: 'Criminal Justice'},
      {id: '38', name: 'Culinary Arts'},
      {id: '39', name: 'Dietetics'},
      {id: '40', name: 'Divinity'},
      {id: '41', name: 'Ecology'},
      {id: '42', name: 'Economics'},
      {id: '43', name: 'Education'},
      {id: '44', name: 'Electrical Engineering'},
      {id: '45', name: 'Engineering'},
      {id: '46', name: 'English'},
      {id: '47', name: 'Environmental Studies'},
      {id: '48', name: 'Ethnic Studies'},
      {id: '49', name: 'European Studies'},
      {id: '50', name: 'Fashion'},
      {id: '51', name: 'Film Studies'},
      {id: '52', name: 'Finance'},
      {id: '53', name: 'Fisheries and Wildlife'},
      {id: '54', name: 'Fitness'},
      {id: '55', name: 'Food Science'},
      {id: '56', name: 'Foreign Literature'},
      {id: '57', name: 'Forensic Science'},
      {id: '58', name: 'French'},
      {id: '59', name: 'Gender Studies'},
      {id: '60', name: 'Geography'},
      {id: '61', name: 'Geology'},
      {id: '62', name: 'German'},
      {id: '63', name: 'Government'},
      {id: '64', name: 'Greek'},
      {id: '65', name: 'Health Care'},
      {id: '66', name: 'History'},
      {id: '67', name: 'Horticulture'},
      {id: '68', name: 'Hospitality'},
      {id: '69', name: 'Human Rights'},
      {id: '70', name: 'Industrial Engineering'},
      {id: '71', name: 'Information Science'},
      {id: '72', name: 'Information Systems'},
      {id: '73', name: 'Interdisciplinary Studies'},
      {id: '74', name: 'International Relations'},
      {id: '75', name: 'Jewish Studies'},
      {id: '76', name: 'Journalism'},
      {id: '77', name: 'Landscape Architecture'},
      {id: '78', name: 'Latin'},
      {id: '79', name: 'Latin American Studies'},
      {id: '80', name: 'Law'},
      {id: '81', name: 'Law Enforcement'},
      {id: '82', name: 'Library Science'},
      {id: '83', name: 'Linguistics'},
      {id: '84', name: 'Literature'},
      {id: '85', name: 'Management'},
      {id: '86', name: 'Manufacturing'},
      {id: '87', name: 'Marine Biology'},
      {id: '88', name: 'Marine Sciences'},
      {id: '89', name: 'Maritime Studies'},
      {id: '90', name: 'Marketing'},
      {id: '91', name: 'Metallurgy'},
      {id: '92', name: 'Materials Science'},
      {id: '93', name: 'Mathematics'},
      {id: '94', name: 'Mechanical Engineering'},
      {id: '95', name: 'Media Studies'},
      {id: '96', name: 'Medical Technology'},
      {id: '97', name: 'Medicine'},
      {id: '98', name: 'Middle Eastern Studies'},
      {id: '99', name: 'Military Science'},
      {id: '100', name: 'Mining'},
      {id: '101', name: 'Molecular Biology'},
      {id: '102', name: 'Music'},
      {id: '103', name: 'Native American Studies'},
      {id: '104', name: 'Natural Resources'},
      {id: '105', name: 'Nursing'},
      {id: '106', name: 'Nursing'},
      {id: '107', name: 'Nutritional Sciences'},
      {id: '108', name: 'Operations Management'},
      {id: '109', name: 'Performing Arts'},
      {id: '110', name: 'Petroleum Engineering'},
      {id: '111', name: 'Pharmacy'},
      {id: '112', name: 'Philosophy'},
      {id: '113', name: 'Physics'},
      {id: '114', name: 'Physiology'},
      {id: '115', name: 'Planning'},
      {id: '116', name: 'Political Science'},
      {id: '117', name: 'Psychology'},
      {id: '118', name: 'Public Administration'},
      {id: '119', name: 'Public Policy'},
      {id: '120', name: 'Religion'},
      {id: '121', name: 'Robotics'},
      {id: '122', name: 'Russian Studies'},
      {id: '123', name: 'Secondary Education'},
      {id: '124', name: 'Social Services'},
      {id: '125', name: 'Social Work'},
      {id: '126', name: 'Sociology'},
      {id: '127', name: 'Spanish'},
      {id: '128', name: 'Special Education'},
      {id: '129', name: 'Speech Therapy'},
      {id: '130', name: 'Statistics'},
      {id: '131', name: 'Studio Art'},
      {id: '132', name: 'Textiles'},
      {id: '133', name: 'Theatre Studies'},
      {id: '134', name: 'Theology'},
      {id: '135', name: 'Transportation'},
      {id: '136', name: 'Urban Plannning'},
      {id: '137', name: 'Veterinary Science'},
      {id: '138', name: 'Visual Arts'},
      {id: '139', name: 'Water Science'},
      {id: '140', name: 'Womens and Gender Studies'}
    ];

    this.SportsMenList = [
      {id: '1', name: 'acrobatics/gymnastics'},
      {id: '2', name: 'action combat'},
      {id: '3', name: 'adapdons'},
      {id: '4', name: 'adaptive sports'},
      {id: '5', name: 'adventure club'},
      {id: '6', name: 'adventure race team'},
      {id: '7', name: 'adventure racing'},
      {id: '8', name: 'aikido'},
      {id: '9', name: 'aikido shin ryu'},
      {id: '10', name: 'air hockey'},
      {id: '11', name: 'air riflery'},
      {id: '12', name: 'airsoft'},
      {id: '13', name: 'alpine racing'},
      {id: '14', name: 'alpine skiing'},
      {id: '15', name: 'american tang soo do'},
      {id: '16', name: 'archery'},
      {id: '17', name: 'art of hip hop'},
      {id: '18', name: 'auto racing'},
      {id: '19', name: 'baby biathlon'},
      {id: '20', name: 'backpacking'},
      {id: '21', name: 'Badminton'},
      {id: '22', name: 'baile'},
      {id: '23', name: 'baja racing'},
      {id: '24', name: 'ball hockey'},
      {id: '25', name: 'ballroom and Latin dance'},
      {id: '26', name: 'ballroom dance'},
      {id: '27', name: 'ballroom dancing'},
      {id: '28', name: 'barbell'},
      {id: '29', name: 'baseball'},
      {id: '30', name: 'basketball'},
      {id: '31', name: 'bass anglers'},
      {id: '32', name: 'bass club'},
      {id: '33', name: 'bass fishing'},
      {id: '34', name: 'bass team'},
      {id: '35', name: 'battleship'},
      {id: '36', name: 'beach volleyball'},
      {id: '37', name: 'benchball'},
      {id: '38', name: 'bicycling'},
      {id: '39', name: 'bike racing'},
      {id: '40', name: 'billiards'},
      {id: '41', name: 'billiards bowling'},
      {id: '42', name: 'boarder ski cross'},
      {id: '43', name: 'body building'},
      {id: '44', name: 'bowling'},
      {id: '45', name: 'boxing'},
      {id: '46', name: 'brazilian Jiu Jitsu'},
      {id: '47', name: 'breakdancing'},
      {id: '48', name: 'breakers'},
      {id: '49', name: 'broomball'},
      {id: '50', name: 'budokai karate'},
      {id: '51', name: 'canoe'},
      {id: '52', name: 'canoeing'},
      {id: '53', name: 'capoeira'},
      {id: '54', name: 'capture the flag'},
      {id: '55', name: 'car racing'},
      {id: '56', name: 'caving'},
      {id: '57', name: 'cheerleading'},
      {id: '58', name: 'chess'},
      {id: '59', name: 'clay target shooting'},
      {id: '60', name: 'cliffhangers'},
      {id: '61', name: 'climbing'},
      {id: '62', name: 'clogging'},
      {id: '63', name: 'club hockey'},
      {id: '64', name: 'color guard'},
      {id: '65', name: 'combat society'},
      {id: '66', name: 'competition shooting'},
      {id: '67', name: 'competitive cheerleading'},
      {id: '68', name: 'competitive dance team'},
      {id: '69', name: 'competitive fitness'},
      {id: '70', name: 'cosmic dodgeball'},
      {id: '71', name: 'crew'},
      {id: '72', name: 'cricket'},
      {id: '73', name: 'croquet'},
      {id: '74', name: 'cross country'},
      {id: '75', name: 'CrossFit'},
      {id: '76', name: 'CSGO'},
      {id: '77', name: 'Cuong Nhu'},
      {id: '78', name: 'curling'},
      {id: '79', name: 'cycling'},
      {id: '80', name: 'cyclocross'},
      {id: '81', name: 'dance'},
      {id: '82', name: 'dancesport'},
      {id: '83', name: 'dancing'},
      {id: '84', name: 'darts'},
      {id: '85', name: 'decathlon'},
      {id: '86', name: 'disc'},
      {id: '87', name: 'disc golf'},
      {id: '88', name: 'diving'},
      {id: '89', name: 'dodgeball'},
      {id: '90', name: 'draft horse driving'},
      {id: '91', name: 'dragon boat'},
      {id: '92', name: 'dressage'},
      {id: '93', name: 'drill team'},
      {id: '94', name: 'elite dance'},
      {id: '95', name: 'endurance racing team'},
      {id: '96', name: 'equestrian'},
      {id: '97', name: 'fast pitch'},
      {id: '98', name: 'fast pitch softball'},
      {id: '99', name: 'fencing'},
      {id: '100', name: 'field hockey'},
      {id: '101', name: 'figure skating'},
      {id: '102', name: 'fishing'},
      {id: '103', name: 'fit'},
      {id: '104', name: 'fitness'},
      {id: '105', name: 'flag football'},
      {id: '106', name: 'floor hockey'},
      {id: '107', name: 'flow Latino dance club'},
      {id: '108', name: 'fly fishing'},
      {id: '109', name: 'football'},
      {id: '110', name: 'formula hybrid racing'},
      {id: '111', name: 'freeskiing'},
      {id: '112', name: 'freestyle skiing'},
      {id: '113', name: 'Frisbee'},
      {id: '114', name: 'Frisbee golf'},
      {id: '115', name: 'futbol'},
      {id: '116', name: 'futsal'},
      {id: '117', name: 'gaming'},
      {id: '118', name: 'golf'},
      {id: '119', name: 'grappling'},
      {id: '120', name: 'gymnastics'},
      {id: '121', name: 'handball'},
      {id: '122', name: 'hapkido'},
      {id: '123', name: 'health/fitness'},
      {id: '124', name: 'hiking'},
      {id: '125', name: 'hip hop'},
      {id: '126', name: 'hip hop dance'},
      {id: '127', name: 'hip-hop coalition'},
      {id: '128', name: 'hockey'},
      {id: '129', name: 'hockey (roller and ice)'},
      {id: '130', name: 'homerun derby'},
      {id: '131', name: 'horse polo'},
      {id: '132', name: 'horse show association team'},
      {id: '133', name: 'horseback riding'},
      {id: '134', name: 'hunting'},
      {id: '135', name: 'hurling'},
      {id: '136', name: 'Ice Hockey'},
      {id: '137', name: 'ice lacrosse'},
      {id: '138', name: 'ice skating'},
      {id: '139', name: 'indoor soccer'},
      {id: '140', name: 'indoor track'},
      {id: '141', name: 'indoor volleyball'},
      {id: '142', name: 'indoor winter guard'},
      {id: '143', name: 'in-line hockey'},
      {id: '144', name: 'in-line skating'},
      {id: '145', name: 'inner-tube water polo'},
      {id: '146', name: 'integrated martial arts'},
      {id: '147', name: 'japanese sword arts'},
      {id: '148', name: 'jiu jitsu'},
      {id: '149', name: 'judo'},
      {id: '150', name: 'juggling'},
      {id: '151', name: 'karate'},
      {id: '152', name: 'karate-shotokan'},
      {id: '153', name: 'kayak'},
      {id: '154', name: 'kayak fishing'},
      {id: '155', name: 'kayaking'},
      {id: '156', name: 'kempo karate'},
      {id: '157', name: 'kendo'},
      {id: '158', name: 'kendo karate'},
      {id: '159', name: 'kenpo'},
      {id: '160', name: 'ki racing'},
      {id: '161', name: 'kickball'},
      {id: '162', name: 'kickboxing'},
      {id: '163', name: 'kiteboarding'},
      {id: '164', name: 'Korean karate'},
      {id: '165', name: 'Kronum'},
      {id: '166', name: 'kuk sool won'},
      {id: '167', name: 'kumbo'},
      {id: '168', name: 'kung fu'},
      {id: '169', name: 'kung fu kendo'},
      {id: '170', name: 'kung fu/tai chi'},
      {id: '171', name: 'lacrosse'},
      {id: '172', name: 'laser tag'},
      {id: '173', name: 'lightweight football'},
      {id: '174', name: 'log rolling'},
      {id: '175', name: 'logging sports'},
      {id: '176', name: 'long board'},
      {id: '177', name: 'longboarding'},
      {id: '178', name: 'majorettes'},
      {id: '179', name: 'marathon'},
      {id: '180', name: 'marksmanship'},
      {id: '181', name: 'martial arts'},
      {id: '182', name: 'meditation'},
      {id: '183', name: 'mixed martial arts'},
      {id: '184', name: 'MMA fight club'},
      {id: '185', name: 'modern extension'},
      {id: '186', name: 'mountain biking'},
      {id: '187', name: 'mountain sports club'},
      {id: '188', name: 'mountaineering'},
      {id: '189', name: 'muai thai'},
      {id: '190', name: 'nerf'},
      {id: '191', name: 'ninjutsu'},
      {id: '192', name: 'non-tackle football'},
      {id: '193', name: 'Nordic skiing'},
      {id: '194', name: 'orienteering'},
      {id: '195', name: 'outdoor'},
      {id: '196', name: 'outdoor adventure'},
      {id: '197', name: 'outdoor adventure club'},
      {id: '198', name: 'outdoor adventures'},
      {id: '199', name: 'outdoor club'},
      {id: '200', name: 'outdoor hiking'},
      {id: '201', name: 'outdoor recreation'},
      {id: '202', name: 'outdoor soccer'},
      {id: '203', name: 'outdoors'},
      {id: '204', name: 'outing'},
      {id: '205', name: 'paintball'},
      {id: '206', name: 'paintball team'},
      {id: '207', name: 'parachuting'},
      {id: '208', name: 'parkour/free-running'},
      {id: '209', name: 'Pilates'},
      {id: '210', name: 'pistol'},
      {id: '211', name: 'polo'},
      {id: '212', name: 'pom squad'},
      {id: '213', name: 'poms'},
      {id: '214', name: 'powerlifting'},
      {id: '215', name: 'quantum jujitsu'},
      {id: '216', name: 'Quidditch'},
      {id: '217', name: 'racquetball'},
      {id: '218', name: 'ranger challenge'},
      {id: '219', name: 'recreational volleyball'},
      {id: '220', name: 'riding'},
      {id: '221', name: 'rifle'},
      {id: '222', name: 'rifle/pistol'},
      {id: '223', name: 'riflery'},
      {id: '224', name: 'ringette'},
      {id: '225', name: 'ritmo dembow'},
      {id: '226', name: 'road racing'},
      {id: '227', name: 'road running'},
      {id: '228', name: 'rock climbing'},
      {id: '229', name: 'rock wall climbing'},
      {id: '230', name: 'rodeo'},
      {id: '231', name: 'roller derby'},
      {id: '232', name: 'roller hockey'},
      {id: '233', name: 'roller skating'},
      {id: '234', name: 'roller sports'},
      {id: '235', name: 'rollerblading'},
      {id: '236', name: 'rowing'},
      {id: '237', name: 'rugby'},
      {id: '238', name: 'rugby sevens'},
      {id: '239', name: 'runners'},
      {id: '240', name: 'running'},
      {id: '241', name: 'running/jogging'},
      {id: '242', name: 'sailing'},
      {id: '243', name: 'salsa dancing'},
      {id: '244', name: 'saluki bassers'},
      {id: '245', name: 'scuba'},
      {id: '246', name: 'seido karate'},
      {id: '247', name: 'self defense'},
      {id: '248', name: 'shinkendo'},
      {id: '249', name: 'shokotan karate'},
      {id: '250', name: 'shooting'},
      {id: '251', name: 'shooting sports'},
      {id: '252', name: 'shotgun'},
      {id: '253', name: 'shotgun sports'},
      {id: '254', name: 'shotokan'},
      {id: '255', name: 'shotokan karate'},
      {id: '256', name: 'Shotokan karate'},
      {id: '257', name: 'skateboarding'},
      {id: '258', name: 'skating'},
      {id: '259', name: 'skeet shooting'},
      {id: '260', name: 'ski racing'},
      {id: '261', name: 'skiing'},
      {id: '262', name: 'skim'},
      {id: '263', name: 'skin diving'},
      {id: '264', name: 'sky diving'},
      {id: '265', name: 'skydiving'},
      {id: '266', name: 'slacklining'},
      {id: '267', name: 'snowboard'},
      {id: '268', name: 'snowboarding'},
      {id: '269', name: 'soccer'},
      {id: '270', name: 'soccer ultimate Frisbee'},
      {id: '271', name: 'social dance'},
      {id: '272', name: 'softball'},
      {id: '273', name: 'special Olympics'},
      {id: '274', name: 'speedball'},
      {id: '275', name: 'spikeball'},
      {id: '276', name: 'spirit club'},
      {id: '277', name: 'sportsmen'},
      {id: '278', name: 'squash'},
      {id: '279', name: 'step dance'},
      {id: '280', name: 'step team'},
      {id: '281', name: 'street hockey'},
      {id: '282', name: 'strength competition'},
      {id: '283', name: 'stunt team'},
      {id: '284', name: 'surf'},
      {id: '285', name: 'surfing'},
      {id: '286', name: 'swim'},
      {id: '287', name: 'swimming'},
      {id: '288', name: 'swing dance'},
      {id: '289', name: 'swing dancing'},
      {id: '290', name: 'swing society'},
      {id: '291', name: 'sword'},
      {id: '292', name: 'sword fighting'},
      {id: '293', name: 'synchronized skating'},
      {id: '294', name: 'synchronized swimming'},
      {id: '295', name: 'table tennis'},
      {id: '296', name: 'tackle football'},
      {id: '297', name: 'tae kwon do'},
      {id: '298', name: 'Tai chi'},
      {id: '299', name: 'tang soo do'},
      {id: '300', name: 'tango'},
      {id: '301', name: 'team handball'},
      {id: '302', name: 'tennis'},
      {id: '303', name: 'three sport challenge'},
      {id: '304', name: 'track'},
      {id: '305', name: 'trap and skeet'},
      {id: '306', name: 'trap shooting'},
      {id: '307', name: 'trap/skeet'},
      {id: '308', name: 'trapshooting'},
      {id: '309', name: 'trap-shooting'},
      {id: '310', name: 'triathlon'},
      {id: '311', name: 'tumble'},
      {id: '312', name: 'tumbling'},
      {id: '313', name: 'Uechi-ryu karate'},
      {id: '314', name: 'ultimate'},
      {id: '315', name: 'ultimate disc'},
      {id: '316', name: 'ultimate Frisbee'},
      {id: '317', name: 'ultimate Frisbee volleyball'},
      {id: '318', name: 'um do'},
      {id: '319', name: 'underwater hockey'},
      {id: '320', name: 'unicycling'},
      {id: '321', name: 'unified sports'},
      {id: '322', name: 'urban beats crew (hip hop dance)'},
      {id: '323', name: 'urban choreogrpahy'},
      {id: '324', name: 'ving tsun martial arts'},
      {id: '325', name: 'volleyball'},
      {id: '326', name: 'wake boarding'},
      {id: '327', name: 'wakeboarding'},
      {id: '328', name: 'walleyball'},
      {id: '329', name: 'wallyball'},
      {id: '330', name: 'washin-ryu karate'},
      {id: '331', name: 'water polo'},
      {id: '332', name: 'water skiing'},
      {id: '333', name: 'waterpolo badminton'},
      {id: '334', name: 'waterskiing'},
      {id: '335', name: 'weighlifting'},
      {id: '336', name: 'weight training'},
      {id: '337', name: 'wheelchair basketball'},
      {id: '338', name: 'wheelchair tennis'},
      {id: '339', name: 'white water rafting'},
      {id: '340', name: 'whitewater rafting'},
      {id: '341', name: 'Wiffle ball'},
      {id: '342', name: 'windsurfing'},
      {id: '343', name: 'woodsmen'},
      {id: '344', name: 'woodsmen\'s sports'},
      {id: '345', name: 'wrestling'},
      {id: '346', name: 'Wushu'},
      {id: '347', name: 'yoga'},
      {id: '348', name: 'youn who ryu'},
      {id: '349', name: 'zumba'}
     ];

    this.SportsWomenList = [
      {id: '1', name: 'acquatic racing'},
      {id: '2', name: 'acrobatics/gymnastics'},
      {id: '3', name: 'acrobatics/tumbling'},
      {id: '4', name: 'action combat'},
      {id: '5', name: 'adapodons'},
      {id: '6', name: 'adaptive sports'},
      {id: '7', name: 'adventure club'},
      {id: '8', name: 'adventure race team'},
      {id: '9', name: 'adventure racing'},
      {id: '10', name: 'aikido'},
      {id: '11', name: 'aikido shin ryu'},
      {id: '12', name: 'air hockey'},
      {id: '13', name: 'air rifle'},
      {id: '14', name: 'air riflery'},
      {id: '15', name: 'airsoft'},
      {id: '16', name: 'Alpine racing'},
      {id: '17', name: 'Alpine skiing'},
      {id: '18', name: 'alpine skiing'},
      {id: '19', name: 'American tang soo do'},
      {id: '20', name: 'archery'},
      {id: '21', name: 'art of hip hop'},
      {id: '22', name: 'Aussie Rules football'},
      {id: '23', name: 'auto racing'},
      {id: '24', name: 'baby biathlon'},
      {id: '25', name: 'backpacking'},
      {id: '26', name: 'Badminton'},
      {id: '27', name: 'baile'},
      {id: '28', name: 'ballet'},
      {id: '29', name: 'ballroom and Latin dance'},
      {id: '30', name: 'ballroom dance'},
      {id: '31', name: 'ballroom dancing'},
      {id: '32', name: 'barbell'},
      {id: '33', name: 'baseball'},
      {id: '34', name: 'basketball'},
      {id: '35', name: 'bass club'},
      {id: '36', name: 'bass fishing'},
      {id: '37', name: 'bass team'},
      {id: '38', name: 'battleship'},
      {id: '39', name: 'beach volleyball'},
      {id: '40', name: 'belly dance'},
      {id: '41', name: 'belly dancing'},
      {id: '42', name: 'benchball'},
      {id: '43', name: 'bicycle'},
      {id: '44', name: 'bike racing'},
      {id: '45', name: 'billiards'},
      {id: '46', name: 'billiards bowling'},
      {id: '47', name: 'boarder ski cross'},
      {id: '48', name: 'body building'},
      {id: '49', name: 'bowling'},
      {id: '50', name: 'boxing'},
      {id: '51', name: 'Brazilian Jiu Jitsu'},
      {id: '52', name: 'break dance'},
      {id: '53', name: 'breakers'},
      {id: '54', name: 'broomball'},
      {id: '55', name: 'Budokai karate'},
      {id: '56', name: 'canoeing'},
      {id: '57', name: 'capoeira'},
      {id: '58', name: 'capture the flag'},
      {id: '59', name: 'car racing'},
      {id: '60', name: 'caving'},
      {id: '61', name: 'cheerleading'},
      {id: '62', name: 'chess'},
      {id: '63', name: 'Chinese wu shu'},
      {id: '64', name: 'choi kwang do'},
      {id: '65', name: 'clay target'},
      {id: '66', name: 'clay target shooting'},
      {id: '67', name: 'cliffhangers'},
      {id: '68', name: 'climbing'},
      {id: '69', name: 'clogging'},
      {id: '70', name: 'club'},
      {id: '71', name: 'color guard'},
      {id: '72', name: 'combat society'},
      {id: '73', name: 'competition cheer'},
      {id: '74', name: 'competition dancing'},
      {id: '75', name: 'competition shooting'},
      {id: '76', name: 'competitive cheerleading'},
      {id: '77', name: 'competitive dance'},
      {id: '78', name: 'competitive dance team'},
      {id: '79', name: 'competitive fitness'},
      {id: '80', name: 'cosmic dodgeball'},
      {id: '81', name: 'crew'},
      {id: '82', name: 'croquet'},
      {id: '83', name: 'cross country'},
      {id: '84', name: 'CrossFit'},
      {id: '85', name: 'CSGO'},
      {id: '86', name: 'Cuong Nhu'},
      {id: '87', name: 'cuong nuh hapkido'},
      {id: '88', name: 'curling'},
      {id: '89', name: 'cycling'},
      {id: '90', name: 'cyclocross'},
      {id: '91', name: 'dance'},
      {id: '92', name: 'dance ensemble'},
      {id: '93', name: 'dance pak'},
      {id: '94', name: 'dance team'},
      {id: '95', name: 'dance troupe'},
      {id: '96', name: 'dance/drill team'},
      {id: '97', name: 'dancesport'},
      {id: '98', name: 'dancing'},
      {id: '99', name: 'darts'},
      {id: '100', name: 'disc'},
      {id: '101', name: 'disc golf'},
      {id: '102', name: 'diving'},
      {id: '103', name: 'dodgeball'},
      {id: '104', name: 'draft horse driving'},
      {id: '105', name: 'dragon boat'},
      {id: '106', name: 'dressage'},
      {id: '107', name: 'drill'},
      {id: '108', name: 'elite dance'},
      {id: '109', name: 'endurance'},
      {id: '110', name: 'endurance racing team'},
      {id: '111', name: 'equestrian'},
      {id: '112', name: 'equestrian sports'},
      {id: '113', name: 'equine polo'},
      {id: '114', name: 'fastball'},
      {id: '115', name: 'federation tennis'},
      {id: '116', name: 'fencing'},
      {id: '117', name: 'field hockey'},
      {id: '118', name: 'figure skating'},
      {id: '119', name: 'fishing'},
      {id: '120', name: 'fit'},
      {id: '121', name: 'fitness'},
      {id: '122', name: 'flag football'},
      {id: '123', name: 'floor hockey'},
      {id: '124', name: 'floorball'},
      {id: '125', name: 'flow Latino dance club'},
      {id: '126', name: 'fly fishing'},
      {id: '127', name: 'football'},
      {id: '128', name: 'freeskiing'},
      {id: '129', name: 'freestyle skiing'},
      {id: '130', name: 'Frisbee'},
      {id: '131', name: 'Frisbee golf'},
      {id: '132', name: 'frontiers/quest'},
      {id: '133', name: 'futsal'},
      {id: '134', name: 'gamers'},
      {id: '135', name: 'gaming'},
      {id: '136', name: 'golf'},
      {id: '137', name: 'grappling'},
      {id: '138', name: 'gymnastics'},
      {id: '139', name: 'handball'},
      {id: '140', name: 'hapkido'},
      {id: '141', name: 'health/fitness'},
      {id: '142', name: 'hepathlon'},
      {id: '143', name: 'hiking'},
      {id: '144', name: 'hip hop'},
      {id: '145', name: 'hip hop dance'},
      {id: '146', name: 'hip-hop coalition'},
      {id: '147', name: 'hockey'},
      {id: '148', name: 'homerun derby'},
      {id: '149', name: 'horse polo'},
      {id: '150', name: 'horse show association team'},
      {id: '151', name: 'horseback riding'},
      {id: '152', name: 'hunting'},
      {id: '153', name: 'hurling'},
      {id: '154', name: 'hwa rang do'},
      {id: '155', name: 'ice dancing'},
      {id: '156', name: 'ice hockey'},
      {id: '157', name: 'ice skating'},
      {id: '158', name: 'indoor soccer'},
      {id: '159', name: 'indoor track'},
      {id: '160', name: 'indoor volleyball'},
      {id: '161', name: 'indoor winter guard'},
      {id: '162', name: 'in-line hockey'},
      {id: '163', name: 'in-line skating'},
      {id: '164', name: 'inner-tube water polo'},
      {id: '165', name: 'integrated martial arts'},
      {id: '166', name: 'intercollegiate bowling'},
      {id: '167', name: 'jka shotokan'},
      {id: '168', name: 'judo'},
      {id: '169', name: 'juggling'},
      {id: '170', name: 'karate'},
      {id: '171', name: 'karate-shotokan'},
      {id: '172', name: 'kayak'},
      {id: '173', name: 'kayak fishing'},
      {id: '174', name: 'kayaking'},
      {id: '175', name: 'kempo karate'},
      {id: '176', name: 'kendo'},
      {id: '177', name: 'kendo club'},
      {id: '178', name: 'kendo karate'},
      {id: '179', name: 'kenpo'},
      {id: '180', name: 'kickball'},
      {id: '181', name: 'kickboxing'},
      {id: '182', name: 'kickline'},
      {id: '183', name: 'kiteboarding'},
      {id: '184', name: 'Korean karate'},
      {id: '185', name: 'Kronum'},
      {id: '186', name: 'kuk sool won'},
      {id: '187', name: 'kumbo'},
      {id: '188', name: 'kung fu'},
      {id: '189', name: 'kung fu kendo'},
      {id: '190', name: 'kung fu/tai chi'},
      {id: '191', name: 'Lacrosse'},
      {id: '192', name: 'ladies in fitness training'},
      {id: '193', name: 'laser tag'},
      {id: '194', name: 'lightweight crew'},
      {id: '195', name: 'lightweight football'},
      {id: '196', name: 'log rolling'},
      {id: '197', name: 'logging sports'},
      {id: '198', name: 'longboarding'},
      {id: '199', name: 'majorettes'},
      {id: '200', name: 'many sports available'},
      {id: '201', name: 'marathon'},
      {id: '202', name: 'marksmanship'},
      {id: '203', name: 'martial arts'},
      {id: '204', name: 'mascots'},
      {id: '205', name: 'meditation'},
      {id: '206', name: 'mixed martial arts'},
      {id: '207', name: 'modern extension'},
      {id: '208', name: 'mountain biking'},
      {id: '209', name: 'mountain sports'},
      {id: '210', name: 'mountaineering'},
      {id: '211', name: 'muai thai'},
      {id: '212', name: 'multisport club'},
      {id: '213', name: 'nerf'},
      {id: '214', name: 'ninjutsu'},
      {id: '215', name: 'non-tackle football'},
      {id: '216', name: 'Nordic skiing'},
      {id: '217', name: 'orienteering'},
      {id: '218', name: 'outdoor'},
      {id: '219', name: 'outdoor adventure'},
      {id: '220', name: 'outdoor adventure club'},
      {id: '221', name: 'outdoor adventures'},
      {id: '222', name: 'outdoor club'},
      {id: '223', name: 'outdoor hiking'},
      {id: '224', name: 'outdoor recreation'},
      {id: '225', name: 'outdoor soccer'},
      {id: '226', name: 'outdoors'},
      {id: '227', name: 'outing'},
      {id: '228', name: 'outing club'},
      {id: '229', name: 'paintball'},
      {id: '230', name: 'paintball team'},
      {id: '231', name: 'parachuting'},
      {id: '232', name: 'parkour/free-running'},
      {id: '233', name: 'pep band'},
      {id: '234', name: 'Pilates'},
      {id: '235', name: 'pistol'},
      {id: '236', name: 'pistol/rifle'},
      {id: '237', name: 'pitch'},
      {id: '238', name: 'polo'},
      {id: '239', name: 'pom'},
      {id: '240', name: 'pom squad'},
      {id: '241', name: 'poms'},
      {id: '242', name: 'power soccer'},
      {id: '243', name: 'powerlifting'},
      {id: '244', name: 'quantum jujitsu'},
      {id: '245', name: 'Quidditch'},
      {id: '246', name: 'racquetball'},
      {id: '247', name: 'ranger challenge'},
      {id: '248', name: 'resistance training'},
      {id: '249', name: 'riding'},
      {id: '250', name: 'rifle'},
      {id: '251', name: 'rifle/pistol'},
      {id: '252', name: 'riflery'},
      {id: '253', name: 'ringette'},
      {id: '254', name: 'ritmo dembow'},
      {id: '255', name: 'road racing'},
      {id: '256', name: 'road runners'},
      {id: '257', name: 'road running'},
      {id: '258', name: 'rock climbing'},
      {id: '259', name: 'rock climbing team'},
      {id: '260', name: 'rock wall climbing'},
      {id: '261', name: 'rodeo'},
      {id: '262', name: 'roller derby'},
      {id: '263', name: 'roller hockey'},
      {id: '264', name: 'roller skating'},
      {id: '265', name: 'roller sports'},
      {id: '266', name: 'rollerblading'},
      {id: '267', name: 'rowing'},
      {id: '268', name: 'Rugby'},
      {id: '269', name: 'runners'},
      {id: '270', name: 'running'},
      {id: '271', name: 'running/fitness'},
      {id: '272', name: 'running/jogging'},
      {id: '273', name: 'sailing'},
      {id: '274', name: 'saluki bassers'},
      {id: '275', name: 'scuba diving'},
      {id: '276', name: 'seido karate'},
      {id: '277', name: 'self defense'},
      {id: '278', name: 'shinkendo'},
      {id: '279', name: 'shooting'},
      {id: '280', name: 'shooting sports'},
      {id: '281', name: 'shorinji'},
      {id: '282', name: 'shotgun'},
      {id: '283', name: 'shotgun sports'},
      {id: '284', name: 'shotokan'},
      {id: '285', name: 'Shotokan karate'},
      {id: '286', name: 'skateboarding'},
      {id: '287', name: 'skating'},
      {id: '288', name: 'skeet shooting'},
      {id: '289', name: 'ski racing'},
      {id: '290', name: 'skiing'},
      {id: '291', name: 'skim'},
      {id: '292', name: 'skin diving'},
      {id: '293', name: 'sky diving'},
      {id: '294', name: 'skydiving'},
      {id: '295', name: 'slacklining'},
      {id: '296', name: 'snow sports'},
      {id: '297', name: 'snowboard'},
      {id: '298', name: 'snowboarding'},
      {id: '299', name: 'soccer'},
      {id: '300', name: 'soccer (indoor/outdoor)'},
      {id: '301', name: 'softball'},
      {id: '302', name: 'special Olympics'},
      {id: '303', name: 'speedball'},
      {id: '304', name: 'spike ball'},
      {id: '305', name: 'spikeball'},
      {id: '306', name: 'spirit club'},
      {id: '307', name: 'sport shooting'},
      {id: '308', name: 'sport tae kwon do'},
      {id: '309', name: 'sports'},
      {id: '310', name: 'squash'},
      {id: '311', name: 'step dance'},
      {id: '312', name: 'step team'},
      {id: '313', name: 'steppin\' in unity'},
      {id: '314', name: 'street hockey'},
      {id: '315', name: 'strength competition'},
      {id: '316', name: 'stunt team'},
      {id: '317', name: 'surf'},
      {id: '318', name: 'swim'},
      {id: '319', name: 'swing dance'},
      {id: '320', name: 'swing dancing'},
      {id: '321', name: 'swing society'},
      {id: '322', name: 'sword'},
      {id: '323', name: 'sword fighting'},
      {id: '324', name: 'synchronized ice skating'},
      {id: '325', name: 'synchronized skating'},
      {id: '326', name: 'synchronized swimming'},
      {id: '327', name: 'table tennis'},
      {id: '328', name: 'tackle football'},
      {id: '329', name: 'tae kwon do'},
      {id: '330', name: 'tai chi'},
      {id: '331', name: 'tang soo do'},
      {id: '332', name: 'tango'},
      {id: '333', name: 'tap pak'},
      {id: '334', name: 'team handball'},
      {id: '335', name: 'tennis'},
      {id: '336', name: 'tennis  track and field'},
      {id: '337', name: 'three sport challenge'},
      {id: '338', name: 'track'},
      {id: '339', name: 'trap and skeet'},
      {id: '340', name: 'trap shooting'},
      {id: '341', name: 'trap/skeet'},
      {id: '342', name: 'trapshooting'},
      {id: '343', name: 'trap-shooting'},
      {id: '344', name: 'triathlon'},
      {id: '345', name: 'triathlon (indoor/outdoor)'},
      {id: '346', name: 'triathlon/road racing'},
      {id: '347', name: 'triatholon'},
      {id: '348', name: 'tumble'},
      {id: '349', name: 'tumbling'},
      {id: '350', name: 'Uechi-ryu karate'},
      {id: '351', name: 'ultimate'},
      {id: '352', name: 'ultimate disc'},
      {id: '353', name: 'ultimate frisbee'},
      {id: '354', name: 'Ultimate Frisbeelacrosse'},
      {id: '355', name: 'um do'},
      {id: '356', name: 'underwater hockey'},
      {id: '357', name: 'unicycling'},
      {id: '358', name: 'unified sports'},
      {id: '359', name: 'urban beats crew (hip hop dance)'},
      {id: '360', name: 'urban choreogrpahy'},
      {id: '361', name: 'ving tsun martial arts'},
      {id: '362', name: 'volleyball'},
      {id: '363', name: 'wakeboarding'},
      {id: '364', name: 'walking'},
      {id: '365', name: 'walleyball'},
      {id: '366', name: 'wallyball'},
      {id: '367', name: 'washin-ryu karate'},
      {id: '368', name: 'water polo'},
      {id: '369', name: 'water skiing'},
      {id: '370', name: 'waterskiing'},
      {id: '371', name: 'weight training'},
      {id: '372', name: 'weightlifting'},
      {id: '373', name: 'weightlifting/bodybuilding'},
      {id: '374', name: 'wheelchair tennis'},
      {id: '375', name: 'white water rafting'},
      {id: '376', name: 'whitewater rafting'},
      {id: '377', name: 'Wiffle ball'},
      {id: '378', name: 'wilderness connection'},
      {id: '379', name: 'windsurfing'},
      {id: '380', name: 'winterguard'},
      {id: '381', name: 'women\'s fast pitch'},
      {id: '382', name: 'woodsmen'},
      {id: '383', name: 'woodsmen\'s sports'},
      {id: '384', name: 'wrestling'},
      {id: '385', name: 'Wushu'},
      {id: '386', name: 'yoga'},
      {id: '387', name: 'youn who ryu'},
      {id: '388', name: 'zumba'}
    ];

    this.searchTags = [
      {id: 1, type: 'YesNo', name: '4 Year', value: 'yes', column: 'inst_type_1', active: false},
      {id: 2, type: 'YesNo', name: '2 Year', value: 'yes', column: 'inst_type_2', active: false},
      {id: 3, type: 'Values', name: 'Is Public', value: '1', column: 'public_private', active: false},
      {id: 4, type: 'Values', name: 'Coeducation', value: 'yes', column: 'coed_info_3', active: false},
      {id: 5, type: 'YesNo', name: 'Religious Affiliation', value: '', column: 'religious', active: false},
      {id: 6, type: 'YesNo', name: 'GED Accepted', value: '', column: 'grad_high', active: false},
      {id: 7, type: 'Range', name: 'Student Population', value: '', column: 'total_under_3', active: false},
      {id: 8, type: 'StringArray', name: 'State', value: '', column: 'state', active: false},
      {id: 9, type: 'StringArray', name: 'Region', value: '', column: 'cads_vol', active: false},
      {id: 10, type: 'String', name: 'Search', value: '', column: 'arco_name', active: false},
      {id: 11, type: 'String', name: 'Major', value: '', column: 'major_o', active: false},
      {id: 12, type: 'Range', name: '', value: '', column: 'ave_second_gpa', active: false},
      {id: 13, type: 'Range', name: '', value: '', column: 'acceptance_rate', active: false},
      {id: 14, type: 'Range', name: '', value: '', column: 'rank_overall', active: false},
      {id: 15, type: 'Range', name: '', value: '', column: 'rank_art', active: false},
      {id: 16, type: 'Range', name: '', value: '', column: 'rank_business', active: false},
      {id: 17, type: 'Range', name: '', value: '', column: 'rank_medical', active: false},
      {id: 18, type: 'Range', name: '', value: '', column: 'rank_cs', active: false},
      {id: 19, type: 'Range', name: '', value: '', column: 'rank_engineer', active: false},
      {id: 20, type: 'Range', name: '', value: '', column: 'rank_life_science', active: false},
      {id: 21, type: 'Range', name: '', value: '', column: 'rank_physical_science', active: false},
      {id: 22, type: 'Range', name: '', value: '', column: 'rank_social_science', active: false},
      {id: 23, type: 'RangeDual', name: '', value: '', column: 'satreasoning_range_comb_1,satreasoning_range_comb_2', active: false},
      {id: 25, type: 'RangeDual', name: '', value: '', column: 'satreasoning_range_math_1,satreasoning_range_math_2', active: false},
      {id: 27, type: 'RangeDual', name: '', value: '', column: 'satreasoning_range_criticalreading_1,satreasoning_range_criticalreading_2', active: false},
      {id: 29, type: 'RangeDual', name: '', value: '', column: 'actrange_comp_1,actrange_comp_2', active: false},
      {id: 31, type: 'RangeDual', name: '', value: '', column: 'ctrange_math_1,actrange_math_2', active: false},
      {id: 33, type: 'RangeDual', name: '', value: '', column: 'actrange_engl_1,actrange_engl_2', active: false},
      {id: 35, type: 'Range', name: '', value: '', column: 'tuition_outstate', active: false},
      {id: 36, type: 'Range', name: '', value: '', column: 'tuition_instate', active: false},
      {id: 37, type: 'YesNo', name: 'Fee Waiver Available', value: '', column: 'applic_fee_waived', active: false},
      {id: 38, type: 'YesNo', name: 'Work-Study Programs', value: '', column: 'work_study', active: false},
      {id: 39, type: 'YesNo', name: 'Need Based Scholarship', value: '', column: 'nb_type_1', active: false},
      {id: 40, type: 'YesNo', name: 'Pell Grant Scholarship', value: '', column: 'nb_type_2', active: false},
      {id: 41, type: 'YesNo', name: 'SEOG  Scholarship', value: '', column: 'nb_type_3', active: false},
      {id: 42, type: 'YesNo', name: 'State Scholarship', value: '', column: 'nb_type_4', active: false},
      {id: 43, type: 'YesNo', name: 'College Scholarship', value: '', column: 'nb_type_5', active: false},
      {id: 44, type: 'YesNo', name: 'Private Scholarship', value: '', column: 'nb_type_6', active: false},
      {id: 45, type: 'YesNo', name: 'Nursing Scholarship', value: '', column: 'nb_type_7', active: false},
      {id: 46, type: 'YesNo', name: 'United Negro Scholarship', value: '', column: 'nb_type_8', active: false},
      {id: 47, type: 'YesNo', name: 'Other Scholarship', value: '', column: 'nb_type_9', active: false},
      {id: 48, type: 'YesNo', name: 'On-campus Housing', value: '', column: 'offers_housing', active: false},
      {id: 49, type: 'YesNo', name: 'COED Housing', value: '', column: 'housing_type_1', active: false},
      {id: 50, type: 'YesNo', name: 'Women Only Housing', value: '', column: 'housing_type_2', active: false},
      {id: 51, type: 'YesNo', name: 'Men Only Housing', value: '', column: 'housing_type_3', active: false},
      {id: 52, type: 'YesNo', name: 'Sorority Housing', value: '', column: 'housing_type_4', active: false},
      {id: 53, type: 'YesNo', name: 'Frat Housing', value: '', column: 'housing_type_5', active: false},
      {id: 54, type: 'YesNo', name: 'Single Student Appartment', value: '', column: 'housing_type_6', active: false},
      {id: 55, type: 'YesNo', name: 'Married Student Appartment', value: '', column: 'housing_type_7', active: false},
      {id: 56, type: 'YesNo', name: 'Disability Housing', value: '', column: 'housing_type_8', active: false},
      {id: 57, type: 'YesNo', name: 'International StudentHousing', value: '', column: 'housing_type_9', active: false},
      {id: 58, type: 'YesNo', name: 'Cooperative Housing', value: '', column: 'housing_type_10', active: false},
      {id: 59, type: 'YesNo', name: 'Other Housing', value: '', column: 'housing_type_11', active: false},
      {id: 60, type: 'YesNo', name: 'Handicapped Note Taking', value: '', column: 'handicapped_1', active: false},
      {id: 61, type: 'YesNo', name: 'Handicapped Tape Recorder', value: '', column: 'handicapped_2', active: false},
      {id: 62, type: 'YesNo', name: 'Handicapped Tutor', value: '', column: 'handicapped_3', active: false},
      {id: 63, type: 'YesNo', name: 'Handicapped Reader', value: '', column: 'handicapped_4', active: false},
      {id: 64, type: 'YesNo', name: 'Handicapped Interpreter', value: '', column: 'handicapped_5', active: false},
      {id: 65, type: 'YesNo', name: 'Handicapped Transport', value: '', column: 'handicapped_6', active: false},
      {id: 66, type: 'YesNo', name: 'Handicapped Housing', value: '', column: 'handicapped_7', active: false},
      {id: 67, type: 'YesNo', name: 'Handicapped Equipment', value: '', column: 'handicapped_8', active: false},
      {id: 68, type: 'YesNo', name: 'Handicapped Braille', value: '', column: 'handicapped_9', active: false},
      {id: 69, type: 'YesNo', name: 'Handicapped Talkbook', value: '', column: 'handicapped_10', active: false},
      {id: 70, type: 'YesNo', name: 'Handicapped Other', value: '', column: 'handicapped_11', active: false},
      {id: 71, type: 'YesNo', name: 'Other Handicapped', value: '', column: 'handicapped_12', active: false},
      {id: 72, type: 'StringArray', name: 'Sports for Men', value: '', column: 'club_men', active: false},
      {id: 73, type: 'StringArray', name: 'Sports for Women', value: '', column: 'club_women', active: false},
      {id: 74, type: 'YesNo', name: 'Student Government', value: '', column: 'activities_1', active: false},
      {id: 75, type: 'YesNo', name: 'Student Newspaper', value: '', column: 'activities_2', active: false},
      {id: 76, type: 'YesNo', name: 'Literary Magazine', value: '', column: 'activities_3', active: false},
      {id: 77, type: 'YesNo', name: 'Year Book', value: '', column: 'activities_4', active: false},
      {id: 78, type: 'YesNo', name: 'Radio Station', value: '', column: 'activities_5', active: false},
      {id: 79, type: 'YesNo', name: 'Television Station', value: '', column: 'activities_6', active: false},
      {id: 80, type: 'Values', name: 'Is Private', value: '2,3', column: 'public_private', active: false},
      {id: 81, type: 'Values', name: 'All Women', value: 'yes', column: 'coed_info_1', active: false},
      {id: 82, type: 'Values', name: 'All Men', value: 'yes', column: 'coed_info_2', active: false},
    ];

    this.onChangeRange(0, 0, 13, '');
    // var mapProp = {
    //   center: new google.maps.LatLng(25.781773, -80.201544),
    //   zoom: 5,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
  }

  onChangeRange(value, value2, id, desc) {
    const result = this.searchTags.filter(item => item.id === id)[0];
    if (value2 > 0 && value === 0) {
      result.value = '[0 TO ' + value2 + ']' ;
      result.name = desc + ': ' + value2;
      result.active = true;
    } else {
      if (value2 > 0 && value > 0) {
        result.value = '[' + value + ' TO ' + value2 + ']' ;
        result.name = desc + ': ' + value + ' - ' + value2;
        result.active = true;
      } else {
        result.active = false;
      }
    }
    this.search();
  }

  onChangeState(value) {
    const result = this.searchTags.filter(item => item.id === 8)[0];
    const array = [];
    const codes = [];
    for (let i of this.optionsModel) {
      const states = this.stateList.filter(item => item.id === i)[0];
      array.push(states.name);
      codes.push(states.id);
    }
    if (array.length > 0) {
      result.value = codes.toString();
      result.name = 'States: ' + array;
      result.active = true;
    } else {
      result.active = false;
    }
    this.search();
  }

  onChangeRegion(value) {
    const result = this.searchTags.filter(item => item.id === 9)[0];
    const array = [];
    const codes = [];
    for (let i of this.optionsModel2) {
      const regions = this.myOptions2.filter(item => item.id === i)[0];
      array.push(regions.name);
      codes.push(regions.id);
    }
    if (array.length > 0) {
      result.value = codes.toString();
      result.name = 'Regions: ' + array;
      result.active = true;
    } else {
      result.active = false;
    }
    this.search();
  }

  onChangeMajor(value) {
    const result = this.searchTags.filter(item => item.id === 11)[0];
    const array = [];
    const codes = [];
    for (let i of this.optionsModelMajor) {
      const major = this.MajorList.filter(item => item.id === i)[0];
      array.push(major.name);
      // codes.push(major.id);
    }
    if (array.length > 0) {
      result.value = array.toString();
      result.name = 'Major: ' + array;
      result.active = true;
    } else {
      result.active = false;
    }
    this.search();
  }
  onChangeSportsMen(value) {
    const result = this.searchTags.filter(item => item.id === 72)[0];
    const array = [];
    const codes = [];
    for (let i of this.optionsSportsMen) {
      const sportsm = this.SportsMenList.filter(item => item.id === i)[0];
      array.push(sportsm.name);
      // codes.push(major.id);
    }
    if (array.length > 0) {
      result.value = array.toString();
      result.name = 'Sports for Men: ' + array;
      result.active = true;
    } else {
      result.active = false;
    }
    this.search();
  }
  onChangeSportsWomen(value) {
    const result = this.searchTags.filter(item => item.id === 73)[0];
    const array = [];
    const codes = [];
    for (let i of this.optionsSportsWomen) {
      const sportse = this.SportsWomenList.filter(item => item.id === i)[0];
      array.push(sportse.name);
      // codes.push(major.id);
    }
    if (array.length > 0) {
      result.value = array.toString();
      result.name = 'Sports for Women: ' + array;
      result.active = true;
    } else {
      result.active = false;
    }
    this.search();
  }
  onChangeString(query, id, name) {
    this.collegeNameSearchId = id;
    const result = this.searchTags.filter(item => item.id === id)[0];
    if (query.length > 0) {
      result.value = query;
      result.name = name + ': ' + query;
      result.active = true;
    } else {
      result.active = false;
    }
    this.search();
  }

  setTag(val) {
    const result = this.searchTags.filter(item => item.id === val)[0];
    result.active = !result.active;

    if (val === 7) {
      this.studentsRangeValues = [0, 70000];
    }
    if (val === 8) {
      this.optionsModel = null;
    }
    if (val === 9) {
      this.optionsModel2 = null;
    }
    if (val === 11) {
      this.optionsModelMajor = null;
    }
    if (val === 12) {
      this.gpaRangeValues = [0, 400];
    }
    if (val === 13) {
      this.admisionRangeValues = [0, 100];
    }
    if (val === 14) {
      this.rankOverallRangeValues = [0, 800];
    }
    if (val === 15) {
      this.artRangeValues = [0, 100];
    }
    if (val === 16) {
      this.businessRangeValues = [0, 100];
    }
    if (val === 17) {
      this.medicalRangeValues = [0, 100];
    }
    if (val === 18) {
      this.computerRangeValues = [0, 100];
    }
    if (val === 19) {
      this.engineeringRangeValues = [0, 100];
    }
    if (val === 20) {
      this.lifeRangeValues = [0, 100];
    }
    if (val === 21) {
      this.physicalRangeValues = [0, 100];
    }
    if (val === 22) {
      this.socialRangeValues = [0, 100];
    }
    if (val === 23) {
      this.satCompositeRangeValues = [400, 1600];
    }
    if (val === 25) {
      this.satMathRangeValues = [200, 800];
    }
    if (val === 27) {
      this.satEnglishRangeValues = [200, 800];
    }
    if (val === 29) {
      this.actCompositeRangeValues = [1, 36];
    }
    if (val === 31) {
      this.actMathRangeValues = [1, 36];
    }
    if (val === 33) {
      this.actEnglishRangeValues = [1, 36];
    }
    if (val === 35) {
      this.outStateRangeValues = [0, 100000];
    }
    if (val === 36) {
      this.inStateRangeValues = [0, 80000];
    }
    if (val === 72) {
      this.optionsSportsMen = null;
    }
    if (val === 73) {
      this.optionsSportsWomen = null;
    }
    this.search();
  }
  setTagRadio(val) {
    const result = this.searchTags.filter(item => item.id === val)[0];
    result.active = !result.active;

    if (val === 3) {
      this.searchCollegeType = 1;
      const result01 = this.searchTags.filter(item => item.id === 80)[0];
      if (result01.active === true) {
        result01.active = !result01.active;
      }
    }

    if (val === 80) {
      this.searchCollegeType = 0;
      const result02 = this.searchTags.filter(item => item.id === 3)[0];
      if (result02.active === true) {
        result02.active = !result02.active;
      }
    }
    this.search();
  }

  getState(val) {
    
    const result = this.searchTags.filter(item => item.id === val)[0];
    return result.active;
  }

  search() {
    const parameters: Array<FilterParameter> = [];
    
    let isStateSelected: boolean = false;
    let isRegionSelected: boolean = false;
    let isPrivateSelected: boolean = false;

    for (const i of this.searchTags) {
      if(i.active){
        if(i.column == "public_private"){
          if(i.value="2,3"){
            isPrivateSelected = true;
          }
        }
        if (i.type === 'StringArray') {
          if(i.column == "state"){
            isStateSelected = true;
          }

          if(i.column == "cads_vol"){
            isRegionSelected = true;
          }
        }
      }
    }

    //debugger;

    for (const i of this.searchTags) {
      if (i.active === true) {
        if (i.type === 'YesNo') {
          parameters.push(new FilterParameter(i.column, 'yes', 'string', 'AND'));
        }
        if (i.type === 'Values') {
          const vals = i.value.split(',');
          for (const e of vals) {
            if(isPrivateSelected){              
              parameters.push(new FilterParameter(i.column, e, 'string', 'OR'));
              isPrivateSelected = false;
            } else{                     
              parameters.push(new FilterParameter(i.column, e, 'string', 'AND'));
            }
          }
        }
        if (i.type === 'String') {
            parameters.push(new FilterParameter(i.column, '*' + i.value + '*', 'string', 'AND'));
        }

        if (i.type === 'StringArray') {
          const pipe = i.value.split(',');
          let valCount = pipe.length;
         
          if (valCount === 1) {
            
            if((this.collegeNameSearchId=10) && (isStateSelected || isRegionSelected)){
              parameters.push(new FilterParameter(i.column, pipe[0], 'string', 'AND'));
              //alert('JSON valCount === 1 and 10 : '+JSON.stringify(parameters));
            }
            if(isStateSelected && isRegionSelected){             
              parameters.push(new FilterParameter(i.column, pipe[0], 'string', 'AND'));
              isStateSelected = isRegionSelected = false;
              //alert('JSON valCount === 1 state and region : '+JSON.stringify(parameters));
            }         
            else if (this.collegeNameSearchId!=10){                         
              parameters.push(new FilterParameter(i.column, pipe[0], 'string', 'OR'));
              //alert('JSON valCount === 1 state or region : '+JSON.stringify(parameters));
            }
          }
          else {
            let n = 1;
            for (const e of pipe) {
             
              if (n === valCount)
              {
                parameters.push(new FilterParameter(i.column, e, 'string', 'AND'));
                //alert('JSON (n === valCount) : '+JSON.stringify(parameters));
              }
              else
              {
                parameters.push(new FilterParameter(i.column, e, 'string', 'OR'));
                //alert('JSON in (n != valCount) : '+JSON.stringify(parameters));                
              }
              n++;
            }
          }
        }

        if (i.type === 'Range') {
          parameters.push(new FilterParameter(i.column, i.value, 'range', 'AND'));
        }
        if (i.type === 'RangeDual') {
          const cols = i.column.split(',');
          let n = 0;
          for (const c of cols) {
            if (n === 0) {
              parameters.push(new FilterParameter(c, i.value, 'range', 'OR'));
              n++;
            }
            else {
              parameters.push(new FilterParameter(c, i.value, 'range', 'AND'));
            }
          }
        }
      }
    }
    
    //debugger;
    const filterParameterGroup = new FilterParameterGroup(parameters, '');
    const Group: Array<FilterParameterGroup> = [];
    Group.push(filterParameterGroup);
    this.complexFilter = new ComplexFilter(Group, 50, null);

    // parameters.push(param1);
    this.collegeFilter.collegeFilter(this.complexFilter)
      .subscribe(response => {
        // console.log(response);
        this.searchResults = response;
      }, error => {

      });
  }

  remove_college(position, position_college){
    var college = document.getElementById("college_"+position);
    college.classList.add("fadeOut");

    setTimeout(() => {
      this.colleges_to_compare.splice(position, 1);
      this.searchResults.colleges[position_college].isCompared = false;
    }, 300);
  }

  AddToCompare(college_to_compare, i){
    if(this.colleges_to_compare.length > 3){
      this._notification.alert("Warning!","You can compare up to four colleges at a time. Remove one if you want to include another.");
      return;
    }

    this.searchResults.colleges[i].isCompared = true;

    let objCollege: CollegeCompare = {
      name: college_to_compare.ARCO_name,
      position_college_result: i,
      scid: college_to_compare.scid
    };

    this.colleges_to_compare.push(objCollege);
  }

  CompareNow(content){
    if(this.colleges_to_compare.length < 2){
      this._notification.alert("Warning!", "You need at least two college to compare");
      return;
    }

    let request: ICollegeComparisonRequest = {
      scid: []
    };

    for(let colleg of this.colleges_to_compare){
      request.scid.push(colleg.scid);
    }

    this.collegeFilter.collegeComparison(request).subscribe(response => {
      this.comparisonCollege = response;

      if(this.comparisonCollege){
        if(this.comparisonCollege.response.code=="AM0000"){
          this.ConvertJsonToTable(this.comparisonCollege);
          this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }
        else{
          this._notification.alert("Warning", this.comparisonCollege.response.message);
        }
      }
    }, error => {
      this._notification.error("Error!",<any>error);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  ConvertJsonToTable(request: ICollegeComparisonResponse): any {
    let totalcollege = request.comparison.length;
    let totalAttr = FieldsCompare.length;

    this.comparisonObject = "{ \"rows\": [";
    let firstRow: boolean = true;

    for (var _i = 0; _i < totalAttr; _i++) {
        if(!firstRow){
          this.comparisonObject = this.comparisonObject + ",";
        }

        this.comparisonObject = this.comparisonObject + "{";

        switch (_i) {
          case 0:
            this.comparisonObject = this.comparisonObject + "\"Categoria\": \"Overview\" ,"; 
            break;

          case 4:
            this.comparisonObject = this.comparisonObject + "\"Categoria\": \"Rankings\" ,"; 
            break;

          case 5:
            this.comparisonObject = this.comparisonObject + "\"Categoria\": \"Admission\" ,"; 
            break;

          case 11:
            this.comparisonObject = this.comparisonObject + "\"Categoria\": \"Financial\" ,"; 
            break;

          case 15:
            this.comparisonObject = this.comparisonObject + "\"Categoria\": \"Academics\" ,"; 
            break;

          case 16:
            this.comparisonObject = this.comparisonObject + "\"Categoria\": \"Post-graduation Employment\" ,"; 
            break;

          case 20:
            this.comparisonObject = this.comparisonObject + "\"Categoria\": \"Student Body\" ,"; 
            break;
        
          default:
            this.comparisonObject = this.comparisonObject + "\"Categoria\": \"\" ,"; 
            break;
        }

        this.comparisonObject = this.comparisonObject + "\"Atributo\":" + "\"" + FieldsCompare[_i] + "\",";

        let value:any;
        let firstRowDetail: boolean = true;
        let isArray: boolean = false; 

        for(var _j = 0; _j < totalcollege; _j++) {
          switch (_i) {
            // case 0:
            //   value = request.comparison[_j].arco_name;
            //   break;
          
            case 0:
              value = request.comparison[_j].state;
              break;

            case 1:
              value = request.comparison[_j].city;
              break;

            case 2:
              value = (request.comparison[_j].public_private == "1") ? "Public" : "Private";
              break;

            case 3:
              value = request.comparison[_j].total_under_3.toString();
              break;

            case 4:
              value = request.comparison[_j].rank_overall.toString();
              break;

            // case 6:
            //   value = request.comparison[_j].rank_art.toString();
            //   break;

            // case 7:
            //   value = request.comparison[_j].rank_business.toString();
            //   break;

            // case 8:
            //   value = request.comparison[_j].rank_medical.toString();
            //   break;

            // case 9:
            //   value = request.comparison[_j].rank_cs.toString();
            //   break;

            // case 10:
            //   value = request.comparison[_j].rank_engineer.toString();
            //   break;
            
            // case 11:
            //   value = request.comparison[_j].rank_life_science.toString();
            //   break;

            // case 12:
            //   value = request.comparison[_j].rank_physical_science.toString();
            //   break;

            // case 13:
            //   value = request.comparison[_j].rank_social_science.toString();
            //   break;

            case 5:
              value = (request.comparison[_j].acceptance_rate * 100).toFixed(2) + "%";
              break;

            case 6:
              value = ((request.comparison[_j].satreasoning_comb_1 > 0) ? request.comparison[_j].satreasoning_comb_1.toString() : "N/A") + " - " +
                      ((request.comparison[_j].satreasoning_comb_2 > 0) ? request.comparison[_j].satreasoning_comb_2.toString() : "N/A");
              break;

            case 7:
              value = request.comparison[_j].satreasoning_average_3;
              break;

            case 8:
              value = ((request.comparison[_j].actrange_comp_1 > 0) ? request.comparison[_j].actrange_comp_1.toString() : "N/A") + " - " +
                      ((request.comparison[_j].actrange_comp_2 > 0) ? request.comparison[_j].actrange_comp_2.toString() : "N/A");
              break;

            case 9:
              value = request.comparison[_j].act_average_1;
              break;

            case 10:
              value = request.comparison[_j].ave_second_gpa.toString();
              break;

            case 11:
              value = request.comparison[_j].tuition_outstate.toString();
              break;

            case 12:
              value = request.comparison[_j].tuition_instate.toString();
              break;

            case 13:
              value = (request.comparison[_j].pc_borrow == "") ? "0%" : request.comparison[_j].pc_borrow + "%";
              break;

            case 14:
              value = (+request.comparison[_j].ftf_aid_1 > 0) ? ((+request.comparison[_j].ftf_aid_4 / +request.comparison[_j].ftf_aid_1)*100).toFixed(2) + "%" : "0%";
              break;

            case 15:
              //value = request.comparison[_j].degree_o;
              //var array = Array.from(value);
              isArray = true;
              var cadenaArray = request.comparison[_j].degree_o.slice(0,-1).substring(1);
              let lista: any[] = [];

              for(let obj of cadenaArray.split('[')){
                if(obj.split(',')[1] != undefined){
                  var re = /'/gi; 
                  let degree = {
                    description: obj.split(',')[1].toString().replace(re,"").replace("]",""),
                    type: obj.split(',')[3].toString().replace(re,"").replace("]","")
                  }
                  
                  if(!this.VerifyItemOnArray(lista, degree)){
                    lista.push(degree);
                  }
                }
              }

              value = lista;
              break;

            // case 25:
            //   value = request.comparison[_j].major_o;
            //   break;

            case 16:
              value = (request.comparison[_j].pc_related_1 == "") ? "0%" : request.comparison[_j].pc_related_1 + "%";
              break;

            case 17:
              value = (request.comparison[_j].pc_related_2 == "") ? "0%" : request.comparison[_j].pc_related_2 + "%";
              break;

            case 18:
              value = (request.comparison[_j].pc_related_3 == "") ? "0%" : request.comparison[_j].pc_related_3 + "%";
              break;

            case 19:
              value = request.comparison[_j].salary_10_year;
              break;

            case 20:
              value = (+request.comparison[_j].ugrad_break_10 > 0) ? ((+request.comparison[_j].total_grad_1 / +request.comparison[_j].ugrad_break_10)*100).toFixed(2) + "%" : "0%";
              break;

            case 21:
              value = (+request.comparison[_j].ugrad_break_10 > 0) ? ((+request.comparison[_j].total_grad_2 / +request.comparison[_j].ugrad_break_10)*100).toFixed(2) + "%" : "0%";
              break;

            case 22:
              value = (+request.comparison[_j].ugrad_break_10 > 0) ? ((+request.comparison[_j].ugrad_break_2 / +request.comparison[_j].ugrad_break_10)*100).toFixed(2) + "%" : "0%";
              break;

            case 23:
              value = (+request.comparison[_j].ugrad_break_10 > 0) ? ((+request.comparison[_j].ugrad_break_3 / +request.comparison[_j].ugrad_break_10)*100).toFixed(2) + "%" : "0%";
              break;
            
            case 24:
              value = (+request.comparison[_j].ugrad_break_10 > 0) ? ((+request.comparison[_j].ugrad_break_4 / +request.comparison[_j].ugrad_break_10)*100).toFixed(2) + "%" : "0%";
              break;

            case 25:
              value = (+request.comparison[_j].ugrad_break_10 > 0) ? ((+request.comparison[_j].ugrad_break_6 / +request.comparison[_j].ugrad_break_10)*100).toFixed(2) + "%" : "0%";
              break;

            case 26:
              value = request.comparison[_j].ugrad_break_10;
              break;

            case 27:
              value = request.comparison[_j].student_staff_ratio;
              break;
          }

          if(!firstRowDetail){
            this.comparisonObject = this.comparisonObject + ",";
          }

          if(isArray){
            this.comparisonObject = this.comparisonObject + "\"col"+_j+"\":" + JSON.stringify(value);
          }
          else
            this.comparisonObject = this.comparisonObject + "\"col"+_j+"\":" + "\"" + value.toString() + "\"";

          firstRowDetail = false;
        }

        this.comparisonObject = this.comparisonObject + "}";
        firstRow = false;
    }

    this.comparisonObject = this.comparisonObject + "]}";
    this.comparisonObject = JSON.parse(this.comparisonObject);
  }

  VerifyItemOnArray(lista: any[], degree: any): boolean{
    for(let obj of lista){
      if(obj.type == degree.type){
        return true;
      }
    }

    return false;
  }
}

export interface SearchTags {
  id: any;
  type: String;
  name: String;
  value: String;
  active: boolean;
  column: String;
}

export interface CollegeCompare {
  scid: String;
  name: String;
  position_college_result: number; 
}

const FieldsCompare = [
  // "School",
  "State",
  "City",
  "Public/Private",
  "Total Undergraduate Population",
  "Overall Ranking",
  // "Ranking of Art & Humanities",
  // "Ranking of Business & Economics",
  // "Ranking of Clinical, Pre-clinical & Health",
  // "Ranking of Computer Science",
  // "Ranking of Engineering",
  // "Ranking of Life Sciences",
  // "Ranking of Physical Sciences",
  // "Ranking of Social Sciences",
  "Admission Rate",
  "SAT Middle Range",
  "SAT Average",
  "ACT Middle Range",
  "ACT Average",
  "Average GPA",
  "Out-State Tuition (USD)",
  "In-State Tuition (USD)",
  "Undergraduate with Loan",
  "Undergraduate with Financial Aid",
  "Degree Offered",
  // "Major Offered",
  "Graduates employed within six months",
  "Graduates employed within one year",
  "Graduates employed within two years",
  "Salary After 10 Years (USD)",
  "Undergraduate Male Population",
  "Undergraduate Female Population",
  "Latin Undergraduate Population",
  "Black Undergraduate Population",
  "White Undergraduate Population",
  "Asian Undergraduate Population",
  "Total Undergraduate Population",
  "Student-Staff Ratio"
]