import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { UserStoreService } from "../../user/store/user-store.service";

export const userGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const userStore = inject(UserStoreService);
    const router = inject(Router);

    return authService
        .checkAndRefreshToken()
        .then(() => {
            if (!authService.getToken())
                return router.createUrlTree(["/auth/login"]);

            const me = userStore
                .getCurrent()
                .then((_) => true)
                .catch(() => router.createUrlTree(["/auth/login"]));

            return me;
        })
        .catch(() => router.createUrlTree(["/auth/login"]));
};
