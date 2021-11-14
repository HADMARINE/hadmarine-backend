import Portfolio, { PortfolioInterface } from '@models/Portfolio';
import packageSettings from '@src/../package.json';
import { QueryBuilder } from '@util/Assets';
import {
  Controller,
  DataTypes,
  GetMapping,
  WrappedRequest,
} from 'express-quick-builder';

@Controller
export default class PortfolioController {
  @GetMapping('/all')
  async getAll(): Promise<PortfolioInterface[]> {
    return await Portfolio.find().sort('-date');
  }

  @GetMapping()
  async getMaster(
    req: WrappedRequest,
  ): Promise<{ data: PortfolioInterface[]; length: number } | null> {
    const { skip, limit, search } = req.verify.query({
      skip: DataTypes.numberNull(),
      limit: DataTypes.numberNull(),
      search: DataTypes.stringNull(),
    });

    const portfolios = await Portfolio.find(
      QueryBuilder({
        title: search,
      }),
    )
      .sort('-date')
      .skip(skip || 0)
      .limit(limit || 10);

    const length = await Portfolio.count(
      QueryBuilder({
        title: search,
      }),
    );
    if (portfolios.length === 0) {
      return null;
    }
    return {
      data: portfolios,
      length,
    };
  }
}
