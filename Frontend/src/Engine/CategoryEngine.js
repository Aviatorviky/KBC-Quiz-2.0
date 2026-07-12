import categories from "../Data/QuestionBank/categories.json";

class CategoryEngine {

    constructor() {

        this.categories = categories;

    }

    getAllCategories() {

        return this.categories;

    }

    getAvailableCategories(usedCategories = []) {

        return this.categories.filter(

            category => !usedCategories.includes(category.id)

        );

    }

    isCategoryAvailable(categoryId, usedCategories = []) {

        return !usedCategories.includes(categoryId);

    }

    lockCategory(categoryId, usedCategories = []) {

        if (usedCategories.includes(categoryId)) {

            return usedCategories;

        }

        return [...usedCategories, categoryId];

    }

    reset() {

        return [];

    }

}

export default new CategoryEngine();