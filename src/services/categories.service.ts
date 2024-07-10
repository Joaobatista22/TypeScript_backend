import { StatusCodes } from 'http-status-codes';
import type { CategoriesRepository } from '../database/repositories/category.repository';
import type { CreateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';
import { AppError } from '../errors/app.error';

export class CategoriesService {
	constructor(private categoriesRepository: CategoriesRepository) {}
	async create({ title, color }: CreateCategoryDto): Promise<Category> {
		const foundCategory = await this.categoriesRepository.findByTitle(title);
		if (foundCategory) {
			throw new AppError('Category already existe', StatusCodes.BAD_REQUEST);
		}
		const category = new Category({
			title,
			color,
		});
		const createdCategory = await this.categoriesRepository.create(category);
		return createdCategory;
	}
}
