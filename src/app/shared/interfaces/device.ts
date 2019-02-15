export interface Device {
    $key: string;
    id: number;
    device: string;
    os: string;
    manufacturer: string;
    lastCheckOutDate: Date;
    lastCheckOutBy: string;
    isCheckedOut: boolean;
}
