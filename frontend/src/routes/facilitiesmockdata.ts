import  { Facility } from "../types/facility.types";

const name = [
    "FNB Stadium (Soccer City)", "Cape Town Stadium", "Moses Mabhida Stadium",
    "Loftus Versfeld Stadium", "Nelson Mandela Bay Stadium", "Mbombela Stadium",
    "Peter Mokaba Stadium", "Free State Stadium (Dr. Petrus Molemela)",
    "Royal Bafokeng Stadium", "Athlone Stadium", "Loftus Versfeld Training Ground (municipal)",
    "Charles Mopeli Stadium", "Wally Serote Stadium", "Makhulong Stadium",
    "Princess Magogo Stadium", "Ilanga Stadium (regional)", "Markotter Stadium",
    "New Peter Mokaba Training Facility", "Stadium@Giyani",
];
const location = [
    "Johannesburg, Gauteng", "Cape Town, Western Cape", "Durban, KwaZulu-Natal",
    "Pretoria, Gauteng", "Gqeberha (Port Elizabeth), Eastern Cape", "Nelspruit (Mbombela), Mpumalanga",
    "Polokwane, Limpopo", "Bloemfontein, Free State", "Rustenburg, North West",
    "Cape Town, Western Cape (Cape Flats)", "Pretoria, Gauteng (Municipal training venue)",
    "Phuthaditjhaba, Free State", "Mangaung, Free State (small municipal)", "Tembisa, Gauteng (municipal)",
    "Tongaat, KwaZulu-Natal", "Ladysmith, KwaZulu-Natal", "Klerksdorp, North West",
    "Polokwane, Limpopo (training / municipal)", "Giyani, Limpopo (municipal)",
    "Richards Bay / smaller municipality, KwaZulu-Natal",
];

const capacity = [
    94736, 55000, 55000, 51500, 46000, 40929, 45000, 36300, 38000, 34000,
    5000, 35000, 12000, 10000, 12000, 8000, 7000, 3000, 5000, 2500,
];
const status = ["active", "maintenance", "disabled"];

function padId(num: number, size = 3): string {
    return "F" + num.toString().padStart(size, "0");
}

export function generateMockFacilities(count = 20): Facility[] {
    const facilities: Facility[] = [];
    for (let i = 1; i < count; i++) {

        facilities.push({
            id: padId(i),
            name: name[i % name.length],
            location: location[i % location.length],
            capacity: capacity[i % capacity.length],
            status: status[i % status.length],
            // name,
            // location,
            // capacity,
            // status,
        });
    }
    return facilities;
}

const mockFacilities = generateMockFacilities(20);
export default mockFacilities;
