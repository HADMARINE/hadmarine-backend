import Portfolio from '@models/Portfolio';
import packageSettings from '@src/../package.json';
import { QueryBuilder } from '@util/Assets';
import { AdminAuthority } from '@util/Middleware';
import {
  Controller,
  DataTypes,
  DeleteMapping,
  PatchMapping,
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

    await Portfolio.create({
      title,
      subtitle,
      type,
      content,
      link,
      date: Date.now(),
    });
  }

  @PatchMapping(':id')
  @SetMiddleware(AdminAuthority)
  async modify(req: WrappedRequest): Promise<null | void> {
    const { id } = req.verify.params({ id: DataTypes.string() });
    const { title, subtitle, type, content, link } = req.verify.body({
      title: DataTypes.stringNull(),
      subtitle: DataTypes.stringNull(),
      type: DataTypes.stringNull(),
      content: DataTypes.stringNull(),
      link: DataTypes.objectNull(),
    });

    await Portfolio.findByIdAndUpdate(id, {
      $set: QueryBuilder({
        title,
        subtitle,
        type,
        content,
        link,
      }),
    });
  }

  @DeleteMapping(':id')
  @SetMiddleware(AdminAuthority)
  async delete(req: WrappedRequest): Promise<null | void> {
    const { id } = req.verify.params({
      id: DataTypes.string(),
    });

    const portfolio = await Portfolio.findByIdAndDelete(id);
    return portfolio ? undefined : null;
  }
}
