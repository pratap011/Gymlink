import { Gym } from "../models/Gym";

interface AddGymDTO{
    name: string;
    area: string;
    city: string;
    coordinates?: {
      lat: number;
      long: number;
    };
}

interface FetchGymDTO{
    name: string;
}


export interface GymResponseDTO {
    name: string;
    area: string;
    city: string;
    coordinates?: {
      lat: number;
      long: number;
    };
  }

export interface ListGymDTO {
    city: string
}


export const addGym = async (gymData: AddGymDTO)=>{
        const gym = await Gym.findOne({name:gymData.name});
        if(gym)
            {throw new Error('Gym with this name already exists');}
        const newGym= new Gym(gymData);
        return await newGym.save();

}

export const fetchGymData= async (data: FetchGymDTO)=>{
    const gym = await Gym.findOne({name: data.name});
  
    if(!gym){
        throw new Error('No Gym found')
    }
    let gymdata: GymResponseDTO={
        name:gym.name,
        area:gym.area,
        city:gym.city,
        coordinates:gym.coordinates
        

    }
    return gymdata;
}

export const listGyms = async (data: ListGymDTO)=>{
    const gyms = await Gym.find({city: data.city});
    return gyms;
}

