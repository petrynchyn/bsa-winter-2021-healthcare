import { Router } from 'express';
import { userRegisterSchema as userRegister } from '~/validation-schemas';
import { ApiPath, AuthApiPath, HttpCode } from '~/common/enums';
import { validateSchema } from '~/middlewares';
import { authService } from '~/services/services';

const initAuthApi = (apiRouter: Router): Router => {
  const authRouter = Router();

  apiRouter.use(ApiPath.AUTH, authRouter);

  // TODO: create auth middleware for register
  authRouter.post(AuthApiPath.SIGNUP, validateSchema(userRegister), (req, res, next) => {
    return authService
      .signUp(req.body)
      .then((data) => res.status(HttpCode.OK).json(data))
      .catch(next);
  });

  return authRouter;
};

export { initAuthApi };
