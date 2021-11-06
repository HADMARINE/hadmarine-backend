import BlogPost, { BlogPostInterface } from '@models/BlogPost';
import packageSettings from '@src/../package.json';
import {
  Controller,
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
  async getWithPagination(req: WrappedRequest): Promise<BlogPostInterface[]> {}
}
