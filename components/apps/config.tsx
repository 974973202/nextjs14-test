import LinkWeb from './components/LinkWeb'
import ChatGPT from './components/ChatGPT'
import Terminal from './components/Terminal'
// import TurboChat from './components/TurboChat'
// import Login from './components/TurboChat/Login'
import FaceTime from './components/FaceTime'

export interface AppsData {
  id: string;
  title: string;
  img: string;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  content?: JSX.Element;
  link?: string;
}

const apps: AppsData[] = [
  {
    id: 'launchpad',
    title: 'Launchpad',
    img: '/img/icons/launchpad.png',
  },
  {
    id: 'vscode',
    title: 'VSCode',
    width: 860,
    height: 560,
    img: '/img/icons/vscode.png',
    content: <LinkWeb src='https://github1s.com/974973202/vite-r' title='VSCode' />,
  },
  {
    id: 'chatgpt',
    title: 'ChatGPT',
    width: 440,
    height: 580,
    img: '/img/icons/chatgpt.png',
    content: <ChatGPT />,
  },
  {
    id: 'terminal',
    title: 'Terminal',
    width: 700,
    height: 500,
    img: '/img/icons/terminal.png',
    content: <Terminal />,
  },
  // {
  //   id: 'turbochat',
  //   title: 'TurboChat',
  //   width: 969,
  //   height: 640,
  //   img: '/img/icons/turbochat.png',
  //   content: <TurboChat />,
  // },
  // {
  //   id: 'login',
  //   title: 'Login',
  //   width: 320,
  //   height: 448,
  //   img: '/img/icons/qq.png',
  //   content: <Login />,
  // },
  {
    id: 'facetime',
    title: 'FaceTime',
    img: 'img/icons/facetime.png',
    height: 530,
    content: <FaceTime />,
  },
  {
    id: 'email',
    title: 'Mail',
    img: '/img/icons/mail.png',
    content: <></>,
  },
  {
    id: 'github',
    title: 'Github',
    img: '/img/icons/github.png',
    link: 'https://github.com/974973202',
    content: <></>,
  },
]

export default apps
