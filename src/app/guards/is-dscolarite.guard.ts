import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { D_SCOLARITE_GROUP_NAME } from '../utils/constants';

@Injectable({
    providedIn: 'root',
})
export class IsDScolariteGuard implements CanActivate, CanActivateChild {

    constructor(private service: AuthService, private router: Router) { }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return this.verify();
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.verify();
    }

    private verify() {
        const ok = this.service.userLoggedInAndInGroup(D_SCOLARITE_GROUP_NAME);
        if (!ok) {
            this.router.navigateByUrl('/home/connexion');
        }
        return ok;
    }
}
