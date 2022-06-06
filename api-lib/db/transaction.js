import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findTransactionById(db, id) {
  const transactions = await db
    .collection('transactions')
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
  if (!transactions[0]) return null;
  return transactions[0];
}

export async function findTransactions(db, before, by, limit = 10) {
  return db
    .collection('transactions')
    .aggregate([
      {
        $match: {
          ...(by && { creatorId: new ObjectId(by) }),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
}

export async function insertTransaction(
  db,
  {
    content,
    date,
    collectionName,
    collectionNumber,
    purchaseCost,
    transactionType,
    acquisitionSource,
    creatorId,
  }
) {
  const transaction = {
    content,
    date,
    collectionName,
    collectionNumber,
    purchaseCost,
    transactionType,
    acquisitionSource,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db
    .collection('transactions')
    .insertOne(transaction);
  transaction._id = insertedId;
  return transaction;
}
