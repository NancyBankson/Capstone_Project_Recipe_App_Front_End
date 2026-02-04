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

export interface Memory {
    _id: string;
    user: string;
    title: string;
    contents: string;
    image: string;
}

export interface User {
    _id: string;
    email: string;
    username: string;
}

export interface RecipeCardProps {
    recipes: Recipe[] | null;
}

export interface MemoryCardProps {
    memories: Memory[] | null;
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

export interface MemoryFormData {
    title: string;
    contents: string;
    image: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
    user: User;
    token: string;
}