import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { prepareConnection } from 'db/index';
import { Article } from 'db/entity/index';

export default withIronSessionApiRoute(remove, ironOptions);

async function remove(req: NextApiRequest, res: NextApiResponse) {
  const { id }: { id?: number } = req?.query || {};
  console.log(id);

  try {
    const db = await prepareConnection();
    const articleRepo = db.getRepository(Article);
    if (id) {
      const redult = await articleRepo.delete({ id });
      res?.status(200).json({
        code: 0,
        msg: redult?.affected === 1 ? '删除成功' : '未知错误',
        data: redult || {},
      });
    } else {
      res.status(200).json({ data: {}, code: 200, msg: 'id is not find' });
    }
  } catch (error) {
    res.status(200).json({ data: error, code: 500, msg: 'article delete err' });
  }
}
