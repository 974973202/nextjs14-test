import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { prepareConnection } from 'db/index';
import { Article } from 'db/entity/index';

export default withIronSessionApiRoute(get, ironOptions);

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { userId = 0, skin, take } = req?.query || {};
  try {
    const db = await prepareConnection();
    const articleRepo = db.getRepository(Article);

    const [articles, count] = await articleRepo.findAndCount({
      relations: ['user', 'tags'],
      where: {
        user: {
          id: Number(userId),
        },
      },
      skip: Number(skin),
      take: Number(take),
      order: {
        update_time: 'DESC',
      },
    });

    res?.status(200).json({
      code: 0,
      msg: '',
      data: articles || [],
      count: count || 0,
    });
  } catch (error) {
    res.status(200).json({ data: error, code: 500, msg: 'article get err' });
  }
}
