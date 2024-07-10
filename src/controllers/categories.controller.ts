import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { StatusCodes } from 'http-status-codes';
import { CategoriesRepository } from '../database/repositories/category.repository';
import { CategoryModel } from '../database/schemas/category.schema';
import type { CreateCategoryDto } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';

export class CategoriesController {
	async create(
		req: Request<unknown, unknown, CreateCategoryDto>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { title, color } = req.body;
			const repository = new CategoriesRepository(CategoryModel);
			const service = new CategoriesService(repository);
			const result = await service.create({ title, color });

			return res.status(StatusCodes.CREATED).json(result);
		} catch (err) {
			next(err);
		}
	}
}
