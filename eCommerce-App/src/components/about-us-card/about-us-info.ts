export interface IAboutUs {
  name: string;
  img: string;
  status: string;
  githubUrl: string;
  info: string;
  contribution: string[];
}

export interface IAllInfoAboutUs {
  IAboutUs: IAboutUs[];
}

const contributions: string[][] = [
  [
    'Setting up CommerceTools project and API client',
    'Configuring repository and task board',
    'Implementing server-side Login functionality',
    'Handling login errors',
    'Integrating shopping cart functionality',
    'Setting up development environment and scripts',
    'Implementing client-side Login features',
    'Creating comprehensive product lists',
    'Integrating catalog page functionality',
    'Implementing product quantity modification features',
  ],
  [
    'Displaying user profile information',
    'Enabling user profile editing',
    'Setting up repository and task board',
    'Implementing server-side Registration pages',
    'Handling registration errors',
    'Implementing interactive product cards',
    'Configuring development environment and scripts',
    'Implementing client-side Registration pages',
    'Displaying shopping cart items',
    'Implementing product quantity modification features',
  ],
  [
    'Implementing navigation and header components',
    'Setting up routing',
    'Handling login errors',
    'Creating the About page',
    'Developing detailed product pages',
    'Displaying product lists and category navigation',
    'Implementing interactive product card functionality',
    'Integrating error pages and footer',
    'Displaying detailed product information',
    'Implementing enlarged image modals with sliders for product images',
  ],
];

const Roman: IAboutUs = {
  name: 'Roman Sokolov',
  img: 'roman',
  status: 'Team lead',
  githubUrl: 'https://github.com/rs0048',
  info: 'Passionate about crafting intuitive user interfaces and diving deep into backend architecture, I aspire to continually grow as a developer, bringing innovative solutions to every project I undertake.',
  contribution: contributions[0],
};

const Nikita: IAboutUs = {
  name: 'Nikita Radevich',
  img: 'nikita',
  status: 'Developer',
  githubUrl: 'https://github.com/lonelybush',
  info: "I've always wanted to try web development because I find its challenges appealing. I know I have much to learn, but with the right approach, I believe I can achieve my goal",
  contribution: contributions[1],
};

const Yana: IAboutUs = {
  name: 'Yana Dyachok',
  img: 'yana',
  status: 'Developer',
  githubUrl: 'https://github.com/Yana-Dyachok',
  info: 'I love the latest technologies and constant development I want to succeed in my future profession, because it’s much better to develop in the field that you like. ',
  contribution: contributions[2],
};

export const aboutUs: IAboutUs[] = [Roman, Nikita, Yana];
