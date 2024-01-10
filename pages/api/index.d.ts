import { IronSession } from 'iron-session';
import { IUserInfo } from 'store/userStore';

export interface IComment {
  id: number;
  content: string;
  create_time: Date;
  update_time: Date;
}

export interface IArticle {
  id: number;
  title: string;
  content: string;
  views: number;
  create_time: Date;
  update_time: Date;
  user: IUserInfo;
  comments: IComment[];
  tags?: any[];
}

export type ISession = IronSession & {
  verifyCode?: any; // 短信登录验证码
} & Record<string, any>;
