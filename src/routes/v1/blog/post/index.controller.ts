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
  async getMaster(
    req: WrappedRequest,
  ): Promise<{ data: BlogPostInterface[]; length: number } | null> {
    const { skip, limit, search } = req.verify.query({
      skip: DataTypes.numberNull(),
      limit: DataTypes.numberNull(),
      search: DataTypes.stringNull(),
    });

    const posts = await BlogPost.find(
      QueryBuilder({
        title: search,
      }),
    )
      .sort('-date')
      .skip(skip || 0)
      .limit(limit || 10);

    const length = await BlogPost.count(
      QueryBuilder({
        title: search,
      }),
    );

    if (posts.length === 0) {
      return null;
    }

    return { data: posts, length };
  }
}
