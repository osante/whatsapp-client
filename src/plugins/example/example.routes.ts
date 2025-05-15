import { Routes } from "@angular/router";
import { CampaignsComponent } from "./campaigns/campaigns.component";

export const routes: Routes = [
    {
        path: "",
        children: [{ path: "campaigns", component: CampaignsComponent }],
    },
];
