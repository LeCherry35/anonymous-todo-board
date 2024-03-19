export interface TodoInterface {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    boardId: string;
}