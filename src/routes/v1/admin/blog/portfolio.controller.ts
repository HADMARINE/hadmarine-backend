import Portfolio from '@models/Portfolio';
import packageSettings from '@src/../package.json';
import { AdminAuthority } from '@util/Middleware';
import {
  Controller,
  DataTypes,
  PostMapping,
  SetMiddleware,
  WrappedRequest,
} from 'express-quick-builder';

@Controller
export default class AdminPortfolioController {
  @PostMapping()
  @SetMiddleware(AdminAuthority)
  async create(req: WrappedRequest): Promise<void> {
    const { title, subtitle, type, content, link } = req.verify.body({
      title: DataTypes.string(),
      subtitle: DataTypes.stringNull(),
      type: DataTypes.string(),
      content: DataTypes.string(),
      link: DataTypes.objectNull(),
    });

    const portfolio = await Portfolio.create({
      title,
      subtitle,
      type,
      content,
      link,
      date: Date.now(),
    });
  }
}
