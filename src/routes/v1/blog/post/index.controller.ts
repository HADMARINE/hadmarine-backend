import BlogPost, { BlogPostInterface } from '@models/BlogPost';
import packageSettings from '@src/../package.json';
import { QueryBuilder } from '@util/Assets';
import {
  Controller,
  DataTypes,
  GetMapping,
  SetSuccessMessage,
  WrappedRequest,
} from 'express-quick-builder';

@Controller
export default class BlogPostController {
  @GetMapping('/all')
  async getAll(): Promise<BlogPostInterface[]> {
    return await BlogPost.find().sort('-date');
  }

  @GetMapping()
  async getMaster(req: WrappedRequest): Promise<BlogPostInterface[]> {
    const { page, count, search } = req.verify.query({
      page: DataTypes.numberNull(),
      count: DataTypes.numberNull(),
      search: DataTypes.stringNull(),
    });

    const skip = page && count ? (page - 1) * count : 0;
    const limit = count || 10;

    return await BlogPost.find(
      QueryBuilder({
        title: search,
      }),
    )
      .sort('-date')
      .skip(skip)
      .limit(limit);
  }
}
