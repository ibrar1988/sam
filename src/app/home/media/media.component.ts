import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  articles = [{ 'Title': 'This 14-year-old made the best Facebook Messenger chatbot', 'Publication': 'BBC', 'URL': 'http://www.bbc.com/news/technology-39013950' },
  { 'Title': '5 bots to try this week: Christian Grey, ChatterOn, Messenger Match, Christopher Bot, and Echo', 'Publication': 'Venture Beat', 'URL': 'https://venturebeat.com/2017/02/20/5-bots-to-try-this-week-christian-grey-chatteron-messenger-match-christopher-bot-and-echo/' },
  { 'Title': 'Meet Christopher Bot: Study aid created by B.C. teen explodes overseas', 'Publication': 'Toronto Metro', 'URL': 'http://www.metronews.ca/news/canada/2017/03/12/facebook-tool-created-by-b-c-teen-to-plan-homework-gains-popularity-overseas.html' },
  { 'Title': 'This Smart Teen Develops A Homework Bot On Facebook', 'Publication': 'Techmalak', 'URL': 'https://www.techmalak.com/this-smart-teen-develops-a-homework-bot-on-facebook/#.WO98no61taV' },
  { 'Title': 'Meet the Facebook Messenger Chatbot Prodigy', 'Publication': 'Robust Tech House', 'URL': 'http://singaporechatbots.sg/meet-facebook-messenger-chatbot-prodigy/' },
  { 'Title': 'Facebook tool created by B.C. teen to plan homework gains overseas popularity', 'Publication': 'CTV News ', 'URL': 'http://www.ctvnews.ca/sci-tech/facebook-tool-created-by-b-c-teen-to-plan-homework-gains-overseas-popularity-1.3321516' },
  { 'Title': '"Christopher Bot" erinnert an Hausaufgaben\n14-Jähriger hat App entwickelt, die per Messenger kommuniziert', 'Publication': 'Pressetext', 'URL': 'https://www.pressetext.com/news/20170317004' },
  { 'Title': 'Chatbot Created By 14-Year-Old Shows (a lot of) Promise', 'Publication': 'InterQuest Group', 'URL': 'http://www.interquestgroup.com/iq-hub/news/2017/chatbot-created-by-14-year-old-shows-a-lot-of-promise' },
  { 'Title': 'B.C. teen creates Facebook chatbot to help students stay organized ', 'Publication': 'The Globe and Mail', 'URL': 'http://www.theglobeandmail.com/news/british-columbia/bc-teen-creates-facebook-chatbot-to-help-students-stay-organized/article34278474/' },
  { 'Title': 'Alec Jones, el niño de 14 años que lidera la revolución tecnológica del futuro de Facebook: los bots', 'Publication': 'T13', 'URL': 'http://www.t13.cl/noticia/tendencias/tecnologia/alec-jones-nino-14-anos-lidera-revolucion-tecnologica-del-futuro-facebook-bots' },
  { 'Title': 'Chat Bot Growth Continues, Despite Setbacks', 'Publication': 'Startapp', 'URL': 'http://www.startapp.com/blog/chat-bot-growth-continues-despite-setbacks/' },
  { 'Title': 'Alec Jones, el niño de 14 años que lidera la revolución tecnológica del futuro de Facebook: los bots', 'Publication': 'elmostrador', 'URL': 'http://www.elmostrador.cl/vida-en-linea/2017/02/21/alec-jones-el-nino-de-14-anos-que-lidera-la-revolucion-tecnologica-del-futuro-de-facebook-los-bots/' },
  { 'Title': 'This 14-year-old made the best Facebook chatbot', 'Publication': 'The Century News ', 'URL': 'http://thecenturynews.com/14-year-old-made-best-facebook-chatbot/' },
  { 'Title': 'A boy of 14 years leads the technological revolution of the future of Facebook: the bots. His name is Alec Jones ', 'Publication': 'Why be Magazine', 'URL': 'http://whybemagazine.com/2017/02/24/boy-14-years-leads-technological-revolution-future-facebook-bots-name-alec-jones/' },
  { 'Title': 'The chatbot ', 'Publication': 'newzworm', 'URL': 'https://www.newzworm.com/readmore.php?viewid=2363' },
  { 'Title': 'CTV News: Facebook Tool Created by B.C. Teen to Plan Homework Gains Overseas Popularity', 'Publication': 'Research Buzz', 'URL': 'https://rbfirehose.com/2017/03/13/ctv-news-facebook-tool-created-by-b-c-teen-to-plan-homework-gains-overseas-popularity/' },
  { 'Title': 'Victoria Teen Creates Homework Tracking Chatbot, Built on Facebook’s Messenger Platform ', 'Publication': 'Iphone in Canada', 'URL': 'http://www.iphoneincanada.ca/news/victoria-teen-creates-homework-tracking-chatbot-built-on-facebooks-messenger-platform/' },
  { 'Title': 'Martin Borgs: Här är mina bästa bot-tips', 'Publication': 'Resume', 'URL': 'https://www.resume.se/nyheter/artiklar/2017/03/08/martin-borgs-har-ar-mina-basta-bot-tips/' },
  { 'Title': 'Welcome to Spring', 'Publication': 'Ms. Isfeld\'s 7&8 ELA (Blog)', 'URL': 'http://vwisfeldela.weebly.com/' },
  { 'Title': 'O menino de 14 anos que está à frente da revolução tecnológica pretendida pelo Facebook', 'Publication': 'globo.com', 'URL': 'http://g1.globo.com/tecnologia/noticia/o-menino-de-14-anos-que-esta-a-frente-da-revolucao-tecnologica-pretendida-pelo-facebook.ghtml' },
  { 'Title': 'Say goodbye, Siri: a report into the new chatbot trend', 'Publication': '50 Pound Social', 'URL': 'https://50poundsocial.co.uk/say-goodbye-siri-report-new-chatbot-trend/' },
  { 'Title': 'Christopher Bot te recuerda que hagas los deberes', 'Publication': 'Fcinco', 'URL': 'http://www.elmundo.es/f5/comparte/2017/04/13/58ed2587e2704ef9728b45c1.html' },
  { 'Title': 'Why the rise of bots is a game changer', 'Publication': 'recast.ai', 'URL': 'https://blog.recast.ai/rise-bots-game-changer/' },
  { 'Title': 'This 14-year-old made the best Facebook chat bot', 'Publication': 'WB News', 'URL': 'https://www.wbnews.info/2017/02/this-14-year-old-made-the-best-facebook-chat-bot/' },
  { 'Title': 'This B.C. Teen Created A Facebook App To Help With Homework', 'Publication': 'eOntarioNow', 'URL': 'http://www.eontarionow.com/scitech/this-b-c-teen-created-a-facebook-app-to-help-with-homework/326' },
  { 'Title': 'Alec Jones, el niño de 14 años que lidera la revolución tecnológica del futuro de Facebook: los bots ', 'Publication': ' Telemundo', 'URL': 'http://www.telemundo.com/noticias/2017/02/21/alec-jones-el-nino-de-14-anos-que-lidera-la-revolucion-tecnologica-del-futuro-de' },
  { 'Title': 'A 14 Year Old’s Story Building and Marketing a Chatbot', 'Publication': 'Love The Idea', 'URL': 'https://lovetheidea.co.uk/blog/story-building-marketing-chatbot/' },
  { 'Title': '\nVictoria teen\'s Facebook tool to plan homework gains popularity overseas', 'Publication': 'Vancouver Sun', 'URL': 'http://vancouversun.com/news/local-news/victoria-teens-facebook-tool-to-plan-homework-gains-popularity-overseas' },
  { 'Title': 'Modern day agenda: Victoria teen creates chatbot to keep track of homework', 'Publication': 'Vancouver Island CTV News', 'URL': 'http://vancouverisland.ctvnews.ca/modern-day-agenda-victoria-teen-creates-chatbot-to-keep-track-of-homework-1.3312116' },
  { 'Title': 'This 14-year-old made the best Facebook Messenger chat bot', 'Publication': 'The Loop PNG', 'URL': 'http://www.looppng.com/tech/14-year-old-made-best-facebook-messenger-chat-bot-52709' },
  { 'Title': 'O menino de 14 anos que está à frente da revolução tecnológica pretendida pelo Facebook', 'Publication': 'terra', 'URL': 'https://tecnologia.terra.com.br/o-menino-de-14-anos-que-esta-a-frente-da-revolucao-tecnologica-pretendida-pelo-facebook,bc8251ba9e164cd67fee7ef02c3ef8c3w26e45jm.html' },
  { 'Title': 'Il ragazzo prodigio dei chatbot: vi presento Alec Jones', 'Publication': 'Talking', 'URL': 'http://www.tlk.ng/ragazzo-prodigio-chatbot-alec-jones/' },
  { 'Title': 'Alec Jones, el niño de 14 años que lidera la revolución tecnológica del futuro de Facebook: los bots', 'Publication': 'iProfessional ', 'URL': 'http://www.iprofesional.com/notas/246017-Alec-Jones-el-nio-de-14-aos-que-lidera-la-revolucin-tecnolgica-del-futuro-de-Facebook-los-bots' },
  { 'Title': 'B.C. teen develops app to help students stop forgetting homework', 'Publication': 'Chek News ', 'URL': 'http://www.cheknews.ca/b-c-teen-develops-app-to-help-students-stop-forgetting-homework-289297/' },
  { 'Title': 'B.C. teen develops app to help students stop forgetting homework', 'Publication': 'CBC News ', 'URL': 'https://ca.news.yahoo.com/b-c-teen-develops-app-213659045.html' },
  { 'Title': 'Die App ', 'Publication': '', 'URL': 'http://www.infoticker.ch/news/artikel/die-app-christopher-bot-erinnert-schueler-an-hausaufgaben-96341/' },
  { 'Title': 'Victoria adolescent\'s Facebook instrument to arrange homework picks up prevalence abroad', 'Publication': 'Business Liability Insurance News (Blog) ', 'URL': 'http://www.businessliabilityinsurance.info/2017/04/victoria-adolescents-facebook.html' },
  { 'Title': 'Facebook homework reminder bot created by BC teen is inventive but flawed', 'Publication': 'cantechletter', 'URL': 'http://www.cantechletter.com/2017/03/facebook-homework-reminder-bot-created-bc-teen-inventive-flawed/' }];

  articles2 = [{ 'Title': 'What it’s like to build and market a chatbot when you’re only 14 years old', 'Publication': 'Free Code Camp', 'URL': 'https://medium.freecodecamp.com/the-ups-and-downs-of-building-and-marketing-a-chat-bot-when-youre-14-8a072830b43c' },
  { 'Title': 'CHRISTOPHER BOT', 'Publication': 'Soundbytes', 'URL': 'https://soundbytesradio.com/christopher-bot/' },
  { 'Title': 'Facebook Messenger homework app', 'Publication': 'Global News', 'URL': 'http://globalnews.ca/video/3326320/facebook-messenger-homework-app' },
  { 'Title': 'Chat Bots Weekly #36', 'Publication': 'Chat Bots Weekly', 'URL': 'http://www.chatbotsweekly.com/2017/03/07/issue-36' },
  { 'Title': 'Bot Weekly #49', 'Publication': 'bot weekly', 'URL': 'http://botweekly.com/issues/49' },
  { 'Title': 'Alec Jones, 14, talks about his homework chat bot', 'Publication': 'CBC', 'URL': 'http://www.cbc.ca/player/play/897962563742' },
  { 'Title': 'เด็กชายอายุ 14 ปี สร้างแชทบอทไว้บันทึกการบ้านในแต่ละวิชาและเตือนการบ้านที่ต้องทำเมื่อเลิกเรียน', 'Publication': 'The Matter', 'URL': 'https://www.facebook.com/thematterco/photos/a.1735876059961122.1073741831.1721313428084052/1842438379304889/?type=3&theater' }];

  constructor(iconRegistry: MdIconRegistry) { 
    iconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
}

}
