import { Routes } from '@angular/router';

export const routes: Routes = [
     { 
        path:'', 
        loadComponent: () => 
        import('./pages/home/home').then(h => h.Home)
    },
    // {
    // path: 'invitaciones',
    // loadComponent: () =>
    //   import('./pages/invitaciones-c/invitaciones-c').then(m => m.InvitacionesC)
    // },
    // Cualquier ruta inexistente regresa al inicio
    {
        path: '**',
        redirectTo: ''
    }
];
