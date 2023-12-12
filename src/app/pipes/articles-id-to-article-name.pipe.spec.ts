import { ArticlesIdToArticleNamePipe } from './articles-id-to-article-name.pipe';

describe('ArticlesIdToArticleNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ArticlesIdToArticleNamePipe();
    expect(pipe).toBeTruthy();
  });
});
