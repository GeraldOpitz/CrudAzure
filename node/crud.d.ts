    interface Item {
      id: number;
    }
  
    function create(data: any): Promise<Item>;
    function update(id: number, data: any): Promise<Item>;
    function remove(id: number): Promise<Item>;
    function getAll(): Promise<Item[]>;

    export {
      Item,
      create,
      update,
      remove,
      getAll,
    };