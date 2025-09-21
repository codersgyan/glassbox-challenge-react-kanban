type User = {
    id: string;
    name: string;
};

export type Task = {
    id: string;
    title: string;
    description: string;
    asignedTo: User;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    createdAt: string;
};
