import { Request, Response } from "express"
import { IncidentModel } from "../../data/models/incident.model"

export class IncidentController {
  
  public getIncidents = async (req: Request, res: Response) => {
    try {
      const incidents = await IncidentModel.find();
      res.json(incidents);
    } catch (error) {
      console.error(`Error -> ${error}`);
    }
  }

  public createIncident = async (req: Request, res: Response) => {    
    try {
      const { title, description, lat, lng } = req.body;
      const newIncident = await IncidentModel.create({
        title: title,
        description: description,
        lat: lat,
        lng: lng
      });

      return res.json(newIncident);
    } catch (error) {
      console.error(`Error -> ${error}`);
    }
  }

  public getIncidentById = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
      const incident = await IncidentModel.findById(id);
      res.json(incident);
    } catch (error) {
      console.error(`Error -> ${error}`);
    }
  }

  public updateIncident = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, lat, lng } = req.body;

    try {
      const incident = await IncidentModel.findByIdAndUpdate(id, {
        title,
        description,
        lat,
        lng
      });
      res.json(incident);
    } catch (error) {
      console.error(`Error -> ${error}`);
    }
  }

  public deleteIncident = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
      await IncidentModel.findByIdAndDelete(id);
      res.json({ message: 'Deleted record' });
    } catch (error) {
      console.error(`Error -> ${error}`);
    }
  }
}