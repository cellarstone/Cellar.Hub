export class SortimentItem {
    public id: string;
    public svg: string;
    public color: string;
    public amount: number;
    public name: string;
    public childItems: Array<SortimentItem>
}