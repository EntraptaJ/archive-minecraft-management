import { Resolver, Query, Mutation, Arg, ForbiddenError, Ctx, ObjectType, Field } from 'type-graphql';
import { ApolloError } from 'apollo-server-koa'
import { UserModel, User } from '../../Models/User';
import { Context } from '../Context';
import { MutationResponse } from '../Mutations'

@ObjectType({ implements: MutationResponse })
class LoginUserMutationResponse implements MutationResponse {
  success: boolean

  @Field(type => String)
  token: Promise<string>
}

@Resolver()
export default class AuthResolver {
  @Query(returns => String)
  public async helloWorld(@Ctx() { user }: Context): Promise<string> {
    return 'Hello World';
  }

  @Mutation(returns => User)
  public async registerUser(@Arg('username') username: string, @Arg('password') password: string): Promise<User> {
    return new UserModel({ username, password }).save();
  }

  @Mutation(type => LoginUserMutationResponse, { description: 'Log User into API' })
  async loginUser(@Arg('username') username: string, @Arg('password') password: string): Promise<LoginUserMutationResponse> {
    const user = await UserModel.findOne({ username });
    if (!user) throw new ApolloError('User not found', 'INVALID_USER') ;
    return { success: true, token: user.generateToken(password)}
  }
}
