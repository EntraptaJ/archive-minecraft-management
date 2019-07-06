// API/src/API/Middleware/AuthChecker.ts
import { AuthChecker } from 'type-graphql';
import { ContextType } from '../Context';

export const authChecker: AuthChecker<ContextType> = ({ root, args, context: { user }, info }, roles) => {
  if (roles.length === 0) return user !== undefined;

  if (!user) return false;
  if (user.roles.some(role => roles.includes(role))) return true;

  // no roles matched, restrict access
  return false;
};
