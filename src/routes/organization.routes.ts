import * as express from "express";
import { OrganizationController } from "../controllers/organization.controller";
const Router = express.Router();

Router.get(
  "/organizations",
  OrganizationController.getOrganizations
);
Router.post("/organizations", OrganizationController.createOrganization);

Router.put(
  "/organization/:name",
  OrganizationController.updateOrganization
);
Router.delete(
  "/organization/:name",
  OrganizationController.deleteOrganization
);
export { Router as orgRouter };