import { model, Schema, Document, models } from 'mongoose';
import error from '@error/ErrorDictionary';

export interface BlogPostInterface {
  title: string;
  subtitle?: string;
  tag?: string[];
  content: string;
  date: Date;
}

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  tag: { type: [String], required: false },
  content: { type: String, required: true },
  date: { type: Date, required: true },
});

export interface BlogPostDocument extends Document, BlogPostInterface {
  // Add Methods here
}

// BlogPostSchema.methods.~~

// BlogPostSchema.pre('save', function (next): void {
//   const doc = this as BlogPostDocument;
//   models.BlogPost.findOne(
//     {
//       $or: [],
//     },
//     function (err: Error, site: BlogPostDocument) {
//       if (site) next(error.db.exists());
//       if (err) next(err);
//       next();
//     },
//   );
// });

const BlogPost = model<BlogPostDocument>('BlogPost', BlogPostSchema);

export default BlogPost;
