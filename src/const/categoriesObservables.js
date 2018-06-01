import { Subject } from "rxjs";

export const regionsSubject = new Subject();
export const territoriesSubject = new Subject();
export const categoriesSubject = new Subject();
export const subcategoriesSubject = new Subject();

export const regions$ = regionsSubject.asObservable();
export const territories$ = territoriesSubject.asObservable();
export const categories$ = categoriesSubject.asObservable();
export const subcategories$ = subcategoriesSubject.asObservable();
