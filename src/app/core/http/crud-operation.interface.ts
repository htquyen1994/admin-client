import { Observable } from "rxjs";

export interface ICrudOperation<T, E> {
	save(body: T): Observable<T>;
	update(id: E, t: T): Observable<T>;
	findOne(id: E): Observable<T>;
	findAll(): Observable<T[]>;
	delete(id: E): Observable<any>;
}
