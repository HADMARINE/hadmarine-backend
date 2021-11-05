import packageSettings from '@src/../package.json';
import {
  Controller,
  GetMapping,
  SetSuccessMessage,
} from 'express-quick-builder';

@Controller
export default class BlogPostController {
  @GetMapping()
  index(): Record<string, any>[] {}
}
