import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { HelpComponent } from './help.component';
import { NbListModule, 
  NbButtonModule, 
  NbActionsModule, 
  NbInputModule,
  NbChatModule } from '@nebular/theme';
import { ViewTicketComponent } from './viewTicket/viewTicket.component';
import { NewTicketComponent } from './newTicket/newTicket.component';
import { ChatComponent } from '../chat/chat.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
      ThemeModule,
      NbListModule,
      NbButtonModule,
      NbActionsModule,
      NbInputModule,
      NbChatModule,
      RouterModule
    ],
    declarations: [HelpComponent,ViewTicketComponent,NewTicketComponent,ChatComponent],
    providers: [],
    entryComponents: [
      NewTicketComponent
    ],
  })
  export class HelpModule {
  }