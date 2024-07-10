import { Router } from 'express';
import { CategoriesController } from '../controllers/categories.controller';
import { createCategorySchema } from '../dtos/categories.dto';
import { ParamsType, validator } from '../middleware/validator.middleware';

export const categoriesRoute = Router();
const controller = new CategoriesController();

categoriesRoute.post(
	'/',
	validator({
		schema: createCategorySchema,
		type: ParamsType.BODY,
	}),
	controller.create,
);
