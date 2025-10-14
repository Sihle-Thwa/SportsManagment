import Table from "./Table";
import type { Players } from "../../types/players.types";
import playersmockdata from "../../routes/playersmockdata";

const columns = [
    {
        id: "id",
        header: "ID",
        accessor: (r: Players) => r.id,
    },
    {
        id: "firstName",
        header: "First Name",
        accessor: (r: Players) => r.firstName,
    },
    {
        id: "middleName",
        header: "Middle Name",
        accessor: (r: Players) => r.middleName,
    },
    {
        id: "lastName",
        header: "Last Name",
        accessor: (r: Players) => r.lastName,
    },
    {
        id: "nationality",
        header: "Nationality",
        accessor: (r: Players) => r.nationality,
    },
    {
        id: "dateOfBirth",
        header: "Date of Birth",
        accessor: (r: Players) => r.dateOfBirth,
    },
    {
        id: "identificationNumber",
        header: "ID Number",
        accessor: (r: Players) => r.identificationNumber,
    },
    {
        id: "age",
        header: "Age",
        accessor: (r: Players) => r.age,
    },
    {
        id: "gender",
        header: "Gender",
        accessor: (r: Players) => r.gender,
    },
    {
        id: "contact",
        header: "Contact",
        accessor: (r: Players) => r.contact,
    },
    {
        id: "email",
        header: "Email",
        accessor: (r: Players) => r.email,
    },
];

interface Props {
    data: Players[];
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onDeleteMany?: (ids: string[]) => void | Promise<void>;
    loading?: boolean;
}

export default function PlayersTable({
    data = playersmockdata,
    loading = false,
}: Props) {
    return (
        <Table<Players>
            columns={columns}
            data={data}
            loading={loading}
            initialPageSize={10}
            getRowId={(row) => row.id}
        />
    );
}
