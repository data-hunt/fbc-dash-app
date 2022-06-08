import { ValidateProps } from '@/api-lib/constants';
import { findTransactions, insertTransaction } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const transactions = await findTransactions(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ transactions });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      // content: ValidateProps.transaction.content,
      purchaseDate: ValidateProps.transaction.date,
      collectionName: ValidateProps.transaction.collectionName,
      collectionNumber: ValidateProps.transaction.collectionNumber,
      purchaseCost: ValidateProps.transaction.purchaseCost,
      transactionType: ValidateProps.transaction.transactionType,
      acquisitionSource: ValidateProps.transaction.acquisitionSource,
    },
    required: ['collectionName'],
    required: ['purchaseCost'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const transaction = await insertTransaction(req.db, {
      // content: req.body.content,
      purchaseDate: req.body.purchaseDate,
      collectionName: req.body.collectionName,
      collectionNumber: req.body.collectionNumber,
      purchaseCost: req.body.purchaseCost,
      transactionType: req.body.transactionType,
      acquisitionSource: req.body.acquisitionSource,
      creatorId: req.user._id,
    });

    return res.json({ transaction });
  }
);

export default handler;
