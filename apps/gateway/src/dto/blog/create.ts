export class CreateBlogDto {
  authorId: string;

  title: string;

  descriptionMeta: string;

  content: string;

  published?: boolean;

  categories: string[];
}
