import { model, Schema, Document, models } from 'mongoose';

export interface PortfolioInterface {
  title: string;
  subtitle?: string;
  thumbnail?: string;
  content: string;
  link: Record<string, string>;
  date: Date;
}

const PortfolioSchema: Schema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  thumbnail: { type: String, required: false },
  date: { type: Date, required: true },
  content: { type: String, required: true },
  link: { type: Object, required: false },
});

export interface PortfolioDocument extends Document, PortfolioInterface {
  // Add Methods here
}

// PortfolioSchema.methods.~~

// PortfolioSchema.pre('save', function (next): void {
//   const doc = this as PortfolioDocument;
//   models.Portfolio.findOne(
//     {
//       $or: [],
//     },
//     function (err: Error, site: PortfolioDocument) {
//       if (site) next(error.db.exists());
//       if (err) next(err);
//       next();
//     },
//   );
// });

const Portfolio = model<PortfolioDocument>('Portfolio', PortfolioSchema);

export default Portfolio;
