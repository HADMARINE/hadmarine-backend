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
  async getMaster(req: WrappedRequest): Promise<PortfolioInterface[]> {
    const { page, count, search } = req.verify.query({
      page: DataTypes.numberNull(),
      count: DataTypes.numberNull(),
      search: DataTypes.stringNull(),
    });

    const skip = page && count ? (page - 1) * count : 0;
    const limit = count || 10;

    return await Portfolio.find(
      QueryBuilder({
        title: search,
      }),
    )
      .sort('-date')
      .skip(skip)
      .limit(limit);
  }
}
