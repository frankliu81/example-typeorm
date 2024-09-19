import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Organization } from "../entities/Organization.entity";
import * as cache from "memory-cache";

export class OrganizationController {
  static async createOrganization(req: Request, res: Response) {
    const { name } = req.body;
    const org = new Organization();

    org.name = name;

    const orgRepository = AppDataSource.getRepository(Organization);
    await orgRepository.save({...org,
      subscription: {
      },});

    return res
      .status(200)
      .json({ message: "Org created successfully", org });
  }

  static async getOrganizations(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const orgRepository = AppDataSource.getRepository(Organization);
      const orgs = await orgRepository.find();

      cache.put("data", orgs, 6000);
      return res.status(200).json({
        data: orgs,
      });
    }
  }
  static async updateOrganization(req: Request, res: Response) {
    const { name } = req.params;
    const { newName } = req.body;
    const orgRepository = AppDataSource.getRepository(Organization);
    const org = await orgRepository.findOne({
      where: { name },
    });
    org.name = newName;
    await orgRepository.save(org);
    res.status(200).json({ message: "updated", org });
  }

  static async deleteOrganization(req: Request, res: Response) {
    const { name } = req.params;
    const orgRepository = AppDataSource.getRepository(Organization);
    const org = await orgRepository.findOne({
      where: { name },
    });
    await orgRepository.remove(org);
    res.status(200).json({ message: "deleted" });
  }
}