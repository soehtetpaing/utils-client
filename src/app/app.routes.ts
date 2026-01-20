import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard-component';
import { FontComponent } from './component/font/font-component';
import { ColorComponent } from './component/color/color-component';
import { IconComponent } from './component/icon/icon-component';
import { SubtleComponent } from './component/subtle/subtle-component';
import { AnimationComponent } from './component/animation/animation-component';
import { CommonComponent } from './component/common/common-component';
import { DatetimeComponent } from './component/datetime/datetime-component';
import { MediaComponent } from './component/media/media-component';
import { LoggingComponent } from './component/logging/logging-component';
import { AuthComponent } from './component/auth/auth-component';
import { MigrationComponent } from './component/migration/migration-component';
import { AboutComponent } from './component/about/about-component';
import { UtilComponent } from './component/util/util-component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'font', component: FontComponent },
    { path: 'color', component: ColorComponent },
    { path: 'icon', component: IconComponent },
    { path: 'subtle', component: SubtleComponent },
    { path: 'animation', component: AnimationComponent },
    { 
        path: 'util',
        component: UtilComponent,
        children: [
            { path: '', redirectTo: 'common', pathMatch: 'full' },
            { path: 'common', component: CommonComponent },
            { path: 'datetime', component: DatetimeComponent },
            { path: 'media', component: MediaComponent },
            { path: 'logging', component: LoggingComponent },
            { path: 'auth', component: AuthComponent },
            { path: 'migration', component: MigrationComponent }
        ]
    },
    {path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '/dashboard' }
];
