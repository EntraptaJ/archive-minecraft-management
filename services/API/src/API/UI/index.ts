// API/src/API/UI/index.ts
import { Resolver, Query, Ctx } from 'type-graphql';
import { MenuItem } from './MenuItemType';
import { ContextType } from '../Context';
import { MainMenu, UserMenu, AdminMenu } from './MenuItems';

@Resolver()
export default class UIResolver {
  @Query(returns => [MenuItem])
  public async getMenu(@Ctx() { user }: ContextType): Promise<MenuItem[]> {
    if (!user) return MainMenu;
    if (user.roles.includes('Admin')) return AdminMenu;
    return UserMenu;
  }
}
