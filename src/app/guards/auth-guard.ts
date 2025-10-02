import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from './currentUser.service';
import { filter, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const currentUserService = inject(CurrentUserService);
  const router = inject(Router);

  return currentUserService.currentUser$.pipe(
    filter((currentUser)=> currentUser !== undefined),
    map((currentUser) => {
        if(!currentUser){
          router.navigateByUrl('/')
          return false;
        }

       return true;
    })
  )
};
