// API/src/API/Blog/index.ts
import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';
import { Post, PostModel, NewPostInput } from '../../Models/Post';
import { ModItemModel } from '../../Models/Mod'

@Resolver()
export default class BlogResolver {
  @Authorized(['Admin'])
  @Mutation(returns => Post)
  public async newPost(@Arg('post', type => NewPostInput) { body, mods }: NewPostInput): Promise<Post> {
    const Mods = await ModItemModel.create(mods);
    console.log(Mods)
    const newPost = new PostModel({ body, mods: Mods });
    await newPost.save();
    return PostModel.findById(newPost._id).populate('mods');
  }

  @Query(returns => [Post])
  public async getPosts() {
    return PostModel.find().populate('mods')
  }
}
