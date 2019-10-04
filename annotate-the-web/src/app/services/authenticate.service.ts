import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
	private currentUserKey = 'currentUser';
	private userListKey = 'userList';
	private userEmail = '';
	private userEmailSubject = new BehaviorSubject<string>('');
	userEmailChange$ = this.userEmailSubject.asObservable();

	constructor() {
		if(!this.userEmail) {
			this.userEmail = this.getCurrentUser();
			this.notifyUserEmailChange();
		}
	}

	register(credentials: Credentials): Observable<boolean> {
		return new Observable<boolean>(observer => {
			//check if the email already exists
			const existingUser = this.getUserFromLocalStorage(credentials);
			if(!existingUser) {
				this.saveUserToLocalStorage(credentials);
				this.userEmail = credentials.email;
				this.setCurrentUser(this.userEmail);
				this.notifyUserEmailChange();
				observer.next(true)
			} else {
				observer.next(false);
			}
			observer.complete();
		});
	}

	login(credentials: Credentials): Observable<boolean> {
		return new Observable<boolean>(observer => {
			//check if the email already exists
			const existingUser = this.getUserFromLocalStorage(credentials);
			if(existingUser) {
				if(credentials.password !== existingUser.password) {
					observer.next(false);
				} else {
					this.userEmail = credentials.email;
					this.setCurrentUser(this.userEmail);
					this.notifyUserEmailChange();
					observer.next(true);
				}
			} else {
				observer.next(false);
			}
			observer.complete();
		});
	}

	resetPassword(credentials: Credentials, newPassword: string): Observable<boolean> {
		return new Observable<boolean>(observer => {
			const existingUser = this.getUserFromLocalStorage(credentials);
			if(!existingUser) {
				observer.next(false);
			} else if (existingUser.password !== credentials.password) {
				observer.next(false);
			} else {
				credentials.password = newPassword;
				this.userEmail = credentials.email;
				this.setCurrentUser(this.userEmail);
				this.updateAndSaveUserToLocalStorage(credentials);
				this.notifyUserEmailChange();
				observer.next(true);
			}
			observer.complete();
		});
	}

	logout() {
		this.userEmail = '';
		this.setCurrentUser('');
		this.notifyUserEmailChange();
	}

	notifyUserEmailChange() {
		this.userEmailSubject.next(this.userEmail);
	}

	isLoggedIn(): boolean {
		return !this.userEmail ? false : true;
	}

	getCurrentUserEmail(): string {
		return this.userEmail;
	}

	private saveUserToLocalStorage(user: Credentials) {
		if(!user || !user.email || !user.password) {
			return;
		}
		const currentList = this.getUserListFromLocalStorage();
		const listToSave = !currentList ? [user] : [...currentList, user];
		localStorage.setItem(this.userListKey, JSON.stringify(listToSave));
	}

	private updateAndSaveUserToLocalStorage(user: Credentials) {
		if(!user || !user.email || !user.password) {
			return;
		}
		const currentList = this.getUserListFromLocalStorage();
		if(!currentList || currentList.length === 0) {
			return;
		} else {
			const listToSave = currentList.map(u => u.email !== user.email ? u : user);
			localStorage.setItem(this.userListKey, JSON.stringify(listToSave));
		}
	}

	private setCurrentUser(userEmail: string) {
		localStorage.setItem(this.currentUserKey, userEmail);
	}

	private getCurrentUser(): string {
		const currentUser = localStorage.getItem(this.currentUserKey);
		return !currentUser ? '' : currentUser;
	}

	private getUserFromLocalStorage(user: Credentials): Credentials {
		if(!user || !user.email) {
			return;
		}
		const matchedUser = this.getUserListFromLocalStorage().find(u => u.email === user.email);
		return matchedUser;
	}

	private getUserListFromLocalStorage(): Array<Credentials> {
		const localDataString = localStorage.getItem(this.userListKey);
		const localData: Array<Credentials> = JSON.parse(localDataString);
		const returnedData = !localData ? [] : [...localData];
		return returnedData;
	}
}
