import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { StudentVLogs } from 'app/home/student-vlog/student-vlog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-vlog',
  templateUrl: './student-vlog.component.html',
  styleUrls: ['./student-vlog.component.css']
})
export class StudentVlogComponent implements OnInit {
  content: StudentVLogs;

  constructor() { }

  ngOnInit() {
    this.getContainer();
  }

  getContainer() {
    this.content = new StudentVLogs();
    for(let video of this.content.studentVLogs){
      video.url = this.youtubeEmbedUrl(video.url);
    }

    console.log(this.content);
  }

  youtubeEmbedUrl(url: string): string{
    var video_id = url.split('v=')[1];
    if(video_id == null){
      video_id = 'EFAZzIIyRmI'; //myKlovr Video
    }
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return 'https://www.youtube.com/embed/' + video_id;
  }
}
