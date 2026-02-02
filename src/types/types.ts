export interface Recipe {
    _id: string;
    user: string;
    title: string;
    category: string;
    ingredients: string;
    instructions: string;
    image: string;
    tags: string[];
    source: string;
}

export interface RecipeCardProps {
    recipes: Recipe[] | null;
}

export interface LogInFormData {
    email: string;
    password: string;
}

export interface RegistrationFormData {
    username: string;
    email: string;
    password: string;
}

export interface RecipeFormData {
    title: string;
    category: string;
    ingredients: string;
    instructions: string;
    image: string;
    tags: string[];
    source: string;
}