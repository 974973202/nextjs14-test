interface ICookieInfo {
  id: number;
  nickname: string;
  avatar: string;
}

export const setCookie = (cookies: any, { id, nickname, avatar }: ICookieInfo) => {
  // 登录时效，24h
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000 * 3);
  const path = '/';

  cookies.set('userId', id, {
    path,
    expires,
  });
  cookies.set('nickname', nickname, {
    path,
    expires,
  });
  cookies.set('avatar', avatar, {
    path,
    expires,
  });
};

export const clearCookie = (cookies: any) => {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000 * 3);
  const path = '/';

  cookies.set('userId', '', {
    path,
    expires,
  });
  cookies.set('nickname', '', {
    path,
    expires,
  });
  cookies.set('avatar', '', {
    path,
    expires,
  });
};

export const getCookie = (name: string) => {
  return document.cookie?.match(`[;s+]?${name}=([^;]*)`)?.pop();
};

// 早上好,上午好,下午好,傍晚好,晚上好
export const getDataText = () => {
  const now = new Date().getHours();
  let dataTip = '';
  if (now < 6) {
    dataTip = '凌晨好';
  } else if (now < 9) {
    dataTip = '早上好';
  } else if (now < 12) {
    dataTip = '上午好';
  } else if (now < 14) {
    dataTip = '中午好';
  } else if (now < 17) {
    dataTip = '下午好';
  } else if (now < 19) {
    dataTip = '傍晚好';
  } else if (now < 22) {
    dataTip = '晚上好';
  } else {
    dataTip = '夜猫子';
  }
  return dataTip;
};
