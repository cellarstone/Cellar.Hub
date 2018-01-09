
export class CellarSortimentItem {
    
        public id: string;
        public name: string;
        public state: string;
    
        // public type: string;
    
        public price: number;
    
        /*****************************/
        /*  Solve Tree structure     */
        /* https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-child-references/ */
        /*****************************/
        public path: string;
    
    
    }
    