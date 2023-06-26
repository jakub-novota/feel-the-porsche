export interface Car {
  id: number;
  name: string;
  power_PS: number;
  power_HP: number;
  max_speed: number;
  transmission: string;
  acceleration: number;
  year: number;
  capacity: number;
  image: string;
  image_cars: {
    "1": string;
    "2": string;
    "3"?: string | undefined;
    "4"?: string | undefined;
  };
  drive: string;
  description: string;
  cylinder_capacity: number;
  model: string;
  body: string;
  mileage: number;
  fuel: string;
  [key: string]: any; // Index signature for dynamic properties
  gallery: {
    "1"?: string | undefined;
    "2"?: string | undefined;
    "3"?: string | undefined;
    "4"?: string | undefined;
  }
}