import packageSettings from '@src/../package.json';
import { AdminAuthority } from '@util/Middleware';
import {
  AllMapping,
  Controller,
  DataTypes,
  GetMapping,
  PostMapping,
  SetMiddleware,
  SetSuccessMessage,
  WrappedRequest,
} from 'express-quick-builder';

@Controller
export default class IndexController {
  @PostMapping()
  @SetMiddleware(AdminAuthority)
  async create(req: WrappedRequest): Promise<void> {
    const { title, subtitle, tag, content } = req.verify.body({
      title: DataTypes.string(),
      subtitle: DataTypes.stringNull(),
      tag: DataTypes.arrayNull({
        valueVerifier: DataTypes.string(),
      }),
      content: DataTypes.string(),
    });
  }
}
