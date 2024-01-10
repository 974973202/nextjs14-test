import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from 'pages/api/index';
import { prepareConnection } from 'db/index';
import { User } from 'db/entity/index';
import { EXCEPTION_USER } from 'pages/api/config/codes';

export default withIronSessionApiRoute(detail, ironOptions);

async function detail(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { userId } = session;
  if (userId) {
    try {
      const db = await prepareConnection();
      const userRepo = db.getRepository(User);

      const user = await userRepo.findOne({
        where: {
          id: Number(userId),
        },
      });

      if (user) {
        res?.status(200)?.json({
          code: 0,
          msg: '',
          data: {
            userInfo: user,
          },
        });
      } else {
        res?.status(200)?.json({
          ...EXCEPTION_USER.NOT_FOUND,
        });
      }
    } catch (error) {
      res?.status(200)?.json({
        code: 500,
        msg: error,
        data: {},
      });
    }
  } else {
    res?.status(200)?.json({
      code: 403,
      msg: '您没有权限',
      data: {},
    });
  }
}
