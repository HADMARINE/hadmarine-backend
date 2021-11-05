import { model, Schema, Document, models } from 'mongoose';
import error from '@error/ErrorDictionary';
import BlogPost from './BlogPost';

export interface PortfolioInterface {
  // Add Schema here
}

const PortfolioSchema: Schema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  content: { type: String, required: true },
  relatedPost: { type: Schema.Types.ObjectId, required: false, ref: BlogPost },
});

export interface PortfolioDocument extends Document, PortfolioInterface {}

// PortfolioSchema.methods.~~

PortfolioSchema.pre('save', function (next): void {
  const doc = this as PortfolioDocument;
  models.Portfolio.findOne(
    {
      $or: [],
    },
    function (err: Error, site: PortfolioDocument) {
      if (site) next(error.db.exists());
      if (err) next(err);
      next();
    },
  );
});

const Portfolio = model<PortfolioDocument>('Portfolio', PortfolioSchema);

export default Portfolio;
