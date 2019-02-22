import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Search College/Course',
    icon: 'nb-search',
    link: '/pages/search',
  },
  {
    title: 'Profile',
    icon: 'nb-compose',
    link: '/pages/profile',
  },
  {
    title: 'My Application',
    icon: 'ion-filing',
    link: '/pages/application',
  },   
  {
    title: 'UTILITIES',
    group: true,
  },
  {
    title: 'Downloads',
    icon: 'fas fa-download',
    link: '/pages/downloads',
  },
  {
    title: 'FAQ',
    icon: 'ion-help'
  },
  {
    title: 'Help',
    icon: 'ion-help-buoy',
    link: '/pages/help',
  },
  {
    title: 'Change Theme',
    icon: 'nb-drops',
    children: [
      {
        title: 'Light',
      },
      {
        title: 'Cosmic',
      },      
      {
        title: 'Corporate',
      },
    ],
  },
];
