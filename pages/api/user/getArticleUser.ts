import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { prepareConnection } from 'db/index';
import { User } from 'db/entity/index';
import { EXCEPTION_USER } from 'pages/api/config/codes';

export default withIronSessionApiRoute(detail, ironOptions);

async function detail(req: NextApiRequest, res: NextApiResponse) {
  const { authorId } = req?.query || {};
  try {
    const db = await prepareConnection();
    const userRepo = db.getRepository(User);

    const authorInfo = await userRepo.findOne({
      where: {
        id: Number(authorId),
      },
    });

    if (authorInfo) {
      res?.status(200)?.json({
        code: 0,
        msg: '',
        data: authorInfo,
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
}
