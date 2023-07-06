import { Model } from 'mongoose';
import {
  IPaginateData,
  IPaginateResult,
  ISortData,
  SortOrder,
} from './interfaces.util';

const Paginate = async (
  model: Model<any>,
  aggregate: any[],
  paginate: IPaginateData,
  sort: ISortData,
): Promise<IPaginateResult<any>> => {
  const results = await model
    .aggregate(
      aggregate
        .concat(
          sort.field
            ? [
                {
                  $sort: {
                    [sort.field]: sort.order === SortOrder.ASC ? 1 : -1,
                  },
                },
              ]
            : [],
        )
        .concat([
          { $skip: (paginate.page - 1) * paginate.perPage },
          { $limit: paginate.perPage },
        ]),
    )
    .collation({ locale: 'pt' });

  const [countQuery] = await model.aggregate(
    aggregate.concat([{ $count: 'total' }]),
  );

  const total = countQuery ? countQuery.total : 0;

  paginate.pages = Math.max(Math.ceil(total / paginate.perPage), 1);
  paginate.total = total;

  return {
    results,
    paginate,
    sort,
  };
};

export { Paginate };
