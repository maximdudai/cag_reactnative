export interface Vehicle {
    id?: string;
    make: string;
    model: string;
    engineSize: string;
    fuel: string;
    year: number;
    mileage: number;
    auctionDateTime: string;
    startingBid: number;
    favourite?: boolean;
    imageUrl?: string;
}