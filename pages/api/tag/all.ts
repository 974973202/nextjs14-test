import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { prepareConnection } from 'db/index';
import { Tag } from 'db/entity/index';

export default withIronSessionApiRoute(all, ironOptions);

async function all(req: NextApiRequest, res: NextApiResponse) {
  const db = await prepareConnection();
  const tagRepo = db.getRepository(Tag);

  const allTags = await tagRepo.find();

  res?.status(200)?.json({
    code: 0,
    msg: '',
    data: allTags,
  });
}
